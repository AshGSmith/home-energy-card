/**
 * Auto-detection of known Home Assistant integrations.
 *
 * Supported integrations:
 *   - Octopus Energy (BottlecapDave/HomeAssistant-OctopusEnergy)
 *   - Tesla (alandtse/tesla_custom_integration) — vehicles + Powerwall
 *
 * Matching priority (per field):
 *   1. device_class  — strongest signal (+4)
 *   2. unit_of_measurement — medium signal (+2)
 *   3. entity_id / friendly_name keywords — fallback (+1 per hit)
 *
 * The highest-scoring unclaimed entity wins each field.
 * A claimed entity is never reused, preventing duplicates.
 */

import type { CardConfig, EntityTypeConfig, OctopusConfig, IntegrationType } from "./types.js";

// ── HA runtime types ──────────────────────────────────────────────────────────

interface HAState {
  state: string;
  attributes: Record<string, unknown>;
}

interface HAEntityEntry {
  entity_id: string;
  platform?: string;
  device_id?: string;
  disabled_by?: string | null;
}

type States   = Record<string, HAState>;
type Entities = Record<string, HAEntityEntry>;

// ── Result ────────────────────────────────────────────────────────────────────

export interface DetectionResult {
  integration_type: IntegrationType;
  entity_types: Record<string, Partial<EntityTypeConfig>>;
  tariff_entity?: string;
  summary: string[];
}

// ── Attribute helpers ─────────────────────────────────────────────────────────

const dc  = (s: HAState): string => (s.attributes.device_class as string) ?? "";
const uom = (s: HAState): string => (s.attributes.unit_of_measurement as string) ?? "";
const hay = (id: string, s: HAState): string =>
  id.toLowerCase() + " " + ((s.attributes.friendly_name as string) ?? "").toLowerCase();

// ── Scorer types ──────────────────────────────────────────────────────────────

type Scorer = (id: string, s: HAState) => number;

/**
 * Score a power entity.
 * device_class=power → +4 | W or kW unit → +2 | each keyword hit → +1
 */
function powerScorer(...keywords: string[]): Scorer {
  return (id, s) => {
    let score = 0;
    if (dc(s) === "power")                 score += 4;
    if (["W", "kW"].includes(uom(s)))      score += 2;
    const h = hay(id, s);
    for (const kw of keywords) if (h.includes(kw)) score += 1;
    return score;
  };
}

/**
 * Score an energy entity.
 * device_class=energy → +4 | kWh/Wh/MWh unit → +2 | each keyword hit → +1
 */
function energyScorer(...keywords: string[]): Scorer {
  return (id, s) => {
    let score = 0;
    if (dc(s) === "energy")                            score += 4;
    if (["kWh", "Wh", "MWh"].includes(uom(s)))        score += 2;
    const h = hay(id, s);
    for (const kw of keywords) if (h.includes(kw)) score += 1;
    return score;
  };
}

/**
 * Score a state-of-charge entity.
 * device_class=battery → +4 | % unit → +2 | each keyword hit → +1
 */
function socScorer(...keywords: string[]): Scorer {
  return (id, s) => {
    let score = 0;
    if (dc(s) === "battery") score += 4;
    if (uom(s) === "%")      score += 2;
    const h = hay(id, s);
    for (const kw of keywords) if (h.includes(kw)) score += 1;
    return score;
  };
}

/**
 * Score by entity_id pattern membership.
 * Each required substring present → +4; each exclusion present → −10 (disqualify).
 */
function patternScorer(required: string[], excluded: string[] = []): Scorer {
  return (id, _s) => {
    const lo = id.toLowerCase();
    if (excluded.some(x => lo.includes(x))) return 0;
    let score = 0;
    for (const r of required) if (lo.includes(r)) score += 4;
    return score;
  };
}

// ── Best-match picker ─────────────────────────────────────────────────────────

/**
 * Return the unclaimed entity_id with the highest score > 0.
 * Marks the winner as claimed to prevent reuse.
 */
function bestMatch(
  candidates: string[],
  states: States,
  scorer: Scorer,
  claimed: Set<string>,
): string | undefined {
  let best: string | undefined;
  let bestScore = 0;

  for (const id of candidates) {
    if (claimed.has(id)) continue;
    const s = states[id];
    if (!s) continue;
    const score = scorer(id, s);
    if (score > bestScore) { bestScore = score; best = id; }
  }

  if (best) claimed.add(best);
  return best;
}

// ── Octopus Energy ────────────────────────────────────────────────────────────

function detectOctopus(
  states: States,
  entities: Entities,
  claimed: Set<string>,
): Partial<DetectionResult> | null {
  const hasPlatform = Object.values(entities).some(
    e => e.platform === "octopus_energy" && !e.disabled_by,
  );
  const octopusIds = Object.keys(states).filter(id => id.includes("octopus_energy"));

  if (!hasPlatform && octopusIds.length === 0) return null;

  // Electricity-only candidates (exclude gas for power/energy fields)
  const elecIds = octopusIds.filter(id =>
    id.includes("octopus_energy_electricity"),
  );

  const summary: string[] = ["Octopus Energy"];
  const oct: Partial<OctopusConfig> = {};
  const grid: Partial<EntityTypeConfig> = {};

  // ── Octopus-specific structured entities (pattern-matched) ─────────────────

  const rateEntity = bestMatch(elecIds, states,
    patternScorer(["_current_rate"], ["export", "accumulative"]),
    claimed);
  if (rateEntity) { oct.rate_entity = rateEntity; summary.push("rate"); }

  const costEntity = bestMatch(elecIds, states,
    patternScorer(["_current_accumulative_cost"]),
    claimed);
  if (costEntity) { oct.cost_entity = costEntity; summary.push("cost"); }

  const slotsEntity = bestMatch(elecIds, states,
    patternScorer(["_current_day_rates"]),
    claimed);
  if (slotsEntity) { oct.slots_entity = slotsEntity; summary.push("slots"); }

  const dispatchEntity = bestMatch(
    octopusIds.filter(id => id.startsWith("binary_sensor.")),
    states,
    patternScorer(["_intelligent_dispatching"]),
    claimed,
  );
  if (dispatchEntity) { oct.dispatches_entity = dispatchEntity; summary.push("dispatching"); }

  if (Object.keys(oct).length) grid.octopus = oct as OctopusConfig;

  // ── Power / energy (scored) ────────────────────────────────────────────────

  const importPower = bestMatch(elecIds, states,
    powerScorer("import", "demand", "current"),
    claimed);
  if (importPower) { grid.power_import = importPower; summary.push("import power"); }

  const exportPower = bestMatch(elecIds, states,
    powerScorer("export", "demand", "current"),
    claimed);
  if (exportPower) { grid.power_export = exportPower; summary.push("export power"); }

  const dailyImport = bestMatch(elecIds, states,
    energyScorer("import", "accumulative", "consumption"),
    claimed);
  if (dailyImport) { grid.daily_usage = dailyImport; summary.push("daily import"); }

  const dailyExport = bestMatch(elecIds, states,
    energyScorer("export", "accumulative"),
    claimed);
  if (dailyExport) { grid.daily_export = dailyExport; summary.push("daily export"); }

  return { integration_type: "octopus", entity_types: { grid }, summary };
}

// ── Tesla ─────────────────────────────────────────────────────────────────────

function detectTesla(
  states: States,
  entities: Entities,
  claimed: Set<string>,
): Partial<DetectionResult> | null {
  const teslaEntries = Object.values(entities).filter(
    e => e.platform === "tesla_custom" && !e.disabled_by,
  );
  const hasTeslaIds = Object.keys(states).some(
    id => id.includes("powerwall") || id.includes("tesla"),
  );

  if (teslaEntries.length === 0 && !hasTeslaIds) return null;

  const all: string[] =
    teslaEntries.length > 0
      ? teslaEntries.map(e => e.entity_id)
      : Object.keys(states).filter(id => id.includes("powerwall") || id.includes("tesla"));

  const powerwallIds = all.filter(id => id.includes("powerwall"));
  const vehicleIds   = all.filter(id => !id.includes("powerwall"));

  const summary: string[] = ["Tesla"];
  const entityTypes: Record<string, Partial<EntityTypeConfig>> = {};

  // ── Powerwall (battery) ────────────────────────────────────────────────────
  if (powerwallIds.length > 0) {
    const battery: Partial<EntityTypeConfig> = {};

    const soc = bestMatch(powerwallIds, states,
      socScorer("battery", "soc", "charge", "percent"),
      claimed);
    if (soc) battery.soc = soc;

    const pw = bestMatch(powerwallIds, states,
      powerScorer("battery", "power", "charge", "discharge"),
      claimed);
    if (pw) battery.power_combined = pw;

    const energy = bestMatch(powerwallIds, states,
      energyScorer("battery", "today", "daily", "charged"),
      claimed);
    if (energy) battery.daily_usage = energy;

    if (Object.keys(battery).length) {
      entityTypes.battery = battery;
      summary.push("Powerwall");
    }
  }

  // ── Solar ──────────────────────────────────────────────────────────────────
  const solarPower = bestMatch(all, states,
    powerScorer("solar"),
    claimed);
  if (solarPower) {
    const solar: Partial<EntityTypeConfig> = { power_combined: solarPower };

    const solarEnergy = bestMatch(all, states,
      energyScorer("solar"),
      claimed);
    if (solarEnergy) solar.daily_usage = solarEnergy;

    entityTypes.solar = solar;
    summary.push("solar");
  }

  // ── Home / load ────────────────────────────────────────────────────────────
  // "load" beats "home"/"house" because it's more precise; exclude cross-type keywords
  const homePower = bestMatch(all, states,
    powerScorer("load", "home", "house"),
    claimed);
  if (homePower) {
    const home: Partial<EntityTypeConfig> = { power_combined: homePower };

    const homeEnergy = bestMatch(all, states,
      energyScorer("load", "home", "house"),
      claimed);
    if (homeEnergy) home.daily_usage = homeEnergy;

    entityTypes.home = home;
    summary.push("home load");
  }

  // ── Grid ───────────────────────────────────────────────────────────────────
  const gridPower = bestMatch(all, states,
    powerScorer("grid"),
    claimed);
  if (gridPower) {
    entityTypes.grid = { power_combined: gridPower };
    summary.push("grid");
  }

  // ── EV (vehicle — non-Powerwall Tesla entities) ────────────────────────────
  const evSoc = bestMatch(vehicleIds, states,
    socScorer("battery", "battery_level", "soc", "charge"),
    claimed);
  if (evSoc) {
    const ev: Partial<EntityTypeConfig> = { soc: evSoc };

    const evPower = bestMatch(vehicleIds, states,
      powerScorer("charg", "power"),
      claimed);
    if (evPower) ev.power_combined = evPower;

    const evEnergy = bestMatch(vehicleIds, states,
      energyScorer("charg", "energy"),
      claimed);
    if (evEnergy) ev.daily_usage = evEnergy;

    entityTypes.ev = ev;
    summary.push("EV");
  }

  return { integration_type: "tesla", entity_types: entityTypes, summary };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Run auto-detection against the live hass object.
 * Returns a DetectionResult that can be merged into CardConfig.
 */
export function autoDetect(hass: unknown): DetectionResult {
  const h        = hass as { states?: States; entities?: Entities };
  const states   = h.states   ?? {};
  const entities = h.entities ?? {};

  // Shared claimed set — prevents the same entity being assigned to two fields
  const claimed = new Set<string>();

  const tesla   = detectTesla(states, entities, claimed);
  const octopus = detectOctopus(states, entities, claimed);

  const result: DetectionResult = {
    integration_type: "manual",
    entity_types: {},
    summary: [],
  };

  if (tesla) {
    result.integration_type = "tesla";
    Object.assign(result.entity_types, tesla.entity_types);
    result.summary.push(...(tesla.summary ?? []));
  }

  if (octopus) {
    if (result.integration_type !== "tesla") result.integration_type = "octopus";

    if (octopus.entity_types?.grid) {
      const og = octopus.entity_types.grid;
      result.entity_types.grid = {
        ...result.entity_types.grid,
        ...og,
        // When octopus found separate import/export, drop any combined tesla grid entry
        power_combined: og.power_import
          ? undefined
          : result.entity_types.grid?.power_combined,
      };
    }
    if (octopus.tariff_entity) result.tariff_entity = octopus.tariff_entity;
    result.summary.push(...(octopus.summary ?? []));
  }

  return result;
}

/**
 * Merge a DetectionResult into a CardConfig.
 * Only entity field values (entity IDs) are written — no metadata.
 * When overwrite=false (default), existing non-empty fields are preserved.
 */
export function mergeDetection(
  config: CardConfig,
  detected: DetectionResult,
  overwrite = false,
): CardConfig {
  const merged: CardConfig = { ...config };

  if (detected.tariff_entity && (overwrite || !config.tariff_entity)) {
    merged.tariff_entity = detected.tariff_entity;
  }

  const existingEt = config.entity_types ?? {};
  const mergedEt: Record<string, EntityTypeConfig> = { ...existingEt };

  for (const [typeName, detectedCfg] of Object.entries(detected.entity_types)) {
    const existing    = existingEt[typeName] ?? {};
    const mergedType: Record<string, unknown> = { ...existing };
    for (const [k, v] of Object.entries(detectedCfg)) {
      if (v !== undefined && (overwrite || !existing[k as keyof EntityTypeConfig])) {
        mergedType[k] = v;
      }
    }
    mergedEt[typeName] = mergedType as EntityTypeConfig;
  }

  merged.entity_types = mergedEt;
  return merged;
}

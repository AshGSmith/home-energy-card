// Shared types and flow-computation logic.
// Kept separate to avoid circular imports between flow-layout ↔ node-detail.

import type { EntityRef, EntityTypeConfig } from "./types.js";

export interface HomeAssistant {
  states: Record<string, {
    state: string;
    attributes: Record<string, unknown>;
  }>;
  callApi<T>(method: "GET" | "POST", path: string): Promise<T>;
}

export type FlowDirection = "to-home" | "from-home" | "idle";

export interface FlowInfo {
  /** Net signed watts. grid: +import/−export. battery: +discharging/−charging. ev: +charging/−discharging. */
  power: number | null;
  /** Absolute watts after zero_tolerance; null when idle. */
  magnitude: number | null;
  direction: FlowDirection;
}

export function flowInfoFromNet(
  type: string,
  net: number | null,
  tolerance = 0,
): FlowInfo {
  const IDLE: FlowInfo = { power: null, magnitude: null, direction: "idle" };
  if (net === null) return IDLE;
  if (Math.abs(net) <= tolerance) return { power: 0, magnitude: null, direction: "idle" };

  const magnitude = Math.abs(net);
  let direction: FlowDirection;

  switch (type) {
    case "solar":   direction = "to-home"; break;
    case "grid":    direction = net > 0 ? "to-home"   : "from-home"; break;
    case "battery": direction = net > 0 ? "to-home"   : "from-home"; break;
    case "ev":      direction = net > 0 ? "from-home" : "to-home";   break;
    default:        direction = net > 0 ? "from-home" : "to-home";
  }

  return { power: net, magnitude, direction };
}

export function readNum(
  states: HomeAssistant["states"],
  entityId?: string,
): number | null {
  if (!entityId) return null;
  const s = states[entityId]?.state;
  if (!s || s === "unavailable" || s === "unknown") return null;
  const v = parseFloat(s);
  return isNaN(v) ? null : v;
}

export function entityIds(ref?: EntityRef): string[] {
  if (Array.isArray(ref)) return ref.filter(Boolean);
  if (typeof ref === "string" && ref) return [ref];
  return [];
}

export function firstEntityId(ref?: EntityRef): string | undefined {
  return entityIds(ref)[0];
}

export function normalizePowerToWatts(
  value: number,
  unitOfMeasurement?: string,
): number {
  const unit = unitOfMeasurement?.trim().toLowerCase();
  if (unit === "kw") return value * 1000;
  return value;
}

export function readPowerWatts(
  states: HomeAssistant["states"],
  ref?: EntityRef,
): number | null {
  const ids = entityIds(ref);
  if (!ids.length) return null;

  let sum = 0;
  let count = 0;

  for (const entityId of ids) {
    const s = states[entityId];
    if (!s || s.state === "unavailable" || s.state === "unknown") continue;
    const value = parseFloat(s.state);
    if (isNaN(value)) continue;
    sum += normalizePowerToWatts(
      value,
      s.attributes?.unit_of_measurement as string | undefined,
    );
    count += 1;
  }

  return count ? sum : null;
}

export function readEnergyKwh(
  states: HomeAssistant["states"],
  ref?: EntityRef,
): number | null {
  const ids = entityIds(ref);
  if (!ids.length) return null;

  let sum = 0;
  let count = 0;

  for (const entityId of ids) {
    const s = states[entityId];
    if (!s || s.state === "unavailable" || s.state === "unknown") continue;
    const value = parseFloat(s.state);
    if (isNaN(value)) continue;
    const unit = s.attributes?.unit_of_measurement as string | undefined;
    sum += unit === "Wh" ? value / 1000 : value;
    count += 1;
  }

  return count ? sum : null;
}

/**
 * Derive net power and flow direction for a node.
 *
 * Sign conventions:
 *   solar   — always to-home
 *   grid    — +import (grid→home) / −export (home→grid)
 *   battery — +discharging (battery→home) / −charging (home→battery)
 *   ev      — +charging (home→ev) / −V2H (ev→home)
 *   custom  — +from-home / −to-home
 *
 * When both power_import and power_export are set: net = import − export.
 * Missing side treated as 0 when the other side has data.
 */
export function computeRawPowerWatts(
  type: string,
  cfg: Pick<EntityTypeConfig, "power_combined" | "power_import" | "power_export" | "combined_power" | "import_power" | "export_power" | "zero_tolerance" | "reverse_power_flow">,
  states: HomeAssistant["states"],
): number | null {
  let net: number | null;
  const combinedRef = cfg.combined_power ?? cfg.power_combined;
  const importRef = cfg.import_power ?? cfg.power_import;
  const exportRef = cfg.export_power ?? cfg.power_export;

  if (combinedRef) {
    net = readPowerWatts(states, combinedRef);
  } else {
    const hasImp = Boolean(importRef);
    const hasExp = Boolean(exportRef);
    if (!hasImp && !hasExp) return null;

    const imp = hasImp ? readPowerWatts(states, importRef) : null;
    const exp = hasExp ? readPowerWatts(states, exportRef) : null;

    if ((hasImp ? imp === null : true) && (hasExp ? exp === null : true)) return null;
    net = (imp ?? 0) - (exp ?? 0);
  }

  if (type === "battery" && cfg.reverse_power_flow) net *= -1;
  return net;
}

export function computeFlowInfo(
  type: string,
  cfg: Pick<EntityTypeConfig, "power_combined" | "power_import" | "power_export" | "combined_power" | "import_power" | "export_power" | "zero_tolerance" | "reverse_power_flow">,
  states: HomeAssistant["states"],
): FlowInfo {
  return flowInfoFromNet(
    type,
    computeRawPowerWatts(type, cfg, states),
    cfg.zero_tolerance ?? 0,
  );
}

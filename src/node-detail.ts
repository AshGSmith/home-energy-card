import { LitElement, html, css, svg, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  DEFAULT_ENTITY_TYPES,
  type CardConfig,
  type EntityTypeConfig,
  type OctopusConfig,
} from "./types.js";
import {
  HomeAssistant,
  computeFlowInfo,
  FlowInfo,
  normalizePowerToWatts,
} from "./flow.js";
import { formatPower } from "./energy-node.js";

// ── Static maps ───────────────────────────────────────────────────────────────

const TYPE_ICON: Record<string, string> = {
  solar:   "mdi:solar-power-variant",
  grid:    "mdi:transmission-tower",
  battery: "mdi:home-battery",
  home:    "mdi:home-lightning-bolt",
  ev:      "mdi:car-electric",
};

const TYPE_ACCENT: Record<string, string> = {
  solar:   "#f9a825",
  grid:    "#e91e63",
  battery: "#43a047",
  home:    "#388e3c",
  ev:      "#1e88e5",
};

// Human-readable flow direction per type
const FLOW_LABEL: Record<string, Partial<Record<string, string>>> = {
  solar:   { "to-home": "producing" },
  grid:    { "to-home": "importing", "from-home": "exporting" },
  battery: { "to-home": "discharging", "from-home": "charging" },
  home:    { "to-home": "consuming" },
  ev:      { "to-home": "discharging (V2H)", "from-home": "charging" },
};

// ── History ───────────────────────────────────────────────────────────────────

type HistoryEntry = { state: string; last_changed: string };
type RateInterval = { startMs: number; endMs: number; rateGbpPerKwh: number };
type PeakOffPeakBreakdown = {
  peakUsageKwh: number;
  offPeakUsageKwh: number;
  peakCostGbp: number;
  offPeakCostGbp: number;
};
type GridMoneyState = {
  importCostToday: number | null;
  exportPaymentToday: number | null;
  netCost: number | null;
  peakOffPeak: PeakOffPeakBreakdown | null;
};

/**
 * Compute time-weighted absolute averages for 24 one-hour buckets.
 * Index 0 = 24 h ago, index 23 = most recent hour.
 */
function toHourlyAverages(
  history: HistoryEntry[],
  unitOfMeasurement?: string,
): (number | null)[] {
  const now = Date.now();
  const windowStart = now - 86_400_000; // 24 h in ms
  const out: (number | null)[] = Array(24).fill(null);

  if (!history.length) return out;

  for (let h = 0; h < 24; h++) {
    const bStart = windowStart + h * 3_600_000;
    const bEnd   = bStart + 3_600_000;
    let weightedSum = 0, totalMs = 0;

    for (let i = 0; i < history.length; i++) {
      const sStart = new Date(history[i].last_changed).getTime();
      const sEnd   = i + 1 < history.length
        ? new Date(history[i + 1].last_changed).getTime()
        : now;

      const oStart = Math.max(sStart, bStart);
      const oEnd   = Math.min(sEnd,   bEnd);
      if (oEnd <= oStart) continue;

      const raw = parseFloat(history[i].state);
      if (isNaN(raw)) continue;
      const v = normalizePowerToWatts(raw, unitOfMeasurement);

      const dur = oEnd - oStart;
      weightedSum += Math.abs(v) * dur;
      totalMs     += dur;
    }

    if (totalMs > 0) out[h] = weightedSum / totalMs;
  }

  return out;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function readNum(states: HomeAssistant["states"], id?: string): number | null {
  if (!id) return null;
  const s = states[id];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const v = parseFloat(s.state);
  return isNaN(v) ? null : v;
}

function readKwh(states: HomeAssistant["states"], id?: string): number | null {
  const v = readNum(states, id);
  if (v === null) return null;
  const unit = states[id!]?.attributes.unit_of_measurement as string | undefined;
  return unit === "Wh" ? v / 1000 : v;
}

function fmtKwh(v: number | null, d: number): string {
  return v === null ? "—" : `${v.toFixed(d)} kWh`;
}

function readCurrencyGbp(states: HomeAssistant["states"], id?: string): number | null {
  if (!id) return null;
  const s = states[id];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const v = parseFloat(s.state);
  if (isNaN(v)) return null;

  const unit = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  if (unit.includes("pence") || unit.startsWith("p/") || unit === "p") return v / 100;
  return v;
}

function readRateGbpPerKwh(states: HomeAssistant["states"], id?: string): number | null {
  if (!id) return null;
  const s = states[id];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const v = parseFloat(s.state);
  if (isNaN(v)) return null;

  const unit = String(s.attributes.unit_of_measurement ?? "").trim().toLowerCase();
  if (unit.includes("pence") || unit.startsWith("p/") || unit === "p") return v / 100;
  if (unit.includes("gbp") || unit.includes("£")) return v;
  return v;
}

function fmtCurrencyGbp(v: number | null): string {
  if (v === null) return "—";
  return `${v < 0 ? "-" : ""}£${Math.abs(v).toFixed(2)}`;
}

function parseRateValueGbpPerKwh(raw: unknown, unitHint?: string): number | null {
  const value = typeof raw === "number" ? raw : parseFloat(String(raw));
  if (isNaN(value)) return null;
  const unit = String(unitHint ?? "").trim().toLowerCase();
  if (unit.includes("pence") || unit.startsWith("p/") || unit === "p") return value / 100;
  if (unit.includes("gbp") || unit.includes("£")) return value;
  return value;
}

function parseRateIntervalsFromState(
  stateObj: HomeAssistant["states"][string] | undefined,
): RateInterval[] {
  if (!stateObj) return [];
  const unitHint = stateObj.attributes.unit_of_measurement as string | undefined;
  const rawRates: unknown[] =
    (stateObj.attributes.rates as unknown[]) ??
    (stateObj.attributes.current_day_rates as unknown[]) ??
    (stateObj.attributes.today_rates as unknown[]) ??
    (stateObj.attributes.upcoming_interval_rates as unknown[]) ??
    [];

  return rawRates
    .map((raw: any) => {
      const startMs = new Date(raw.start ?? raw.start_time ?? "").getTime();
      const endMs = new Date(raw.end ?? raw.end_time ?? "").getTime();
      const rate = parseRateValueGbpPerKwh(
        raw.value_inc_vat ?? raw.rate_inc_vat ?? raw.value ?? raw.rate,
        raw.unit_of_measurement ?? unitHint,
      );
      if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || !rate) return null;
      return { startMs, endMs, rateGbpPerKwh: rate };
    })
    .filter((interval): interval is RateInterval => interval !== null)
    .sort((a, b) => a.startMs - b.startMs);
}

function parseRateIntervalsFromHistory(
  history: HistoryEntry[],
  unitHint: string | undefined,
  endMs: number,
): RateInterval[] {
  if (!history.length) return [];

  const intervals: RateInterval[] = [];

  for (let i = 0; i < history.length; i++) {
    const startMs = new Date(history[i].last_changed).getTime();
    const nextStartMs =
      i + 1 < history.length
        ? new Date(history[i + 1].last_changed).getTime()
        : endMs;
    const rate = parseRateValueGbpPerKwh(history[i].state, unitHint);

    if (!Number.isFinite(startMs) || !Number.isFinite(nextStartMs) || nextStartMs <= startMs) {
      continue;
    }
    if (rate === null) continue;

    intervals.push({ startMs, endMs: nextStartMs, rateGbpPerKwh: rate });
  }

  return intervals;
}

function constantRateForWindow(
  history: HistoryEntry[],
  stateObj: HomeAssistant["states"][string] | undefined,
): number | null {
  const unitHint = stateObj?.attributes.unit_of_measurement as string | undefined;
  const values = history
    .map((entry) => parseRateValueGbpPerKwh(entry.state, unitHint))
    .filter((value): value is number => value !== null);

  if (values.length > 0) {
    const first = values[0];
    if (values.every((value) => Math.abs(value - first) < 1e-9)) return first;
    return null;
  }

  return stateObj ? parseRateValueGbpPerKwh(stateObj.state, unitHint) : null;
}

function cumulativeValueToKwh(value: number, unit?: string): number {
  return String(unit ?? "").trim().toLowerCase() === "wh" ? value / 1000 : value;
}

function intervalCostFromHistory(
  history: HistoryEntry[],
  unit: string | undefined,
  rates: RateInterval[],
): number | null {
  if (history.length < 2 || !rates.length) return null;
  let total = 0;
  let matched = false;

  for (let i = 1; i < history.length; i++) {
    const startMs = new Date(history[i - 1].last_changed).getTime();
    const endMs = new Date(history[i].last_changed).getTime();
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) continue;

    const prev = parseFloat(history[i - 1].state);
    const next = parseFloat(history[i].state);
    if (isNaN(prev) || isNaN(next)) continue;

    const deltaKwh = cumulativeValueToKwh(next - prev, unit);
    if (deltaKwh <= 0) continue;

    const durationMs = endMs - startMs;
    let weightedRate = 0;
    let coveredMs = 0;

    for (const rate of rates) {
      const overlapStart = Math.max(startMs, rate.startMs);
      const overlapEnd = Math.min(endMs, rate.endMs);
      if (overlapEnd <= overlapStart) continue;
      const overlapMs = overlapEnd - overlapStart;
      coveredMs += overlapMs;
      weightedRate += rate.rateGbpPerKwh * overlapMs;
    }

    if (coveredMs > 0) {
      matched = true;
      total += deltaKwh * (weightedRate / coveredMs);
    } else if (durationMs > 0) {
      return null;
    }
  }

  return matched ? total : null;
}

function peakOffPeakFromHistory(
  history: HistoryEntry[],
  unit: string | undefined,
  rates: RateInterval[],
): PeakOffPeakBreakdown | null {
  if (history.length < 2 || !rates.length) return null;

  const distinctRates = Array.from(
    new Set(rates.map((rate) => Number(rate.rateGbpPerKwh.toFixed(6)))),
  ).sort((a, b) => a - b);

  if (distinctRates.length < 2) return null;
  if (distinctRates.length > 2) return null;

  const offPeakRate = distinctRates[0];
  const peakRate = distinctRates[distinctRates.length - 1];

  let peakUsageKwh = 0;
  let offPeakUsageKwh = 0;
  let peakCostGbp = 0;
  let offPeakCostGbp = 0;
  let matched = false;

  for (let i = 1; i < history.length; i++) {
    const startMs = new Date(history[i - 1].last_changed).getTime();
    const endMs = new Date(history[i].last_changed).getTime();
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) continue;

    const prev = parseFloat(history[i - 1].state);
    const next = parseFloat(history[i].state);
    if (isNaN(prev) || isNaN(next)) continue;

    const deltaKwh = cumulativeValueToKwh(next - prev, unit);
    if (deltaKwh <= 0) continue;

    const durationMs = endMs - startMs;
    let peakMs = 0;
    let offPeakMs = 0;

    for (const rate of rates) {
      const overlapStart = Math.max(startMs, rate.startMs);
      const overlapEnd = Math.min(endMs, rate.endMs);
      if (overlapEnd <= overlapStart) continue;

      const overlapMs = overlapEnd - overlapStart;
      const rateValue = Number(rate.rateGbpPerKwh.toFixed(6));
      if (rateValue === peakRate) peakMs += overlapMs;
      if (rateValue === offPeakRate) offPeakMs += overlapMs;
    }

    const coveredMs = peakMs + offPeakMs;
    if (coveredMs <= 0) continue;

    matched = true;
    const peakPortion = deltaKwh * (peakMs / coveredMs);
    const offPeakPortion = deltaKwh * (offPeakMs / coveredMs);
    peakUsageKwh += peakPortion;
    offPeakUsageKwh += offPeakPortion;
    peakCostGbp += peakPortion * peakRate;
    offPeakCostGbp += offPeakPortion * offPeakRate;
  }

  return matched
    ? { peakUsageKwh, offPeakUsageKwh, peakCostGbp, offPeakCostGbp }
    : null;
}

function fmtHour(date: Date): string {
  return `${date.getHours().toString().padStart(2, "0")}:00`;
}

function fmtTime(iso: string): string {
  const d = new Date(iso);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function rateColor(p: number): string {
  if (p < 0)  return "#43a047"; // negative (being paid)
  if (p < 8)  return "#66bb6a"; // very cheap
  if (p < 20) return "#ffa726"; // mid
  return "#ef5350";             // expensive
}

function socColor(soc: number): string {
  if (soc < 20) return "#ef5350";
  if (soc < 50) return "#ffa726";
  return "#66bb6a";
}

// ── Component ─────────────────────────────────────────────────────────────────

@customElement("hec-node-detail")
export class HecNodeDetail extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: CardConfig;
  @property() nodeType = "";
  @property({ type: Boolean }) open = false;

  @state() private _hourly: (number | null)[] = [];
  @state() private _loading = false;
  @state() private _gridMoney: GridMoneyState | null = null;

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    if ((changed.has("open") || changed.has("nodeType")) && this.open && this.nodeType) {
      this._loadHistory();
      if (this.nodeType === "grid") {
        this._loadGridMoney();
      } else {
        this._gridMoney = null;
      }
    }
  }

  private async _loadHistory() {
    const cfg = this.config?.entity_types?.[this.nodeType];
    const entityId = cfg?.power_combined ?? cfg?.power_import ?? cfg?.power_export;
    if (!entityId || !this.hass) return;
    const unitOfMeasurement =
      this.hass.states?.[entityId]?.attributes.unit_of_measurement as string | undefined;

    this._loading = true;
    this._hourly  = [];

    try {
      const now   = new Date();
      const start = new Date(now.getTime() - 86_400_000);
      const path  =
        `history/period/${start.toISOString()}` +
        `?filter_entity_id=${entityId}` +
        `&minimal_response=true&no_attributes=true` +
        `&end_time=${now.toISOString()}`;

      const raw = await this.hass.callApi<HistoryEntry[][]>("GET", path);
      this._hourly = toHourlyAverages(raw?.[0] ?? [], unitOfMeasurement);
    } catch (err) {
      console.warn("[hec-node-detail] history fetch failed", err);
      this._hourly = [];
    } finally {
      this._loading = false;
    }
  }

  private async _loadGridMoney() {
    const gridCfg = this.config?.entity_types?.grid;
    const oct = gridCfg?.octopus;
    if (!this.hass || !gridCfg || !oct) {
      this._gridMoney = null;
      return;
    }

    const importRatesFromState = parseRateIntervalsFromState(
      oct.slots_entity ? this.hass.states?.[oct.slots_entity] : undefined,
    );
    const exportRateState = gridCfg.export_rate ? this.hass.states?.[gridCfg.export_rate] : undefined;
    const exportRatesFromState = parseRateIntervalsFromState(
      exportRateState,
    );

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();

    const fetchHistory = async (entityId?: string): Promise<HistoryEntry[]> => {
      if (!entityId || !this.hass) return [];
      const path =
        `history/period/${start.toISOString()}` +
        `?filter_entity_id=${entityId}` +
        `&minimal_response=true&no_attributes=true` +
        `&end_time=${end.toISOString()}`;
      const raw = await this.hass.callApi<HistoryEntry[][]>("GET", path);
      return raw?.[0] ?? [];
    };

    try {
      const [importHistory, exportHistory, importRateHistory, exportRateHistory] = await Promise.all([
        fetchHistory(gridCfg.daily_usage),
        fetchHistory(gridCfg.daily_export),
        fetchHistory(oct.rate_entity),
        fetchHistory(gridCfg.export_rate),
      ]);

      const importUnit = gridCfg.daily_usage
        ? this.hass.states?.[gridCfg.daily_usage]?.attributes.unit_of_measurement as string | undefined
        : undefined;
      const exportUnit = gridCfg.daily_export
        ? this.hass.states?.[gridCfg.daily_export]?.attributes.unit_of_measurement as string | undefined
        : undefined;
      const importRateUnit = oct.rate_entity
        ? this.hass.states?.[oct.rate_entity]?.attributes.unit_of_measurement as string | undefined
        : undefined;
      const exportRateUnit = gridCfg.export_rate
        ? this.hass.states?.[gridCfg.export_rate]?.attributes.unit_of_measurement as string | undefined
        : undefined;
      const effectiveImportRates =
        importRatesFromState.length
          ? importRatesFromState
          : parseRateIntervalsFromHistory(importRateHistory, importRateUnit, end.getTime());
      const effectiveExportRates =
        exportRatesFromState.length
          ? exportRatesFromState
          : parseRateIntervalsFromHistory(exportRateHistory, exportRateUnit, end.getTime());
      const importTotalKwh = readKwh(this.hass.states, gridCfg.daily_usage);
      const exportTotalKwh = readKwh(this.hass.states, gridCfg.daily_export);
      const constantExportRate = constantRateForWindow(exportRateHistory, exportRateState);

      const intervalImportCost = intervalCostFromHistory(
        importHistory,
        importUnit,
        effectiveImportRates,
      );
      const peakOffPeak = peakOffPeakFromHistory(
        importHistory,
        importUnit,
        effectiveImportRates,
      );
      const intervalExportPayment = intervalCostFromHistory(
        exportHistory,
        exportUnit,
        effectiveExportRates,
      );
      const fallbackImportCost = readCurrencyGbp(this.hass.states, oct.cost_entity);

      const importCostToday = intervalImportCost ?? fallbackImportCost;
      const exportPaymentToday =
        intervalExportPayment ??
        (exportTotalKwh !== null && constantExportRate !== null
          ? exportTotalKwh * constantExportRate
          : null);
      const netCost =
        importCostToday !== null && exportPaymentToday !== null
          ? importCostToday - exportPaymentToday
          : null;

      this._gridMoney = {
        importCostToday,
        exportPaymentToday,
        netCost,
        peakOffPeak,
      };
    } catch (err) {
      console.warn("[hec-node-detail] grid money load failed", err);
      this._gridMoney = null;
    }
  }

  private _close() {
    this.dispatchEvent(new CustomEvent("hec-close", { bubbles: true, composed: true }));
  }

  // ── Section renderers ─────────────────────────────────────────────────────

  private _header(accent: string, icon: string, label: string) {
    return html`
      <div class="d-header">
        <ha-icon .icon=${icon} style="color:${accent};--mdc-icon-size:22px;"></ha-icon>
        <span class="d-title">${label}</span>
        <button class="close-btn" @click=${this._close} aria-label="Close">
          <ha-icon icon="mdi:close" style="--mdc-icon-size:18px;"></ha-icon>
        </button>
      </div>
    `;
  }

  private _sectionPower(flow: FlowInfo) {
    const d     = this.config?.display?.decimal_places ?? 1;
    const u     = this.config?.display?.unit ?? "auto";
    const label = FLOW_LABEL[this.nodeType]?.[flow.direction] ?? "";

    return html`
      <div class="section">
        <div class="s-title">Current power</div>
        <div class="power-big">${formatPower(flow.power, u, d)}</div>
        ${label ? html`<div class="power-sub">${label}</div>` : nothing}
      </div>
    `;
  }

  private _sectionSoc(soc: number | null) {
    if (soc === null) return nothing;
    const color = socColor(soc);
    return html`
      <div class="section">
        <div class="s-title">State of charge</div>
        <div class="soc-row">
          <div class="soc-track">
            <div class="soc-fill" style="width:${soc}%;background:${color};"></div>
          </div>
          <span class="soc-pct">${soc.toFixed(0)}%</span>
        </div>
      </div>
    `;
  }

  private _sectionDaily(cfg: EntityTypeConfig) {
    const states = this.hass?.states ?? {};
    const d = this.config?.display?.decimal_places ?? 1;

    // Key labels differ by type
    const usageKey =
      this.nodeType === "solar"   ? "Production"     :
      this.nodeType === "grid"    ? "Import"          :
      this.nodeType === "battery" ? "Charged"         :
      this.nodeType === "ev"      ? "Charged"         : "Usage";
    const exportKey =
      this.nodeType === "battery" ? "Discharged"      :
      this.nodeType === "ev"      ? "Discharged (V2H)":  "Export";

    const rows: [string, string][] = [];
    if (cfg.daily_usage)  rows.push([usageKey,  fmtKwh(readKwh(states, cfg.daily_usage),  d)]);
    if (cfg.daily_export) rows.push([exportKey, fmtKwh(readKwh(states, cfg.daily_export), d)]);
    if (!rows.length) return nothing;

    return html`
      <div class="section">
        <div class="s-title">Today</div>
        ${rows.map(([k, v]) => html`
          <div class="kv">
            <span class="kv-k">${k}</span>
            <span class="kv-v">${v}</span>
          </div>
        `)}
      </div>
    `;
  }

  private _sectionOctopus(oct: OctopusConfig) {
    const states = this.hass?.states ?? {};

    const rateS = oct.rate_entity  ? states[oct.rate_entity]  : null;
    const slotsS = oct.slots_entity ? states[oct.slots_entity] : null;

    const rateVal  = rateS?.state;
    const rateUnit = (rateS?.attributes.unit_of_measurement as string | undefined) ?? "p/kWh";

    // Try several attribute names used by different Octopus integration versions
    const rawRates: unknown[] =
      (slotsS?.attributes.rates               as unknown[]) ??
      (slotsS?.attributes.upcoming_interval_rates as unknown[]) ??
      (slotsS?.attributes.today_rates          as unknown[]) ??
      [];

    const nowMs = Date.now();
    const upcoming = rawRates
      .filter((r: any) => new Date(r.end ?? r.end_time ?? 0).getTime() > nowMs)
      .slice(0, 6) as any[];

    const hasRate  = rateVal && rateVal !== "unavailable" && rateVal !== "unknown";
    const importCostToday = this._gridMoney?.importCostToday ?? null;
    const exportPaymentToday = this._gridMoney?.exportPaymentToday ?? null;
    const netCost = this._gridMoney?.netCost ?? null;
    const peakOffPeak = this._gridMoney?.peakOffPeak ?? null;

    if (
      !hasRate &&
      !upcoming.length &&
      importCostToday === null &&
      exportPaymentToday === null &&
      netCost === null &&
      peakOffPeak === null
    ) return nothing;

    return html`
      <div class="section">
        <div class="s-title">Octopus</div>

        ${hasRate ? html`
          <div class="kv">
            <span class="kv-k">Rate</span>
            <span class="kv-v">${parseFloat(rateVal!).toFixed(2)} ${rateUnit}</span>
          </div>
        ` : nothing}

        <div class="kv">
          <span class="kv-k">Import Cost Today</span>
          <span class="kv-v">${fmtCurrencyGbp(importCostToday)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Export Payment Today</span>
          <span class="kv-v">${fmtCurrencyGbp(exportPaymentToday)}</span>
        </div>

        <div class="kv">
          <span class="kv-k">Net Cost</span>
          <span class="kv-v">${fmtCurrencyGbp(netCost)}</span>
        </div>

        ${this._sectionPeakOffPeak(peakOffPeak)}

        ${upcoming.length ? html`
          <div class="s-subtitle">Upcoming slots</div>
          ${upcoming.map((r: any) => {
            const start = r.start ?? r.start_time ?? "";
            const end   = r.end   ?? r.end_time   ?? "";
            const rate  = r.value_inc_vat ?? r.rate_inc_vat ?? r.value ?? 0;
            const color = rateColor(rate);
            return html`
              <div class="slot">
                <span class="slot-dot" style="background:${color};"></span>
                <span class="slot-time">${fmtTime(start)}–${fmtTime(end)}</span>
                <span class="slot-rate" style="color:${color};">${(+rate).toFixed(2)}p</span>
              </div>
            `;
          })}
        ` : nothing}
      </div>
    `;
  }

  private _sectionPeakOffPeak(breakdown: PeakOffPeakBreakdown | null) {
    if (!breakdown) {
      return html`
        <div class="s-subtitle">Peak vs Off Peak</div>
        <div class="chart-msg">No interval tariff data</div>
      `;
    }

    const totalUsage = breakdown.peakUsageKwh + breakdown.offPeakUsageKwh;
    if (totalUsage <= 0) {
      return html`
        <div class="s-subtitle">Peak vs Off Peak</div>
        <div class="chart-msg">No import data</div>
      `;
    }

    const peakPct = breakdown.peakUsageKwh / totalUsage;
    const peakAngle = peakPct * Math.PI * 2;
    const peakX = 20 + 18 * Math.sin(peakAngle);
    const peakY = 20 - 18 * Math.cos(peakAngle);
    const largeArc = peakPct > 0.5 ? 1 : 0;
    const peakPath =
      peakPct >= 0.999
        ? "M20 2 A18 18 0 1 1 19.99 2 Z"
        : peakPct <= 0.001
          ? ""
          : `M20 20 L20 2 A18 18 0 ${largeArc} 1 ${peakX.toFixed(3)} ${peakY.toFixed(3)} Z`;

    return html`
      <div class="s-subtitle">Peak vs Off Peak</div>
      <div class="peak-row">
        <svg class="peak-pie" viewBox="0 0 40 40" aria-label="Peak vs Off Peak usage split">
          <circle cx="20" cy="20" r="18" fill="#e8f5e9"></circle>
          ${peakPath
            ? svg`<path d="${peakPath}" fill="#ef5350"></path>`
            : nothing}
          <circle cx="20" cy="20" r="9" fill="white"></circle>
        </svg>

        <div class="peak-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background:#ef5350;"></span>
            <span class="legend-label">Peak ${(peakPct * 100).toFixed(0)}%</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background:#66bb6a;"></span>
            <span class="legend-label">Off Peak ${((1 - peakPct) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
      <div class="kv">
        <span class="kv-k">Peak Usage</span>
        <span class="kv-v">${fmtKwh(breakdown.peakUsageKwh, this.config?.display?.decimal_places ?? 1)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Usage</span>
        <span class="kv-v">${fmtKwh(breakdown.offPeakUsageKwh, this.config?.display?.decimal_places ?? 1)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Peak Cost</span>
        <span class="kv-v">${fmtCurrencyGbp(breakdown.peakCostGbp)}</span>
      </div>
      <div class="kv">
        <span class="kv-k">Off Peak Cost</span>
        <span class="kv-v">${fmtCurrencyGbp(breakdown.offPeakCostGbp)}</span>
      </div>
    `;
  }

  private _sectionChart(accent: string) {
    const valid = this._hourly.filter((v): v is number => v !== null);
    const max   = valid.length ? Math.max(...valid) : 0;
    const now   = new Date();
    const label = (h: number) => fmtHour(new Date(now.getTime() - h * 3_600_000));

    if (this._loading) return html`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        <div class="chart-msg">Loading…</div>
      </div>
    `;

    return html`
      <div class="section">
        <div class="s-title">Last 24 hours</div>
        ${max === 0
          ? html`<div class="chart-msg">No data</div>`
          : html`
              ${svg`
                <svg class="chart-svg" viewBox="0 0 240 52" preserveAspectRatio="none">
                  ${this._hourly.map((v, i) => {
                    if (v === null || v <= 0) return svg``;
                    const barH = Math.max(2, (v / max) * 48);
                    return svg`
                      <rect
                        x="${i * 10 + 0.5}" y="${52 - barH}"
                        width="9" height="${barH}" rx="2"
                        fill="${accent}" opacity="0.82"
                      />
                    `;
                  })}
                </svg>
              `}
              <div class="chart-labels">
                <span>${label(24)}</span>
                <span>${label(18)}</span>
                <span>${label(12)}</span>
                <span>${label(6)}</span>
                <span>Now</span>
              </div>
            `}
      </div>
    `;
  }

  // ── Main render ───────────────────────────────────────────────────────────

  render() {
    if (!this.open || !this.nodeType) return nothing;

    const cfg    = this.config?.entity_types?.[this.nodeType] ?? {};
    const states = this.hass?.states ?? {};
    const accent = cfg.colour || (TYPE_ACCENT[this.nodeType] ?? "#9e9e9e");
    const icon   = cfg.icon || TYPE_ICON[this.nodeType] || "mdi:lightning-bolt";
    const label  = cfg.label
      || this.nodeType.charAt(0).toUpperCase() + this.nodeType.slice(1);

    const flow = computeFlowInfo(this.nodeType, cfg, states);

    const hasSoc =
      Boolean(cfg.soc) &&
      (
        ["battery", "ev"].includes(this.nodeType) ||
        !(DEFAULT_ENTITY_TYPES as readonly string[]).includes(this.nodeType)
      );
    const soc    = hasSoc ? readNum(states, cfg.soc) : null;

    return html`
      <div
        class="overlay"
        @click=${(e: MouseEvent) => e.target === e.currentTarget && this._close()}
      >
        <div class="panel" role="dialog" aria-modal="true">
          ${this._header(accent, icon, label)}
          ${this._sectionPower(flow)}
          ${hasSoc ? this._sectionSoc(soc) : nothing}
          ${this._sectionDaily(cfg)}
          ${this.nodeType === "grid" && cfg.octopus
            ? this._sectionOctopus(cfg.octopus)
            : nothing}
          ${this._sectionChart(accent)}
        </div>
      </div>
    `;
  }

  // ── Styles ────────────────────────────────────────────────────────────────

  static styles = css`
    :host { display: contents; }

    /* ── Overlay ── */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.42);
      z-index: 9999;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    /* ── Panel (bottom sheet) ── */
    .panel {
      background: var(--card-background-color, #fff);
      border-radius: 20px 20px 0 0;
      width: 100%;
      max-width: 480px;
      max-height: 86vh;
      overflow-y: auto;
      overscroll-behavior: contain;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.14);
      /* push content above the home indicator on iOS/Android */
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }

    /* ── Dialog header ── */
    .d-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 16px 12px;
      position: sticky;
      top: 0;
      background: var(--card-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.08));
      z-index: 1;
    }
    .d-title {
      flex: 1;
      font-size: 1em;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .close-btn:hover {
      background: var(--secondary-background-color, rgba(0,0,0,0.06));
    }

    /* ── Sections ── */
    .section {
      padding: 14px 16px;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.07));
    }
    .section:last-child { border-bottom: none; padding-bottom: 40px; }

    .s-title {
      font-size: 0.63em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      opacity: 0.4;
      margin-bottom: 10px;
    }
    .s-subtitle {
      font-size: 0.63em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      opacity: 0.35;
      margin: 10px 0 6px;
    }

    /* ── Power ── */
    .power-big {
      font-size: 2.2em;
      font-weight: 700;
      line-height: 1;
      color: var(--primary-text-color);
    }
    .power-sub {
      font-size: 0.8em;
      margin-top: 5px;
      opacity: 0.55;
    }

    /* ── SOC ── */
    .soc-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .soc-track {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .soc-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease;
    }
    .soc-pct {
      font-size: 0.9em;
      font-weight: 600;
      width: 42px;
      text-align: right;
      flex-shrink: 0;
    }

    /* ── Key/value rows ── */
    .kv {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 0.9em;
      padding: 3px 0;
    }
    .kv-k { opacity: 0.55; }
    .kv-v { font-weight: 600; }

    .peak-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 6px 0 10px;
    }
    .peak-pie {
      width: 72px;
      height: 72px;
      flex-shrink: 0;
    }
    .peak-legend {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .legend-label {
      font-size: 0.82em;
      font-weight: 600;
      color: var(--primary-text-color);
      white-space: nowrap;
    }

    /* ── Octopus slots ── */
    .slot {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 0;
      font-size: 0.85em;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.05));
    }
    .slot:first-of-type { border-top: none; }
    .slot-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .slot-time { flex: 1; opacity: 0.6; font-variant-numeric: tabular-nums; }
    .slot-rate { font-weight: 700; white-space: nowrap; }

    /* ── Chart ── */
    .chart-svg {
      width: 100%;
      display: block;
      height: 52px;
      margin-bottom: 4px;
    }
    .chart-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.6em;
      opacity: 0.4;
      font-variant-numeric: tabular-nums;
    }
    .chart-msg {
      font-size: 0.8em;
      opacity: 0.4;
      text-align: center;
      padding: 10px 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "hec-node-detail": HecNodeDetail;
  }
}

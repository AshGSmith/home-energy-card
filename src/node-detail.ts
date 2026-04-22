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

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    if ((changed.has("open") || changed.has("nodeType")) && this.open && this.nodeType) {
      this._loadHistory();
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
    const gridCfg = this.config?.entity_types?.grid ?? {};

    const rateS = oct.rate_entity  ? states[oct.rate_entity]  : null;
    const costS = oct.cost_entity  ? states[oct.cost_entity]  : null;
    const slotsS = oct.slots_entity ? states[oct.slots_entity] : null;

    const rateVal  = rateS?.state;
    const rateUnit = (rateS?.attributes.unit_of_measurement as string | undefined) ?? "p/kWh";
    const costVal  = costS?.state;
    const costUnit = (costS?.attributes.unit_of_measurement as string | undefined) ?? "£";

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
    const hasCost  = costVal && costVal !== "unavailable" && costVal !== "unknown";
    const importKwh = readKwh(states, gridCfg.daily_usage);
    const exportKwh = readKwh(states, gridCfg.daily_export);
    const importRateGbp = readRateGbpPerKwh(states, oct.rate_entity);
    const exportRateGbp = readRateGbpPerKwh(states, gridCfg.export_rate);
    const importCostToday =
      importKwh !== null && importRateGbp !== null
        ? importKwh * importRateGbp
        : readCurrencyGbp(states, oct.cost_entity);
    const exportPaymentToday =
      exportKwh !== null && exportRateGbp !== null
        ? exportKwh * exportRateGbp
        : null;
    const netCost =
      importCostToday !== null && exportPaymentToday !== null
        ? importCostToday - exportPaymentToday
        : null;

    if (
      !hasRate &&
      !hasCost &&
      !upcoming.length &&
      importCostToday === null &&
      exportPaymentToday === null &&
      netCost === null
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

        ${importCostToday !== null ? html`
          <div class="kv">
            <span class="kv-k">Import Cost Today</span>
            <span class="kv-v">${fmtCurrencyGbp(importCostToday)}</span>
          </div>
        ` : nothing}

        ${exportPaymentToday !== null ? html`
          <div class="kv">
            <span class="kv-k">Export Payment Today</span>
            <span class="kv-v">${fmtCurrencyGbp(exportPaymentToday)}</span>
          </div>
        ` : nothing}

        ${netCost !== null ? html`
          <div class="kv">
            <span class="kv-k">Net Cost</span>
            <span class="kv-v">${fmtCurrencyGbp(netCost)}</span>
          </div>
        ` : nothing}

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

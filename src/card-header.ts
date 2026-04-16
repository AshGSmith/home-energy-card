import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { CardConfig } from "./types.js";
import type { HomeAssistant } from "./flow.js";

// ── Energy reading ────────────────────────────────────────────────────────────

/**
 * Read a daily energy entity, normalising Wh → kWh automatically.
 * Returns null when the entity is missing, unavailable, or non-numeric.
 */
function readKwh(states: HomeAssistant["states"], id?: string): number | null {
  if (!id) return null;
  const s = states[id];
  if (!s || s.state === "unavailable" || s.state === "unknown") return null;
  const v = parseFloat(s.state);
  if (isNaN(v)) return null;
  const unit = s.attributes.unit_of_measurement as string | undefined;
  return unit === "Wh" ? v / 1000 : v;
}

function fmtKwh(v: number | null, decimals: number): string {
  return v === null ? "—" : v.toFixed(decimals);
}

// ── Tariff ────────────────────────────────────────────────────────────────────

interface TariffStyle { label: string; bg: string; fg: string }

function tariffStyle(raw: string): TariffStyle {
  const n = raw.toLowerCase().replace(/[\s_-]/g, "");
  const label = raw.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (["offpeak", "low", "cheap", "free", "economy"].some((k) => n.includes(k)))
    return { label, bg: "#e8f5e9", fg: "#2e7d32" };
  if (["peak", "high", "expensive"].some((k) => n.includes(k)) && !n.includes("off"))
    return { label, bg: "#fce4ec", fg: "#c62828" };
  if (["shoulder", "mid", "standard"].some((k) => n.includes(k)))
    return { label, bg: "#fff8e1", fg: "#e65100" };

  return {
    label,
    bg: "var(--secondary-background-color, #f5f5f5)",
    fg: "var(--secondary-text-color, #757575)",
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

@customElement("hec-card-header")
export class HecCardHeader extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: CardConfig;
  @property({ type: Boolean }) showTitle = true;

  static styles = css`
    :host { display: block; }

    .header {
      padding: 12px 16px 10px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    /* ── Title row ── */
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 24px;
    }

    .title {
      font-size: 1em;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tariff {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 10px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Stats row ── */
    .stats-row {
      display: flex;
      align-items: baseline;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0 14px;
      margin-top: 5px;
    }

    /* divider between stat groups */
    .stats-row > * + *::before {
      content: "·";
      margin-right: 14px;
      opacity: 0.3;
      font-size: 0.75em;
    }

    .stat {
      display: flex;
      align-items: baseline;
      gap: 2px;
      white-space: nowrap;
    }

    .stat-label {
      font-size: 0.68em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      opacity: 0.55;
      margin-right: 2px;
    }

    .stat-val {
      font-size: 0.88em;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .stat-unit {
      font-size: 0.62em;
      opacity: 0.45;
      margin-left: 1px;
    }

    /* Grid import/export inline pair */
    .grid-pair {
      display: flex;
      align-items: baseline;
      gap: 6px;
      white-space: nowrap;
    }

    .grid-half {
      display: flex;
      align-items: baseline;
      gap: 2px;
    }

    .arrow {
      font-size: 0.72em;
      font-weight: 700;
      opacity: 0.7;
    }
  `;

  render() {
    if (!this.config) return nothing;

    const states = this.hass?.states ?? {};
    const et     = this.config.entity_types ?? {};
    const d      = this.config.display?.decimal_places ?? 1;

    // Tariff
    const tState = this.config.tariff_entity ? states[this.config.tariff_entity]?.state : null;
    const tariff =
      tState && tState !== "unavailable" && tState !== "unknown"
        ? tariffStyle(tState)
        : null;

    // Daily stats
    const solar   = readKwh(states, et.solar?.daily_usage);
    const usage   = readKwh(states, et.home?.daily_usage);
    const gridImp = readKwh(states, et.grid?.daily_usage);
    const gridExp = readKwh(states, et.grid?.daily_export);

    const hasSolar = Boolean(et.solar?.daily_usage);
    const hasUsage = Boolean(et.home?.daily_usage);
    const hasGridImp = Boolean(et.grid?.daily_usage);
    const hasGridExp = Boolean(et.grid?.daily_export);
    const hasGrid  = hasGridImp || hasGridExp;
    const hasStats = hasSolar || hasUsage || hasGrid;

    return html`
      <div class="header">

        ${this.showTitle || tariff ? html`
          <div class="title-row">
            ${this.showTitle
              ? html`<span class="title">${this.config.title ?? "Home Energy"}</span>`
              : nothing}
            ${tariff
              ? html`
                  <span
                    class="tariff"
                    style="background:${tariff.bg};color:${tariff.fg};"
                  >${tariff.label}</span>
                `
              : nothing}
          </div>
        ` : nothing}

        ${hasStats ? html`
          <div class="stats-row">

            ${hasSolar ? html`
              <div class="stat">
                <span class="stat-label" style="color:#f9a825;">☀ Solar</span>
                <span class="stat-val">${fmtKwh(solar, d)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : nothing}

            ${hasUsage ? html`
              <div class="stat">
                <span class="stat-label" style="color:#e91e63;">⌂ Usage</span>
                <span class="stat-val">${fmtKwh(usage, d)}</span>
                <span class="stat-unit">kWh</span>
              </div>
            ` : nothing}

            ${hasGrid ? html`
              <div class="stat">
                <span class="stat-label" style="color:#1e88e5;">⚡ Grid</span>
                <div class="grid-pair">
                  ${hasGridImp ? html`
                    <div class="grid-half">
                      <span class="arrow" style="color:#1e88e5;">↓</span>
                      <span class="stat-val">${fmtKwh(gridImp, d)}</span>
                    </div>
                  ` : nothing}
                  ${hasGridExp ? html`
                    <div class="grid-half">
                      <span class="arrow" style="color:#42a5f5;">↑</span>
                      <span class="stat-val">${fmtKwh(gridExp, d)}</span>
                    </div>
                  ` : nothing}
                  <span class="stat-unit">kWh</span>
                </div>
              </div>
            ` : nothing}

          </div>
        ` : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hec-card-header": HecCardHeader;
  }
}

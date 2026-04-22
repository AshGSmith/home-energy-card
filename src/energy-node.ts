import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface NodeStyles {
  gradStart: string;
  gradEnd: string;
  accent: string;
  icon: string;
}

const TYPE_STYLES: Record<string, NodeStyles> = {
  solar:   { gradStart: "#fff8e1", gradEnd: "#ffe082", accent: "#f9a825", icon: "mdi:solar-power-variant" },
  grid:    { gradStart: "#f3e5f5", gradEnd: "#ce93d8", accent: "#8e24aa", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#ffebee", gradEnd: "#ef9a9a", accent: "#e53935", icon: "mdi:home-battery" },
  home:    { gradStart: "#f1f8e9", gradEnd: "#c5e1a5", accent: "#388e3c", icon: "mdi:home-lightning-bolt" },
  ev:      { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:car-electric" },
};

const FALLBACK_STYLES: NodeStyles = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt",
};

// ── Ring geometry ──────────────────────────────────────────────────────────────
// SVG viewBox is "0 0 84 84"; centre at (42, 42).
// r=38, stroke-width=4  →  outer edge at r=40 (82 px from left, inside 84 ✓)
//                          inner edge at r=36 — node inset 8 px has r=34, 2 px gap.
const RING_R = 38;
const RING_C = +(2 * Math.PI * RING_R).toFixed(4); // ≈ 238.7610

export function formatPower(
  watts: number | null,
  unit: "W" | "kW" | "auto",
  decimals: number,
): string {
  if (watts === null) return "—";
  const abs = Math.abs(watts);
  if (unit === "W" || (unit === "auto" && abs < 1000)) {
    return `${Math.round(watts)} W`;
  }
  return `${(watts / 1000).toFixed(decimals)} kW`;
}

export function formatEnergyKwh(kwh: number | null, decimals: number): string {
  return kwh === null ? "—" : `${kwh.toFixed(decimals)} kWh`;
}

@customElement("hec-energy-node")
export class HecEnergyNode extends LitElement {
  @property() type = "home";
  @property() label = "";
  @property({ type: Boolean }) showLabel = true;
  @property() icon = "";
  @property() bottomText = "";
  @property() colour = "";
  @property({ type: Number }) power: number | null = null;
  @property({ type: Number }) soc: number | null = null;
  @property() unit: "W" | "kW" | "auto" = "auto";
  @property({ type: Number }) decimalPlaces = 1;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Outer wrapper — uniform size for all nodes ── */
    .node-wrap {
      position: relative;
      width: 84px;
      height: 84px;
      flex-shrink: 0;
    }

    /* ── SOC progress ring (SVG overlay) ── */
    .soc-ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
    }
    .soc-ring.has-soc { opacity: 1; }

    .ring-track {
      fill: none;
      stroke: rgba(0, 0, 0, 0.10);
      stroke-width: 4;
    }

    .ring-progress {
      fill: none;
      stroke: #66bb6a;
      stroke-width: 4;
      stroke-linecap: round;
      /* start at 12 o'clock */
      transform: rotate(-90deg);
      transform-origin: 42px 42px;
      transition: stroke-dashoffset 0.6s ease;
    }

    /* ── Inner circle ── */
    .node {
      position: absolute;
      inset: 8px;           /* 84 − 2×8 = 68 px diameter */
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.14);
      overflow: hidden;
      transition: box-shadow 0.15s ease, transform 0.1s ease;
    }
    .node:hover {
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
      transform: scale(1.05);
    }
    .node:active { transform: scale(1.00); }

    ha-icon { --mdc-icon-size: 22px; }

    .label {
      font-size: 0.58em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.65;
      white-space: nowrap;
    }

    .power {
      font-size: 0.78em;
      font-weight: 700;
      white-space: nowrap;
      color: #1a1a2e;
    }

    .direction-icon {
      --mdc-icon-size: 16px;
      display: block;
      line-height: 1;
      opacity: 0.72;
      margin-top: -3px;
      margin-bottom: 0;
    }

    .bottom-text {
      font-size: 0.52em;
      line-height: 1;
      font-weight: 600;
      color: #1a1a2e;
      opacity: 0.72;
      margin-top: -1px;
      white-space: nowrap;
    }

    /* ── SOC text (only rendered when SOC is present) ── */
  `;

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("hec-node-click", {
        detail: { nodeType: this.type },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const s      = TYPE_STYLES[this.type] ?? FALLBACK_STYLES;
    const accent = this.colour || s.accent;
    const icon   = this.icon || s.icon;
    const hasSoc = this.soc !== null;
    const usesDirectionIcon = this.type === "grid" || this.type === "battery";
    const displayPower =
      usesDirectionIcon && this.power !== null ? Math.abs(this.power) : this.power;
    const directionIcon =
      usesDirectionIcon && this.power !== null
        ? this.type === "grid"
          ? this.power > 0
            ? "mdi:arrow-right-bold-circle"
            : this.power < 0
              ? "mdi:arrow-left-bold-circle"
              : ""
          : this.power > 0
            ? "mdi:arrow-up-bold-circle"
            : this.power < 0
              ? "mdi:arrow-down-bold-circle"
              : ""
        : "";
    const pct    = hasSoc ? Math.max(0, Math.min(100, this.soc!)) : 0;
    // dashoffset 0 = full ring; dashoffset = RING_C = empty
    const offset = +(RING_C * (1 - pct / 100)).toFixed(4);

    return html`
      <div class="node-wrap">

        <!-- SOC ring — always in DOM, invisible without SOC data -->
        <svg
          class="soc-ring${hasSoc ? " has-soc" : ""}"
          viewBox="0 0 84 84"
          aria-hidden="true"
        >
          <circle class="ring-track"    cx="42" cy="42" r="${RING_R}"/>
          <circle
            class="ring-progress"
            cx="42" cy="42" r="${RING_R}"
            style="stroke-dasharray:${RING_C};stroke-dashoffset:${offset};"
          />
        </svg>

        <!-- Circle node -->
        <div
          class="node"
          style="background:linear-gradient(150deg,${s.gradStart} 0%,${s.gradEnd} 100%);color:${accent};"
          @click=${this._handleClick}
        >
          <ha-icon .icon=${icon}></ha-icon>
          ${this.showLabel
            ? html`<span class="label" style="color:${accent};">${this.label || this.type}</span>`
            : nothing}
          <span class="power">${formatPower(displayPower, this.unit, this.decimalPlaces)}</span>
          ${directionIcon
            ? html`<ha-icon class="direction-icon" .icon=${directionIcon}></ha-icon>`
            : this.bottomText
              ? html`<span class="bottom-text">${this.bottomText}</span>`
              : nothing}
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hec-energy-node": HecEnergyNode;
  }
}

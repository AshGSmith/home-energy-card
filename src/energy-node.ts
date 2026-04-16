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
  grid:    { gradStart: "#e3f2fd", gradEnd: "#90caf9", accent: "#1e88e5", icon: "mdi:transmission-tower" },
  battery: { gradStart: "#e8f5e9", gradEnd: "#a5d6a7", accent: "#43a047", icon: "mdi:battery" },
  home:    { gradStart: "#fce4ec", gradEnd: "#f48fb1", accent: "#e91e63", icon: "mdi:home-lightning-bolt" },
  ev:      { gradStart: "#e0f7fa", gradEnd: "#80deea", accent: "#00acc1", icon: "mdi:car-electric" },
};

const FALLBACK_STYLES: NodeStyles = {
  gradStart: "#f5f5f5",
  gradEnd: "#e0e0e0",
  accent: "#9e9e9e",
  icon: "mdi:lightning-bolt",
};

function socColor(soc: number): string {
  if (soc < 20) return "#ef5350";
  if (soc < 50) return "#ffa726";
  return "#66bb6a";
}

export function formatPower(
  watts: number | null,
  unit: "W" | "kW" | "auto",
  decimals: number
): string {
  if (watts === null) return "—";
  const abs = Math.abs(watts);
  if (unit === "W" || (unit === "auto" && abs < 1000)) {
    return `${Math.round(watts)} W`;
  }
  return `${(watts / 1000).toFixed(decimals)} kW`;
}

@customElement("hec-energy-node")
export class HecEnergyNode extends LitElement {
  @property() type = "home";
  @property() label = "";
  @property() colour = "";
  @property({ type: Number }) power: number | null = null;
  @property({ type: Number }) soc: number | null = null;
  @property() unit: "W" | "kW" | "auto" = "auto";
  @property({ type: Number }) decimalPlaces = 1;

  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
      justify-content: center;
    }

    .node {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 10px 12px 8px;
      border-radius: 14px;
      min-width: 76px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.15s ease, transform 0.1s ease;
    }
    .node:hover {
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16);
      transform: translateY(-1px);
    }
    .node:active {
      transform: translateY(0);
    }

    ha-icon {
      --mdc-icon-size: 26px;
    }

    .label {
      font-size: 0.65em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      opacity: 0.65;
      white-space: nowrap;
    }

    .power {
      font-size: 0.85em;
      font-weight: 700;
      white-space: nowrap;
      color: #1a1a2e;
    }

    /* Reserves the same vertical space whether or not SOC is present */
    .soc-wrap {
      width: 100%;
      margin-top: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      /* invisible placeholder keeps height consistent */
      visibility: hidden;
    }
    .soc-wrap.has-soc {
      visibility: visible;
    }

    .soc-bar-bg {
      width: 100%;
      height: 3px;
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }

    .soc-bar {
      height: 100%;
      border-radius: 2px;
      transition: width 0.6s ease;
    }

    .soc-pct {
      font-size: 0.6em;
      opacity: 0.7;
      font-weight: 600;
    }
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
    const s = (TYPE_STYLES[this.type] ?? FALLBACK_STYLES);
    const accent = this.colour || s.accent;

    return html`
      <div
        class="node"
        style="background: linear-gradient(150deg, ${s.gradStart} 0%, ${s.gradEnd} 100%); color: ${accent};"
        @click=${this._handleClick}
      >
        <ha-icon .icon=${s.icon}></ha-icon>
        <span class="label" style="color: ${accent};">${this.label || this.type}</span>
        <span class="power">
          ${formatPower(this.power, this.unit, this.decimalPlaces)}
        </span>
        <div class="soc-wrap${this.soc !== null ? " has-soc" : ""}">
          <div class="soc-bar-bg">
            <div
              class="soc-bar"
              style="width: ${this.soc !== null ? Math.max(0, Math.min(100, this.soc)) : 0}%; background: ${this.soc !== null ? socColor(this.soc) : "transparent"};"
            ></div>
          </div>
          <span class="soc-pct">${this.soc !== null ? `${this.soc.toFixed(0)}%` : ""}</span>
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

import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./energy-node.js";
import "./node-detail.js";
import type { CardConfig, EntityTypeConfig } from "./types.js";
import { HomeAssistant, FlowInfo, computeFlowInfo } from "./flow.js";

export type { HomeAssistant, FlowInfo };
export { computeFlowInfo };

// ── Animation speed ────────────────────────────────────────────────────────────

function animDuration(magnitude: number | null, dynamic: boolean): string {
  if (!dynamic || !magnitude) return "0.7s";
  const t = Math.min(magnitude / 5000, 1);
  return `${(2.0 - t * 1.7).toFixed(2)}s`;
}

// ── Visual constants ───────────────────────────────────────────────────────────

const LINE_COLOR: Record<string, string> = {
  solar:   "#ffc107",
  grid:    "#42a5f5",
  battery: "#66bb6a",
  ev:      "#26c6da",
};

const LINE_ENDPOINTS: Record<string, [number, number, number, number]> = {
  solar:   [1.5, 0.62, 1.5, 1.38],
  grid:    [0.62, 1.5, 1.38, 1.5],
  battery: [2.38, 1.5, 1.62, 1.5],
  ev:      [1.5, 2.38, 1.5, 1.62],
};

// ── Component ─────────────────────────────────────────────────────────────────

@customElement("hec-flow-layout")
export class HecFlowLayout extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: CardConfig;

  @state() private _dialogType: string | null = null;

  static styles = css`
    :host { display: block; }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      position: relative;
    }

    .slot-solar   { grid-column: 2; grid-row: 1; }
    .slot-grid    { grid-column: 1; grid-row: 2; }
    .slot-home    { grid-column: 2; grid-row: 2; }
    .slot-battery { grid-column: 3; grid-row: 2; }
    .slot-ev      { grid-column: 2; grid-row: 3; }

    .spacer-r1c1 { grid-column: 1; grid-row: 1; }
    .spacer-r1c3 { grid-column: 3; grid-row: 1; }
    .spacer-r3c1 { grid-column: 1; grid-row: 3; }
    .spacer-r3c3 { grid-column: 3; grid-row: 3; }

    .hidden { visibility: hidden; pointer-events: none; }

    .svg-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: visible;
    }

    hec-energy-node { position: relative; z-index: 1; }

    @keyframes flow-fwd {
      from { stroke-dashoffset: 10; }
      to   { stroke-dashoffset:  0; }
    }
    @keyframes flow-rev {
      from { stroke-dashoffset: -10; }
      to   { stroke-dashoffset:   0; }
    }

    .flow-line {
      fill: none;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
      stroke-width: 2.5;
      stroke-dasharray: 5 4;
      animation: flow-fwd var(--flow-dur, 0.7s) linear infinite;
    }
    .flow-line.reverse { animation: flow-rev var(--flow-dur, 0.7s) linear infinite; }
    .flow-line.idle    { stroke-dasharray: none; animation: none; opacity: 0.15; }
    .flow-line.paused  { animation-play-state: paused; }
  `;

  // ── Helpers ───────────────────────────────────────────────────────────────

  private _configured(type: string) {
    return type in (this.config?.entity_types ?? {});
  }

  private _flowInfo(type: string): FlowInfo {
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    return computeFlowInfo(type, cfg, this.hass?.states ?? {});
  }

  private _soc(type: string): number | null {
    const id = this.config?.entity_types?.[type]?.soc;
    if (!id || !this.hass) return null;
    const s = this.hass.states[id]?.state;
    if (!s || s === "unavailable" || s === "unknown") return null;
    const v = parseFloat(s);
    return isNaN(v) ? null : v;
  }

  // ── SVG lines ─────────────────────────────────────────────────────────────

  private _svgLines() {
    const dynamic  = this.config?.display?.dynamic_animation_speed ?? false;
    const animated = this.config?.display?.animation !== false;

    return svg`
      ${(["solar", "grid", "battery", "ev"] as const)
        .filter((t) => this._configured(t))
        .map((type) => {
          const flow = this._flowInfo(type);
          const [x1, y1, x2, y2] = LINE_ENDPOINTS[type];
          const idle    = flow.direction === "idle";
          const reverse = flow.direction === "from-home";
          const dur     = animDuration(flow.magnitude, dynamic && !idle);
          const classes = [
            "flow-line",
            reverse   ? "reverse" : "",
            idle      ? "idle"    : "",
            !animated ? "paused"  : "",
          ].filter(Boolean).join(" ");

          return svg`
            <line
              x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="${LINE_COLOR[type]}"
              class="${classes}"
              style="--flow-dur:${dur}"
              pathLength="100"
            />
          `;
        })}
    `;
  }

  // ── Node render ───────────────────────────────────────────────────────────

  private _node(type: string, slotClass: string, showSoc = false) {
    const configured = this._configured(type) || type === "home";
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    const display = this.config?.display ?? {};
    const flow = this._flowInfo(type);
    const suppress = cfg.show_zero === false && flow.direction === "idle";

    return html`
      <hec-energy-node
        class="${slotClass}${!configured || suppress ? " hidden" : ""}"
        .type=${type}
        .label=${cfg.label ?? type}
        .colour=${cfg.colour ?? ""}
        .power=${flow.power}
        .soc=${showSoc ? this._soc(type) : null}
        .unit=${display.unit ?? "auto"}
        .decimalPlaces=${display.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }

  private _ghost(slotClass: string) {
    return html`
      <hec-energy-node class="${slotClass} hidden" type="home" .power=${null}>
      </hec-energy-node>
    `;
  }

  // ── Dialog ────────────────────────────────────────────────────────────────

  private _onNodeClick(e: Event) {
    const detail = (e as CustomEvent).detail as { nodeType: string } | undefined;
    if (detail?.nodeType) this._dialogType = detail.nodeType;
  }

  // ── Main render ───────────────────────────────────────────────────────────

  render() {
    if (!this.config) return nothing;

    const showSolar = this._configured("solar");
    const showEV    = this._configured("ev");

    return html`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 3" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1 -->
        <div class="spacer-r1c1"></div>
        ${showSolar ? this._node("solar", "slot-solar") : this._ghost("slot-solar")}
        <div class="spacer-r1c3"></div>

        <!-- Row 2 -->
        ${this._node("grid",    "slot-grid")}
        ${this._node("home",    "slot-home")}
        ${this._node("battery", "slot-battery", true)}

        <!-- Row 3 -->
        <div class="spacer-r3c1"></div>
        ${showEV ? this._node("ev", "slot-ev", true) : this._ghost("slot-ev")}
        <div class="spacer-r3c3"></div>
      </div>

      <hec-node-detail
        .hass=${this.hass}
        .config=${this.config}
        .nodeType=${this._dialogType ?? ""}
        .open=${this._dialogType !== null}
        @hec-close=${() => { this._dialogType = null; }}
      ></hec-node-detail>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hec-flow-layout": HecFlowLayout;
  }
}

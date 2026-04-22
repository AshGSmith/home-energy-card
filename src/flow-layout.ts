import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./energy-node.js";
import "./node-detail.js";
import type { CardConfig, EntityTypeConfig } from "./types.js";
import { DEFAULT_ENTITY_TYPES } from "./types.js";
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
  grid:    "#f06292",
  battery: "#66bb6a",
  ev:      "#42a5f5",
};

// Layout: B1=Solar, C1=EV, A2=Grid, B2=Home, C2=Battery
// Viewbox "0 0 3 N" — row centres at y = row − 0.5
const LINE_ENDPOINTS: Record<string, [number, number, number, number]> = {
  solar:   [1.5, 0.5, 1.5, 1.5],  // B1 → B2  vertical
  grid:    [0.5, 1.5, 1.5, 1.5],  // A2 → B2  horizontal
  battery: [2.5, 1.5, 1.5, 1.5],  // C2 → B2  horizontal
  ev:      [2.5, 0.5, 1.5, 1.5],  // C1 → B2  diagonal
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
      align-items: center;   /* vertically centre circles in each row */
      justify-items: center; /* horizontally centre circles in each column */
    }

    /* ── Standard slots ─────────────────────────────────────── */
    .slot-solar   { grid-column: 2; grid-row: 1; }  /* B1 */
    .slot-ev      { grid-column: 3; grid-row: 1; }  /* C1 */
    .slot-grid    { grid-column: 1; grid-row: 2; }  /* A2 */
    .slot-home    { grid-column: 2; grid-row: 2; }  /* B2 */
    .slot-battery { grid-column: 3; grid-row: 2; }  /* C2 */

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

  /**
   * A node (and its flow line) is visible when:
   *   - it is configured, AND
   *   - either show_zero is not false, OR the flow is not idle
   */
  private _isVisible(type: string): boolean {
    if (!this._configured(type)) return false;
    const cfg = this.config?.entity_types?.[type] ?? {};
    if (cfg.show_zero === false && this._flowInfo(type).direction === "idle") return false;
    return true;
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
        .filter((t) => this._isVisible(t))
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
    const visible = type === "home" ? true : this._isVisible(type);
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    const display = this.config?.display ?? {};
    const flow = this._flowInfo(type);

    return html`
      <hec-energy-node
        class="${slotClass}${!visible ? " hidden" : ""}"
        .type=${type}
        .label=${cfg.label ?? type}
        .showLabel=${cfg.show_label ?? true}
        .colour=${cfg.colour ?? ""}
        .power=${flow.power}
        .soc=${showSoc ? this._soc(type) : null}
        .unit=${display.unit ?? "auto"}
        .decimalPlaces=${display.decimal_places ?? 1}
      ></hec-energy-node>
    `;
  }

  // ── Custom type helpers ───────────────────────────────────────────────────

  /** Returns configured types beyond the five standard ones, in insertion order. */
  private _customTypes(): string[] {
    return Object.keys(this.config?.entity_types ?? {}).filter(
      k => !(DEFAULT_ENTITY_TYPES as readonly string[]).includes(k),
    );
  }

  /**
   * Map custom-type index (0-based) to CSS grid [column, row].
   * Fill order: B3→A3→C3→B4→A4→C4…  (col order: 2,1,3 per row)
   */
  private _customSlot(i: number): [col: number, row: number] {
    return [[2, 1, 3][i % 3], 3 + Math.floor(i / 3)];
  }

  /** Render a custom node with inline grid placement. */
  private _customNode(type: string, col: number, row: number) {
    const visible = this._isVisible(type);
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    const display = this.config?.display ?? {};
    const flow = this._flowInfo(type);
    return html`
      <hec-energy-node
        style="grid-column:${col}; grid-row:${row}"
        class="${!visible ? "hidden" : ""}"
        .type=${type}
        .label=${cfg.label ?? type}
        .showLabel=${cfg.show_label ?? true}
        .colour=${cfg.colour ?? ""}
        .power=${flow.power}
        .soc=${cfg.soc ? this._soc(type) : null}
        .unit=${display.unit ?? "auto"}
        .decimalPlaces=${display.decimal_places ?? 1}
      ></hec-energy-node>
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

    const customTypes = this._customTypes();
    // Rows: 2 base + 1 per every 3 custom types
    const totalRows = 2 + Math.ceil(customTypes.length / 3);

    return html`
      <div class="grid" @hec-node-click=${this._onNodeClick}>
        <svg class="svg-overlay" viewBox="0 0 3 ${totalRows}" preserveAspectRatio="none">
          ${this._svgLines()}
        </svg>

        <!-- Row 1: B1=Solar, C1=EV (omitted entirely if neither configured) -->
        ${this._configured("solar") ? this._node("solar", "slot-solar")   : nothing}
        ${this._configured("ev")    ? this._node("ev",    "slot-ev", true) : nothing}

        <!-- Row 2: A2=Grid, B2=Home, C2=Battery -->
        ${this._node("grid",    "slot-grid")}
        ${this._node("home",    "slot-home")}
        ${this._node("battery", "slot-battery", true)}

        <!-- Rows 3+: custom types (B→A→C per row) -->
        ${customTypes.map((type, i) => {
          const [col, row] = this._customSlot(i);
          return this._customNode(type, col, row);
        })}
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

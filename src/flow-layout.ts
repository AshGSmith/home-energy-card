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

// ── Component ─────────────────────────────────────────────────────────────────

@customElement("hec-flow-layout")
export class HecFlowLayout extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: CardConfig;

  @state() private _dialogType: string | null = null;
  @state() private _lineLayout = {
    width: 0,
    height: 0,
    centers: {} as Record<string, { x: number; y: number }>,
  };

  private _resizeObserver?: ResizeObserver;

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

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this._measureLineLayout());
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    super.disconnectedCallback();
  }

  protected firstUpdated() {
    const grid = this.renderRoot.querySelector(".grid");
    if (grid && this._resizeObserver) this._resizeObserver.observe(grid);
    this._measureLineLayout();
  }

  protected updated() {
    this._measureLineLayout();
  }

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

  private _measureLineLayout() {
    const grid = this.renderRoot.querySelector(".grid");
    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    if (!gridRect.width || !gridRect.height) return;

    const centers: Record<string, { x: number; y: number }> = {};
    const nodes = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>("hec-energy-node[data-node-type]"),
    );

    for (const node of nodes) {
      if (node.classList.contains("hidden")) continue;
      const type = node.dataset.nodeType;
      if (!type) continue;
      const rect = node.getBoundingClientRect();
      centers[type] = {
        x: rect.left - gridRect.left + rect.width / 2,
        y: rect.top - gridRect.top + rect.height / 2,
      };
    }

    const next = {
      width: gridRect.width,
      height: gridRect.height,
      centers,
    };

    const same =
      this._lineLayout.width === next.width &&
      this._lineLayout.height === next.height &&
      JSON.stringify(this._lineLayout.centers) === JSON.stringify(next.centers);

    if (!same) this._lineLayout = next;
  }

  private _lineTypes(): string[] {
    return [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes(),
    ].filter((type) => this._isVisible(type));
  }

  private _svgLines() {
    const dynamic  = this.config?.display?.dynamic_animation_speed ?? false;
    const animated = this.config?.display?.animation !== false;
    const homeCenter = this._lineLayout.centers.home;

    if (!homeCenter || !this._lineLayout.width || !this._lineLayout.height) return nothing;

    return svg`
      ${this._lineTypes()
        .map((type) => {
          const flow = this._flowInfo(type);
          const center = this._lineLayout.centers[type];
          if (!center) return nothing;
          const idle    = flow.direction === "idle";
          const reverse = flow.direction === "from-home";
          const dur     = animDuration(flow.magnitude, dynamic && !idle);
          const color =
            LINE_COLOR[type] ??
            this.config?.entity_types?.[type]?.colour ??
            "#9e9e9e";
          const classes = [
            "flow-line",
            reverse   ? "reverse" : "",
            idle      ? "idle"    : "",
            !animated ? "paused"  : "",
          ].filter(Boolean).join(" ");

          return svg`
            <line
              x1="${center.x}" y1="${center.y}" x2="${homeCenter.x}" y2="${homeCenter.y}"
              stroke="${color}"
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
        data-node-type=${type}
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
   * Fill order: A1→B3→A3→C3→B4→A4→C4…
   */
  private _customSlot(i: number): [col: number, row: number] {
    if (i === 0) return [1, 1];
    const offset = i - 1;
    return [[2, 1, 3][offset % 3], 3 + Math.floor(offset / 3)];
  }

  /** Render a custom node with inline grid placement. */
  private _customNode(type: string, col: number, row: number) {
    const visible = this._isVisible(type);
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    const display = this.config?.display ?? {};
    const flow = this._flowInfo(type);
    return html`
      <hec-energy-node
        data-node-type=${type}
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
        <svg
          class="svg-overlay"
          viewBox="0 0 ${this._lineLayout.width || 1} ${this._lineLayout.height || 1}"
          preserveAspectRatio="none"
        >
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

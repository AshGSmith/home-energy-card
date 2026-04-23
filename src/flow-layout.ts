import { LitElement, html, css, svg, nothing, PropertyValues } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { customElement, property, state } from "lit/decorators.js";
import "./energy-node.js";
import "./node-detail.js";
import type { CardConfig, EntityTypeConfig } from "./types.js";
import { DEFAULT_ENTITY_TYPES } from "./types.js";
import { HomeAssistant, FlowInfo, computeFlowInfo, computeRawPowerWatts, flowInfoFromNet } from "./flow.js";
import { formatEnergyKwh } from "./energy-node.js";

export type { HomeAssistant, FlowInfo };
export { computeFlowInfo };

// ── Animation speed ────────────────────────────────────────────────────────────

function animDuration(magnitude: number | null, dynamic: boolean): string {
  if (!dynamic || !magnitude) return "0.7s";
  const t = Math.min(magnitude / 5000, 1);
  return `${(Math.round((2.0 - t * 1.7) * 10) / 10).toFixed(1)}s`;
}

// ── Visual constants ───────────────────────────────────────────────────────────

const LINE_COLOR: Record<string, string> = {
  solar:   "#ffc107",
  grid:    "#8e24aa",
  battery: "#e53935",
  ev:      "#42a5f5",
};

interface LineVisualState {
  color: string;
  dur: string;
  idle: boolean;
  paused: boolean;
  reverse: boolean;
}

interface FlowSample {
  timestamp: number;
  magnitude: number | null;
}

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
  private _measureFrame: number | null = null;
  private _lineVisualState: Record<string, LineVisualState> = {};
  private _flowSamples: Record<string, FlowSample[]> = {};
  private _smoothedMagnitudes: Record<string, number | null> = {};
  private _speedInterval: number | null = null;

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
      from { stroke-dashoffset: 9; }
      to   { stroke-dashoffset:  0; }
    }
    @keyframes flow-rev {
      from { stroke-dashoffset: -9; }
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
    this._resizeObserver = new ResizeObserver(() => this._scheduleMeasureLineLayout());
    this._speedInterval = window.setInterval(() => {
      if (this._refreshSmoothedMagnitudes()) {
        this._updateLineVisualState();
        this.requestUpdate();
      }
    }, 10_000);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    if (this._measureFrame !== null) cancelAnimationFrame(this._measureFrame);
    this._measureFrame = null;
    if (this._speedInterval !== null) window.clearInterval(this._speedInterval);
    this._speedInterval = null;
    super.disconnectedCallback();
  }

  protected firstUpdated() {
    const grid = this.renderRoot.querySelector(".grid");
    if (grid && this._resizeObserver) this._resizeObserver.observe(grid);
    this._scheduleMeasureLineLayout();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("hass") || changed.has("config")) {
      this._recordFlowSamples();
      if (!Object.keys(this._smoothedMagnitudes).length) this._refreshSmoothedMagnitudes();
      this._updateLineVisualState();
    }
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("config")) this._scheduleMeasureLineLayout();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private _configured(type: string) {
    return type in (this.config?.entity_types ?? {});
  }

  private _flowInfo(type: string): FlowInfo {
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    const states = this.hass?.states ?? {};

    if (type !== "home") {
      return computeFlowInfo(type, cfg, states);
    }

    const homeNet = computeRawPowerWatts("home", cfg, states);
    if (homeNet === null) return flowInfoFromNet("home", null, cfg.zero_tolerance ?? 0);

    const subtractTotal = this._customTypes().reduce((sum, customType) => {
      const customCfg: EntityTypeConfig = this.config?.entity_types?.[customType] ?? {};
      if (!customCfg.subtract_from_home) return sum;
      const customFlow = computeFlowInfo(customType, customCfg, states);
      return sum + (customFlow.power ?? 0);
    }, 0);

    return flowInfoFromNet(
      "home",
      homeNet - subtractTotal,
      cfg.zero_tolerance ?? 0,
    );
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

  private _dailyKwh(type: string): number | null {
    const id = this.config?.entity_types?.[type]?.daily_usage;
    if (!id || !this.hass) return null;
    const s = this.hass.states[id];
    if (!s || s.state === "unavailable" || s.state === "unknown") return null;
    const v = parseFloat(s.state);
    if (isNaN(v)) return null;
    const unit = s.attributes.unit_of_measurement as string | undefined;
    return unit === "Wh" ? v / 1000 : v;
  }

  // ── SVG lines ─────────────────────────────────────────────────────────────

  private _scheduleMeasureLineLayout() {
    if (this._measureFrame !== null) return;
    this._measureFrame = requestAnimationFrame(() => {
      this._measureFrame = null;
      this._measureLineLayout();
    });
  }

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

  private _sampleTypes(): string[] {
    return [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes(),
    ];
  }

  private _pruneFlowSamples(type: string, now: number) {
    const samples = this._flowSamples[type] ?? [];
    this._flowSamples[type] = samples.filter((sample) => now - sample.timestamp <= 10_000);
  }

  private _recordFlowSamples() {
    const now = Date.now();

    for (const type of this._sampleTypes()) {
      const flow = this._flowInfo(type);
      const samples = this._flowSamples[type] ?? [];
      samples.push({
        timestamp: now,
        magnitude: flow.magnitude,
      });
      this._flowSamples[type] = samples;
      this._pruneFlowSamples(type, now);
    }
  }

  private _refreshSmoothedMagnitudes(): boolean {
    const now = Date.now();
    let changed = false;

    for (const type of this._sampleTypes()) {
      this._pruneFlowSamples(type, now);
      const samples = this._flowSamples[type] ?? [];
      const magnitudes = samples
        .map((sample) => sample.magnitude)
        .filter((magnitude): magnitude is number => magnitude !== null);
      const next =
        magnitudes.length > 0
          ? magnitudes.reduce((sum, magnitude) => sum + Math.abs(magnitude), 0) / magnitudes.length
          : null;

      if (this._smoothedMagnitudes[type] !== next) {
        this._smoothedMagnitudes[type] = next;
        changed = true;
      }
    }

    return changed;
  }

  private _computeLineVisualState(type: string): LineVisualState {
    const dynamic  = this.config?.display?.dynamic_animation_speed ?? false;
    const animated = this.config?.display?.animation !== false;
    const flow = this._flowInfo(type);
    const smoothedMagnitude = this._smoothedMagnitudes[type] ?? flow.magnitude;

    return {
      color:
        LINE_COLOR[type] ??
        this.config?.entity_types?.[type]?.colour ??
        "#9e9e9e",
      dur: animDuration(smoothedMagnitude, dynamic && flow.direction !== "idle"),
      idle: flow.direction === "idle",
      paused: !animated,
      reverse: flow.direction === "from-home",
    };
  }

  private _sameLineVisualState(a?: LineVisualState, b?: LineVisualState): boolean {
    return Boolean(
      a &&
      b &&
      a.color === b.color &&
      a.dur === b.dur &&
      a.idle === b.idle &&
      a.paused === b.paused &&
      a.reverse === b.reverse,
    );
  }

  private _updateLineVisualState() {
    const next: Record<string, LineVisualState> = {};

    for (const type of [
      "solar",
      "grid",
      "battery",
      "ev",
      ...this._customTypes(),
    ]) {
      const visual = this._computeLineVisualState(type);
      const prev = this._lineVisualState[type];
      next[type] = this._sameLineVisualState(prev, visual) ? prev! : visual;
    }

    this._lineVisualState = next;
  }

  private _svgLines() {
    const centers = this._lineLayout.centers;
    const homeCenter = centers.home;
    const solarCenter = centers.solar;

    if (!homeCenter || !this._lineLayout.width || !this._lineLayout.height) return nothing;

    const segments: Array<{
      key: string;
      from: string;
      to: string;
      type: string;
      color: string;
      magnitude: number;
    }> = [];

    const solarFlow = this._flowInfo("solar");
    const homeFlow = this._flowInfo("home");
    const batteryFlow = this._flowInfo("battery");
    const evFlow = this._flowInfo("ev");
    const gridFlow = this._flowInfo("grid");

    const solarAvailable =
      solarCenter && solarFlow.direction === "to-home" ? (solarFlow.magnitude ?? 0) : 0;
    const homeLoad = Math.max(homeFlow.power ?? 0, 0);
    const batteryCharge =
      batteryFlow.direction === "from-home" ? (batteryFlow.magnitude ?? 0) : 0;
    const evCharge =
      evFlow.direction === "from-home" ? (evFlow.magnitude ?? 0) : 0;
    const gridExport =
      gridFlow.direction === "from-home" ? (gridFlow.magnitude ?? 0) : 0;

    const solarToHome = Math.min(solarAvailable, homeLoad);
    let remainingSolar = Math.max(solarAvailable - solarToHome, 0);
    const solarToBattery = Math.min(remainingSolar, batteryCharge);
    remainingSolar = Math.max(remainingSolar - solarToBattery, 0);
    const solarToEv = Math.min(remainingSolar, evCharge);
    remainingSolar = Math.max(remainingSolar - solarToEv, 0);
    const solarToGrid = Math.min(remainingSolar, gridExport);

    if (solarCenter && solarToHome > 0) {
      segments.push({
        key: "solar-home",
        from: "solar",
        to: "home",
        type: "solar",
        color: LINE_COLOR.solar,
        magnitude: solarToHome,
      });
    }
    if (solarCenter && solarToBattery > 0 && centers.battery) {
      segments.push({
        key: "solar-battery",
        from: "solar",
        to: "battery",
        type: "solar",
        color: LINE_COLOR.solar,
        magnitude: solarToBattery,
      });
    }
    if (solarCenter && solarToEv > 0 && centers.ev) {
      segments.push({
        key: "solar-ev",
        from: "solar",
        to: "ev",
        type: "solar",
        color: LINE_COLOR.solar,
        magnitude: solarToEv,
      });
    }
    if (solarCenter && solarToGrid > 0 && centers.grid) {
      segments.push({
        key: "solar-grid",
        from: "solar",
        to: "grid",
        type: "solar",
        color: LINE_COLOR.solar,
        magnitude: solarToGrid,
      });
    }

    const homeToBattery = Math.max(batteryCharge - solarToBattery, 0);
    const homeToEv = Math.max(evCharge - solarToEv, 0);
    const homeToGrid = Math.max(gridExport - solarToGrid, 0);

    if (gridFlow.direction === "to-home" && (gridFlow.magnitude ?? 0) > 0 && centers.grid) {
      segments.push({
        key: "grid-home",
        from: "grid",
        to: "home",
        type: "grid",
        color: this._lineVisualState.grid?.color ?? this._computeLineVisualState("grid").color,
        magnitude: gridFlow.magnitude ?? 0,
      });
    }
    if (homeToGrid > 0 && centers.grid) {
      segments.push({
        key: "home-grid",
        from: "home",
        to: "grid",
        type: "grid",
        color: this._lineVisualState.grid?.color ?? this._computeLineVisualState("grid").color,
        magnitude: homeToGrid,
      });
    }
    if (batteryFlow.direction === "to-home" && (batteryFlow.magnitude ?? 0) > 0 && centers.battery) {
      segments.push({
        key: "battery-home",
        from: "battery",
        to: "home",
        type: "battery",
        color: this._lineVisualState.battery?.color ?? this._computeLineVisualState("battery").color,
        magnitude: batteryFlow.magnitude ?? 0,
      });
    }
    if (homeToBattery > 0 && centers.battery) {
      segments.push({
        key: "home-battery",
        from: "home",
        to: "battery",
        type: "battery",
        color: this._lineVisualState.battery?.color ?? this._computeLineVisualState("battery").color,
        magnitude: homeToBattery,
      });
    }
    if (evFlow.direction === "to-home" && (evFlow.magnitude ?? 0) > 0 && centers.ev) {
      segments.push({
        key: "ev-home",
        from: "ev",
        to: "home",
        type: "ev",
        color: this._lineVisualState.ev?.color ?? this._computeLineVisualState("ev").color,
        magnitude: evFlow.magnitude ?? 0,
      });
    }
    if (homeToEv > 0 && centers.ev) {
      segments.push({
        key: "home-ev",
        from: "home",
        to: "ev",
        type: "ev",
        color: this._lineVisualState.ev?.color ?? this._computeLineVisualState("ev").color,
        magnitude: homeToEv,
      });
    }

    for (const type of this._customTypes()) {
      const flow = this._flowInfo(type);
      const center = centers[type];
      if (!center || !flow.magnitude || flow.direction === "idle") continue;
      segments.push({
        key: `custom-${type}`,
        from: flow.direction === "to-home" ? type : "home",
        to: flow.direction === "to-home" ? "home" : type,
        type,
        color:
          this._lineVisualState[type]?.color ??
          this._computeLineVisualState(type).color,
        magnitude: flow.magnitude,
      });
    }

    return svg`
      ${repeat(
        segments,
        (segment) => segment.key,
        (segment) => {
          const fromCenter = centers[segment.from];
          const toCenter = centers[segment.to];
          if (!fromCenter || !toCenter || segment.magnitude <= 0) return nothing;
          const visual = this._lineVisualState[segment.type] ?? this._computeLineVisualState(segment.type);
          const classes = [
            "flow-line",
            visual.paused ? "paused" : "",
          ].filter(Boolean).join(" ");

          return svg`
            <line
              x1="${fromCenter.x}" y1="${fromCenter.y}" x2="${toCenter.x}" y2="${toCenter.y}"
              stroke="${segment.color}"
              class="${classes}"
              style="--flow-dur:${visual.dur}"
              pathLength="100"
            />
          `;
        },
      )}
    `;
  }

  // ── Node render ───────────────────────────────────────────────────────────

  private _node(type: string, slotClass: string, showSoc = false) {
    const visible = type === "home" ? true : this._isVisible(type);
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    const display = this.config?.display ?? {};
    const flow = this._flowInfo(type);
    const bottomText =
      type === "solar"
        ? formatEnergyKwh(this._dailyKwh(type), display.decimal_places ?? 1)
        : "";

    return html`
      <hec-energy-node
        data-node-type=${type}
        class="${slotClass}${!visible ? " hidden" : ""}"
        .type=${type}
        .label=${cfg.label ?? type}
        .showLabel=${cfg.show_label ?? true}
        .icon=${cfg.icon ?? ""}
        .bottomText=${bottomText}
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
    const bottomText = formatEnergyKwh(
      this._dailyKwh(type),
      display.decimal_places ?? 1,
    );
    return html`
      <hec-energy-node
        data-node-type=${type}
        style="grid-column:${col}; grid-row:${row}"
        class="${!visible ? "hidden" : ""}"
        .type=${type}
        .label=${cfg.label ?? type}
        .showLabel=${cfg.show_label ?? true}
        .icon=${cfg.icon ?? ""}
        .bottomText=${bottomText}
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
        ${repeat(customTypes, (type) => type, (type, i) => {
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

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  CardConfig,
  DisplayConfig,
  EntityTypeConfig,
  LiveDataConfig,
  OctopusConfig,
  SystemConfig,
} from "./types.js";
import { autoDetect, mergeDetection } from "./auto-detect.js";

@customElement("home-energy-card-editor")
export class HomeEnergyCardEditor extends LitElement {
  @property({ attribute: false }) hass?: object;
  @property({ attribute: false }) config?: CardConfig;

  @state() private _detectStatus = "";
  @state() private _detectIsError = false;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 6px;
      padding: 12px 16px 16px;
    }

    .heading {
      font-size: 0.95em;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 4px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    ha-entity-picker,
    ha-textfield,
    ha-select {
      display: block;
      width: 100%;
    }

    .detect-status {
      font-size: 0.8em;
      opacity: 0.65;
      padding: 0 2px;
    }

    .detect-status.error {
      color: var(--error-color, #db4437);
      opacity: 1;
    }
  `;

  setConfig(config: CardConfig) {
    this.config = config;
  }

  private _dispatch(config: CardConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _set<K extends keyof CardConfig>(key: K, value: CardConfig[K]) {
    this._dispatch({ ...this.config!, [key]: value });
  }

  private _setEntityType(type: string, key: keyof EntityTypeConfig, value: unknown) {
    const entityTypes = { ...(this.config?.entity_types ?? {}) };
    entityTypes[type] =
      value === undefined || value === "" || value === null
        ? (({ [key]: _, ...rest }) => rest)(entityTypes[type] ?? {})
        : { ...entityTypes[type], [key]: value };
    this._set("entity_types", entityTypes);
  }

  private _setOctopus(type: string, key: keyof OctopusConfig, value: string) {
    const entityTypes = { ...(this.config?.entity_types ?? {}) };
    const current = entityTypes[type] ?? {};
    const octopus: OctopusConfig = { ...current.octopus, [key]: value || undefined };
    const hasAny = Object.values(octopus).some(Boolean);
    entityTypes[type] = hasAny
      ? { ...current, octopus }
      : (({ octopus: _, ...rest }) => rest)(current);
    this._set("entity_types", entityTypes);
  }

  private _runAutoDetect() {
    if (!this.hass) {
      this._detectStatus = "No hass object — editor not fully loaded.";
      this._detectIsError = true;
      return;
    }
    const detected = autoDetect(this.hass);
    if (detected.integration_type === "manual" && detected.summary.length === 0) {
      this._detectStatus = "Nothing detected. Configure entities manually.";
      this._detectIsError = true;
      return;
    }
    this._dispatch(mergeDetection(this.config!, detected, false));
    this._detectStatus = `Detected: ${detected.summary.join(", ")}`;
    this._detectIsError = false;
  }

  render() {
    if (!this.config) return nothing;

    const grid = this.config.entity_types?.grid ?? {};
    const solar = this.config.entity_types?.solar ?? {};
    const battery = this.config.entity_types?.battery ?? {};
    const home = this.config.entity_types?.home ?? {};
    const ev = this.config.entity_types?.ev ?? {};
    const custom = this.config.entity_types?.custom_1 ?? {};
    const liveData: LiveDataConfig = this.config.live_data ?? {};
    const system: SystemConfig = this.config.system ?? {};
    const display: DisplayConfig = this.config.display ?? {};

    return html`
      <div class="section">
        <div class="heading">Top level</div>
        <ha-button unelevated @click=${this._runAutoDetect}>Auto-detect entities</ha-button>
        <span class="detect-status ${this._detectIsError ? "error" : ""}">
          ${this._detectStatus || "Scan your entities and pre-fill fields automatically."}
        </span>
        <ha-textfield
          label="Title"
          .value=${this.config.title ?? ""}
          @change=${(e: Event) => this._set("title", (e.target as HTMLInputElement).value || undefined)}
        ></ha-textfield>
        <div class="switch-row">
          <span>Show Title</span>
          <ha-switch
            .checked=${this.config.show_header ?? true}
            @change=${(e: Event) => this._set("show_header", (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>
      </div>

      <div class="section">
        <div class="heading">Grid</div>
        <ha-entity-picker label="Grid Import Power" .hass=${this.hass} .value=${grid.power_import ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "power_import", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Grid Export Power" .hass=${this.hass} .value=${grid.power_export ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "power_export", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Grid Combined Power" .hass=${this.hass} .value=${grid.power_combined ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "power_combined", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Grid Daily Usage" .hass=${this.hass} .value=${grid.daily_usage ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "daily_usage", e.detail.value)}></ha-entity-picker>
        <div class="switch-row">
          <span>Grid Show when idle</span>
          <ha-switch .checked=${grid.show_zero !== false} @change=${(e: Event) => this._setEntityType("grid", "show_zero", (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <ha-textfield label="Grid Zero Tolerance" type="number" min="0" .value=${grid.zero_tolerance != null ? String(grid.zero_tolerance) : ""} @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value; this._setEntityType("grid", "zero_tolerance", v !== "" ? Number(v) : undefined); }}></ha-textfield>
        <ha-textfield label="Grid Label" .value=${grid.label ?? ""} @change=${(e: Event) => this._setEntityType("grid", "label", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
        <ha-textfield label="Grid Colour" .value=${grid.colour ?? ""} @change=${(e: Event) => this._setEntityType("grid", "colour", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
        <ha-entity-picker label="Grid Octopus Rate Entity" .hass=${this.hass} .value=${grid.octopus?.rate_entity ?? ""} @value-changed=${(e: CustomEvent) => this._setOctopus("grid", "rate_entity", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Grid Octopus Cost Entity" .hass=${this.hass} .value=${grid.octopus?.cost_entity ?? ""} @value-changed=${(e: CustomEvent) => this._setOctopus("grid", "cost_entity", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Grid Octopus Slots Entity" .hass=${this.hass} .value=${grid.octopus?.slots_entity ?? ""} @value-changed=${(e: CustomEvent) => this._setOctopus("grid", "slots_entity", e.detail.value)}></ha-entity-picker>
      </div>

      <div class="section">
        <div class="heading">Solar</div>
        <ha-entity-picker label="Solar Combined Power" .hass=${this.hass} .value=${solar.power_combined ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("solar", "power_combined", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Solar Daily Usage" .hass=${this.hass} .value=${solar.daily_usage ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("solar", "daily_usage", e.detail.value)}></ha-entity-picker>
        <div class="switch-row">
          <span>Solar Show when idle</span>
          <ha-switch .checked=${solar.show_zero !== false} @change=${(e: Event) => this._setEntityType("solar", "show_zero", (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <ha-textfield label="Solar Zero Tolerance" type="number" min="0" .value=${solar.zero_tolerance != null ? String(solar.zero_tolerance) : ""} @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value; this._setEntityType("solar", "zero_tolerance", v !== "" ? Number(v) : undefined); }}></ha-textfield>
        <ha-textfield label="Solar Label" .value=${solar.label ?? ""} @change=${(e: Event) => this._setEntityType("solar", "label", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
        <ha-textfield label="Solar Colour" .value=${solar.colour ?? ""} @change=${(e: Event) => this._setEntityType("solar", "colour", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
      </div>

      <div class="section">
        <div class="heading">Battery</div>
        <ha-entity-picker label="Battery State of Charge" .hass=${this.hass} .value=${battery.soc ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("battery", "soc", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Battery Combined Power" .hass=${this.hass} .value=${battery.power_combined ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("battery", "power_combined", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Battery Daily Usage" .hass=${this.hass} .value=${battery.daily_usage ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("battery", "daily_usage", e.detail.value)}></ha-entity-picker>
        <div class="switch-row">
          <span>Battery Show when idle</span>
          <ha-switch .checked=${battery.show_zero !== false} @change=${(e: Event) => this._setEntityType("battery", "show_zero", (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <ha-textfield label="Battery Zero Tolerance" type="number" min="0" .value=${battery.zero_tolerance != null ? String(battery.zero_tolerance) : ""} @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value; this._setEntityType("battery", "zero_tolerance", v !== "" ? Number(v) : undefined); }}></ha-textfield>
        <ha-textfield label="Battery Label" .value=${battery.label ?? ""} @change=${(e: Event) => this._setEntityType("battery", "label", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
        <ha-textfield label="Battery Colour" .value=${battery.colour ?? ""} @change=${(e: Event) => this._setEntityType("battery", "colour", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
      </div>

      <div class="section">
        <div class="heading">Home</div>
        <ha-entity-picker label="Home Combined Power" .hass=${this.hass} .value=${home.power_combined ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("home", "power_combined", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Home Daily Usage" .hass=${this.hass} .value=${home.daily_usage ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("home", "daily_usage", e.detail.value)}></ha-entity-picker>
        <div class="switch-row">
          <span>Home Show when idle</span>
          <ha-switch .checked=${home.show_zero !== false} @change=${(e: Event) => this._setEntityType("home", "show_zero", (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <ha-textfield label="Home Zero Tolerance" type="number" min="0" .value=${home.zero_tolerance != null ? String(home.zero_tolerance) : ""} @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value; this._setEntityType("home", "zero_tolerance", v !== "" ? Number(v) : undefined); }}></ha-textfield>
        <ha-textfield label="Home Label" .value=${home.label ?? ""} @change=${(e: Event) => this._setEntityType("home", "label", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
        <ha-textfield label="Home Colour" .value=${home.colour ?? ""} @change=${(e: Event) => this._setEntityType("home", "colour", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
      </div>

      <div class="section">
        <div class="heading">EV</div>
        <ha-entity-picker label="EV State of Charge" .hass=${this.hass} .value=${ev.soc ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("ev", "soc", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="EV Combined Power" .hass=${this.hass} .value=${ev.power_combined ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("ev", "power_combined", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="EV Daily Usage" .hass=${this.hass} .value=${ev.daily_usage ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("ev", "daily_usage", e.detail.value)}></ha-entity-picker>
        <div class="switch-row">
          <span>EV Show when idle</span>
          <ha-switch .checked=${ev.show_zero !== false} @change=${(e: Event) => this._setEntityType("ev", "show_zero", (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <ha-textfield label="EV Zero Tolerance" type="number" min="0" .value=${ev.zero_tolerance != null ? String(ev.zero_tolerance) : ""} @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value; this._setEntityType("ev", "zero_tolerance", v !== "" ? Number(v) : undefined); }}></ha-textfield>
        <ha-textfield label="EV Label" .value=${ev.label ?? ""} @change=${(e: Event) => this._setEntityType("ev", "label", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
        <ha-textfield label="EV Colour" .value=${ev.colour ?? ""} @change=${(e: Event) => this._setEntityType("ev", "colour", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
      </div>

      <div class="section">
        <div class="heading">Custom</div>
        <ha-entity-picker label="Custom Import Power" .hass=${this.hass} .value=${custom.power_import ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("custom_1", "power_import", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Custom Export Power" .hass=${this.hass} .value=${custom.power_export ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("custom_1", "power_export", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Custom Combined Power" .hass=${this.hass} .value=${custom.power_combined ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("custom_1", "power_combined", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Custom Daily Usage" .hass=${this.hass} .value=${custom.daily_usage ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("custom_1", "daily_usage", e.detail.value)}></ha-entity-picker>
        <ha-entity-picker label="Custom State of Charge" .hass=${this.hass} .value=${custom.soc ?? ""} @value-changed=${(e: CustomEvent) => this._setEntityType("custom_1", "soc", e.detail.value)}></ha-entity-picker>
        <div class="switch-row">
          <span>Custom Show when idle</span>
          <ha-switch .checked=${custom.show_zero !== false} @change=${(e: Event) => this._setEntityType("custom_1", "show_zero", (e.target as HTMLInputElement).checked)}></ha-switch>
        </div>
        <ha-textfield label="Custom Zero Tolerance" type="number" min="0" .value=${custom.zero_tolerance != null ? String(custom.zero_tolerance) : ""} @change=${(e: Event) => { const v = (e.target as HTMLInputElement).value; this._setEntityType("custom_1", "zero_tolerance", v !== "" ? Number(v) : undefined); }}></ha-textfield>
        <ha-textfield label="Custom Label" .value=${custom.label ?? ""} @change=${(e: Event) => this._setEntityType("custom_1", "label", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
        <ha-textfield label="Custom Colour" .value=${custom.colour ?? ""} @change=${(e: Event) => this._setEntityType("custom_1", "colour", (e.target as HTMLInputElement).value || undefined)}></ha-textfield>
      </div>

      <div class="section">
        <div class="heading">Live Data</div>
        <ha-textfield label="Refresh interval (s)" type="number" min="1" .value=${String(liveData.refresh_interval ?? 5)} @change=${(e: Event) => this._set("live_data", { ...liveData, refresh_interval: Number((e.target as HTMLInputElement).value) })}></ha-textfield>
        <div class="switch-row">
          <span>Show live badge</span>
          <ha-switch .checked=${liveData.show_live_badge ?? true} @change=${(e: Event) => this._set("live_data", { ...liveData, show_live_badge: (e.target as HTMLInputElement).checked })}></ha-switch>
        </div>
      </div>

      <div class="section">
        <div class="heading">System</div>
        <ha-textfield label="Energy day reset hour (0–23)" type="number" min="0" max="23" .value=${String(system.energy_date_reset ?? 0)} @change=${(e: Event) => this._set("system", { ...system, energy_date_reset: Number((e.target as HTMLInputElement).value) })}></ha-textfield>
        <ha-select label="Time format" .value=${system.time_format ?? "24h"} @value-changed=${(e: CustomEvent) => this._set("system", { ...system, time_format: e.detail.value as "12h" | "24h" })}>
          <mwc-list-item value="12h">12h</mwc-list-item>
          <mwc-list-item value="24h">24h</mwc-list-item>
        </ha-select>
      </div>

      <div class="section">
        <div class="heading">Display</div>
        <ha-textfield label="Decimal places" type="number" min="0" max="4" .value=${String(display.decimal_places ?? 1)} @change=${(e: Event) => this._set("display", { ...display, decimal_places: Number((e.target as HTMLInputElement).value) })}></ha-textfield>
        <ha-select label="Unit" .value=${display.unit ?? "auto"} @value-changed=${(e: CustomEvent) => this._set("display", { ...display, unit: e.detail.value as "W" | "kW" | "auto" })}>
          <mwc-list-item value="W">W</mwc-list-item>
          <mwc-list-item value="kW">kW</mwc-list-item>
          <mwc-list-item value="auto">Auto</mwc-list-item>
        </ha-select>
        <div class="switch-row">
          <span>Animation</span>
          <ha-switch .checked=${display.animation ?? true} @change=${(e: Event) => this._set("display", { ...display, animation: (e.target as HTMLInputElement).checked })}></ha-switch>
        </div>
        <div class="switch-row">
          <span>Dynamic animation speed</span>
          <ha-switch .checked=${display.dynamic_animation_speed ?? false} @change=${(e: Event) => this._set("display", { ...display, dynamic_animation_speed: (e.target as HTMLInputElement).checked })}></ha-switch>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card-editor": HomeEnergyCardEditor;
  }
}

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DEFAULT_ENTITY_TYPES } from "./types.js";
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

  @state() private _newTypeName = "";
  @state() private _detectStatus = "";
  @state() private _detectIsError = false;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .top-fields,
    .flat-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .top-fields {
      margin-bottom: 8px;
    }

    ha-entity-picker,
    ha-textfield,
    ha-select {
      display: block;
      width: 100%;
    }

    ha-select {
      margin-bottom: 8px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    .group-divider {
      height: 1px;
      background: var(--divider-color, rgba(0,0,0,0.12));
      margin: 8px 0;
    }

    .group-heading {
      font-size: 0.72em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      opacity: 0.45;
      padding: 4px 0 2px;
    }

    .flat-section {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 6px;
      padding: 12px 16px 16px;
      margin-bottom: 8px;
    }

    .flat-heading {
      font-size: 0.95em;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 10px;
    }

    .add-type {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .add-type ha-textfield {
      flex: 1;
    }

    .remove-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }

    button.text-btn {
      background: none;
      border: none;
      color: var(--error-color, #db4437);
      font-size: 0.78em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      cursor: pointer;
      padding: 0;
    }

    .detect-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 12px;
    }

    .detect-block ha-button {
      width: 100%;
      --mdc-button-horizontal-padding: 16px;
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
    const newConfig = mergeDetection(this.config!, detected, false);
    this._dispatch(newConfig);
    this._detectIsError = false;
    this._detectStatus = `Detected: ${detected.summary.join(", ")}`;
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

  private _setEntityType(
    type: string,
    key: keyof EntityTypeConfig,
    value: unknown
  ) {
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
    const oct: OctopusConfig = { ...current.octopus, [key]: value || undefined };
    const hasAny = Object.values(oct).some(Boolean);
    entityTypes[type] = hasAny
      ? { ...current, octopus: oct }
      : (({ octopus: _, ...rest }) => rest)(current);
    this._set("entity_types", entityTypes);
  }

  private _capitalize(s: string) {
    if (s === "ev") return "EV";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private _addCustomType() {
    const name = this._newTypeName.trim().toLowerCase().replace(/\s+/g, "_");
    if (!name) return;
    const entityTypes = {
      ...(this.config?.entity_types ?? {}),
      [name]: {},
    };
    this._set("entity_types", entityTypes);
    this._newTypeName = "";
  }

  private _removeCustomType(type: string) {
    const entityTypes = { ...(this.config?.entity_types ?? {}) };
    delete entityTypes[type];
    this._set("entity_types", entityTypes);
  }

  render() {
    if (!this.config) return nothing;

    const grid = this.config.entity_types?.grid ?? {};
    const solar = this.config.entity_types?.solar ?? {};
    const battery = this.config.entity_types?.battery ?? {};
    const home = this.config.entity_types?.home ?? {};
    const ev = this.config.entity_types?.ev ?? {};
    let customType1Name = "custom_1";
    for (const type of Object.keys(this.config.entity_types ?? {})) {
      if (!(DEFAULT_ENTITY_TYPES as readonly string[]).includes(type)) {
        customType1Name = type;
        break;
      }
    }
    const custom1 = this.config.entity_types?.[customType1Name] ?? {};
    const liveData: LiveDataConfig = this.config.live_data ?? {};
    const system: SystemConfig = this.config.system ?? {};
    const display: DisplayConfig = this.config.display ?? {};

    return html`
      <div class="detect-block">
        <ha-button unelevated @click=${this._runAutoDetect}>Auto-detect entities</ha-button>
        <span class="detect-status ${this._detectIsError ? "error" : ""}">
          ${this._detectStatus || "Scan your entities and pre-fill fields automatically."}
        </span>
      </div>

      <div class="top-fields">
        <ha-textfield
          label="Title"
          .value=${this.config.title ?? ""}
          @change=${(e: Event) =>
            this._set("title", (e.target as HTMLInputElement).value || undefined)}
        ></ha-textfield>
        <div class="switch-row">
          <span>Show Title</span>
          <ha-switch
            .checked=${this.config.show_header ?? true}
            @change=${(e: Event) =>
              this._set("show_header", (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>
        <ha-entity-picker
          label="Tariff status entity"
          .hass=${this.hass}
          .value=${this.config.tariff_entity ?? ""}
          @value-changed=${(e: CustomEvent) =>
            this._set("tariff_entity", e.detail.value || undefined)}
        ></ha-entity-picker>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">Type</div>

      <div class="flat-section">
        <div class="flat-heading">Grid</div>
        <div class="flat-body">
          <ha-entity-picker
            label="grid_import_power"
            .hass=${this.hass}
            .value=${grid.power_import ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "power_import", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="grid_export_power"
            .hass=${this.hass}
            .value=${grid.power_export ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "power_export", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="grid_combined_power"
            .hass=${this.hass}
            .value=${grid.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "power_combined", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="grid_daily_usage"
            .hass=${this.hass}
            .value=${grid.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("grid", "daily_usage", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Octopus Rate Entity"
            .hass=${this.hass}
            .value=${grid.octopus?.rate_entity ?? ""}
            @value-changed=${(e: CustomEvent) => this._setOctopus("grid", "rate_entity", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Octopus Cost Entity"
            .hass=${this.hass}
            .value=${grid.octopus?.cost_entity ?? ""}
            @value-changed=${(e: CustomEvent) => this._setOctopus("grid", "cost_entity", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Octopus Slots Entity"
            .hass=${this.hass}
            .value=${grid.octopus?.slots_entity ?? ""}
            @value-changed=${(e: CustomEvent) => this._setOctopus("grid", "slots_entity", e.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${grid.show_zero !== false}
              @change=${(e: Event) => this._setEntityType("grid", "show_zero", (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${grid.zero_tolerance != null ? String(grid.zero_tolerance) : ""}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._setEntityType("grid", "zero_tolerance", v !== "" ? Number(v) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${grid.label ?? ""}
            @change=${(e: Event) => this._setEntityType("grid", "label", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${grid.colour ?? ""}
            placeholder="#e91e63"
            @change=${(e: Event) => this._setEntityType("grid", "colour", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Solar</div>
        <div class="flat-body">
          <ha-entity-picker
            label="solar_combined_power"
            .hass=${this.hass}
            .value=${solar.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("solar", "power_combined", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="solar_daily_usage"
            .hass=${this.hass}
            .value=${solar.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("solar", "daily_usage", e.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${solar.show_zero !== false}
              @change=${(e: Event) => this._setEntityType("solar", "show_zero", (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${solar.zero_tolerance != null ? String(solar.zero_tolerance) : ""}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._setEntityType("solar", "zero_tolerance", v !== "" ? Number(v) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${solar.label ?? ""}
            @change=${(e: Event) => this._setEntityType("solar", "label", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${solar.colour ?? ""}
            placeholder="#f9a825"
            @change=${(e: Event) => this._setEntityType("solar", "colour", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Battery</div>
        <div class="flat-body">
          <ha-entity-picker
            label="battery_soc"
            .hass=${this.hass}
            .value=${battery.soc ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("battery", "soc", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="battery_combined_power"
            .hass=${this.hass}
            .value=${battery.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("battery", "power_combined", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="battery_daily_usage"
            .hass=${this.hass}
            .value=${battery.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("battery", "daily_usage", e.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${battery.show_zero !== false}
              @change=${(e: Event) => this._setEntityType("battery", "show_zero", (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${battery.zero_tolerance != null ? String(battery.zero_tolerance) : ""}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._setEntityType("battery", "zero_tolerance", v !== "" ? Number(v) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${battery.label ?? ""}
            @change=${(e: Event) => this._setEntityType("battery", "label", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${battery.colour ?? ""}
            placeholder="#43a047"
            @change=${(e: Event) => this._setEntityType("battery", "colour", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Home</div>
        <div class="flat-body">
          <ha-entity-picker
            label="home_combined_power"
            .hass=${this.hass}
            .value=${home.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("home", "power_combined", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="home_daily_usage"
            .hass=${this.hass}
            .value=${home.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("home", "daily_usage", e.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${home.show_zero !== false}
              @change=${(e: Event) => this._setEntityType("home", "show_zero", (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${home.zero_tolerance != null ? String(home.zero_tolerance) : ""}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._setEntityType("home", "zero_tolerance", v !== "" ? Number(v) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${home.label ?? ""}
            @change=${(e: Event) => this._setEntityType("home", "label", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${home.colour ?? ""}
            placeholder="#388e3c"
            @change=${(e: Event) => this._setEntityType("home", "colour", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">EV</div>
        <div class="flat-body">
          <ha-entity-picker
            label="ev_soc"
            .hass=${this.hass}
            .value=${ev.soc ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("ev", "soc", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="ev_combined_power"
            .hass=${this.hass}
            .value=${ev.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("ev", "power_combined", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="ev_daily_usage"
            .hass=${this.hass}
            .value=${ev.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType("ev", "daily_usage", e.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${ev.show_zero !== false}
              @change=${(e: Event) => this._setEntityType("ev", "show_zero", (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${ev.zero_tolerance != null ? String(ev.zero_tolerance) : ""}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._setEntityType("ev", "zero_tolerance", v !== "" ? Number(v) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${ev.label ?? ""}
            @change=${(e: Event) => this._setEntityType("ev", "label", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${ev.colour ?? ""}
            placeholder="#1e88e5"
            @change=${(e: Event) => this._setEntityType("ev", "colour", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>
      </div>

      <div class="flat-section">
        <div class="flat-heading">Custom 1</div>
        <div class="flat-body">
          <ha-entity-picker
            label="custom1_import_power"
            .hass=${this.hass}
            .value=${custom1.power_import ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType(customType1Name, "power_import", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_export_power"
            .hass=${this.hass}
            .value=${custom1.power_export ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType(customType1Name, "power_export", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_combined_power"
            .hass=${this.hass}
            .value=${custom1.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType(customType1Name, "power_combined", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_daily_usage"
            .hass=${this.hass}
            .value=${custom1.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType(customType1Name, "daily_usage", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="custom1_soc"
            .hass=${this.hass}
            .value=${custom1.soc ?? ""}
            @value-changed=${(e: CustomEvent) => this._setEntityType(customType1Name, "soc", e.detail.value)}
          ></ha-entity-picker>
          <div class="switch-row">
            <span>Show Zero</span>
            <ha-switch
              .checked=${custom1.show_zero !== false}
              @change=${(e: Event) => this._setEntityType(customType1Name, "show_zero", (e.target as HTMLInputElement).checked)}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Zero Tolerance"
            type="number"
            min="0"
            .value=${custom1.zero_tolerance != null ? String(custom1.zero_tolerance) : ""}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._setEntityType(customType1Name, "zero_tolerance", v !== "" ? Number(v) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            label="Label"
            .value=${custom1.label ?? ""}
            @change=${(e: Event) => this._setEntityType(customType1Name, "label", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            label="Colour"
            .value=${custom1.colour ?? ""}
            placeholder="#9e9e9e"
            @change=${(e: Event) => this._setEntityType(customType1Name, "colour", (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <div class="remove-row">
            <button class="text-btn" @click=${() => this._removeCustomType(customType1Name)}>
              Remove type
            </button>
          </div>
        </div>
      </div>

      <div class="add-type">
        <ha-textfield
          label="Add custom type"
          .value=${this._newTypeName}
          @input=${(e: Event) =>
            (this._newTypeName = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) =>
            e.key === "Enter" && this._addCustomType()}
        ></ha-textfield>
        <mwc-button @click=${this._addCustomType}>Add</mwc-button>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">Live Data</div>
      <div class="flat-section">
        <div class="flat-body">
          <ha-textfield
            label="Refresh interval (s)"
            type="number"
            min="1"
            .value=${String(liveData.refresh_interval ?? 5)}
            @change=${(e: Event) =>
              this._set("live_data", {
                ...liveData,
                refresh_interval: Number((e.target as HTMLInputElement).value),
              })}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show live badge</span>
            <ha-switch
              .checked=${liveData.show_live_badge ?? true}
              @change=${(e: Event) =>
                this._set("live_data", {
                  ...liveData,
                  show_live_badge: (e.target as HTMLInputElement).checked,
                })}
            ></ha-switch>
          </div>
        </div>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">System</div>
      <div class="flat-section">
        <div class="flat-body">
          <ha-textfield
            label="Energy day reset hour (0–23)"
            type="number"
            min="0"
            max="23"
            .value=${String(system.energy_date_reset ?? 0)}
            @change=${(e: Event) =>
              this._set("system", {
                ...system,
                energy_date_reset: Number((e.target as HTMLInputElement).value),
              })}
          ></ha-textfield>
          <ha-select
            label="Time format"
            .value=${system.time_format ?? "24h"}
            @value-changed=${(e: CustomEvent) =>
              this._set("system", {
                ...system,
                time_format: e.detail.value as "12h" | "24h",
              })}
          >
            <mwc-list-item value="12h">12h</mwc-list-item>
            <mwc-list-item value="24h">24h</mwc-list-item>
          </ha-select>
        </div>
      </div>

      <div class="group-divider"></div>
      <div class="group-heading">Display</div>
      <div class="flat-section">
        <div class="flat-body">
          <ha-textfield
            label="Decimal places"
            type="number"
            min="0"
            max="4"
            .value=${String(display.decimal_places ?? 1)}
            @change=${(e: Event) =>
              this._set("display", {
                ...display,
                decimal_places: Number((e.target as HTMLInputElement).value),
              })}
          ></ha-textfield>
          <ha-select
            label="Unit"
            .value=${display.unit ?? "auto"}
            @value-changed=${(e: CustomEvent) =>
              this._set("display", {
                ...display,
                unit: e.detail.value as "W" | "kW" | "auto",
              })}
          >
            <mwc-list-item value="W">W</mwc-list-item>
            <mwc-list-item value="kW">kW</mwc-list-item>
            <mwc-list-item value="auto">Auto</mwc-list-item>
          </ha-select>
          <div class="switch-row">
            <span>Animation</span>
            <ha-switch
              .checked=${display.animation ?? true}
              @change=${(e: Event) =>
                this._set("display", {
                  ...display,
                  animation: (e.target as HTMLInputElement).checked,
                })}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Dynamic animation speed</span>
            <ha-switch
              .checked=${display.dynamic_animation_speed ?? false}
              @change=${(e: Event) =>
                this._set("display", {
                  ...display,
                  dynamic_animation_speed: (e.target as HTMLInputElement).checked,
                })}
            ></ha-switch>
          </div>
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

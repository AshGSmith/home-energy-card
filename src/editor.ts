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

    .top-fields {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;
    }

    ha-entity-picker,
    ha-textfield {
      display: block;
      width: 100%;
    }

    ha-select {
      display: block;
      width: 100%;
      margin-bottom: 8px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    .type-fields {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 0 8px;
    }

    .color-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    input[type="color"] {
      width: 44px;
      height: 28px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 2px 3px;
      cursor: pointer;
      background: none;
    }

    .add-type {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .add-type ha-textfield {
      flex: 1;
    }

    .remove-type {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;
    }

    .subsection-label {
      font-size: 0.75em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      opacity: 0.5;
      margin: 12px 0 4px;
    }

    button.text-btn {
      background: none;
      border: none;
      color: var(--error-color, #db4437);
      font-size: 0.85em;
      cursor: pointer;
      padding: 0;
    }

    ha-expansion-panel {
      --expansion-panel-summary-padding: 0 16px;
      --expansion-panel-content-padding: 0 16px;
    }

    .inner-panel {
      margin-bottom: 4px;
    }

    .section-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 0;
    }

    .detect-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 8px;
    }

    .detect-status {
      flex: 1;
      font-size: 0.8em;
      opacity: 0.7;
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
    const newConfig = mergeDetection(this.config!, detected, /* overwrite= */ false);
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
    // Drop octopus key entirely if all fields are empty
    const hasAny = Object.values(oct).some(Boolean);
    entityTypes[type] = hasAny
      ? { ...current, octopus: oct }
      : (({ octopus: _, ...rest }) => rest)(current);
    this._set("entity_types", entityTypes);
  }

  private _renderEntityTypeFields(type: string) {
    const cfg: EntityTypeConfig = this.config?.entity_types?.[type] ?? {};
    return html`
      <div class="type-fields">
        <ha-entity-picker
          label="Power import"
          .hass=${this.hass}
          .value=${cfg.power_import ?? ""}
          @value-changed=${(e: CustomEvent) =>
            this._setEntityType(type, "power_import", e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Power export"
          .hass=${this.hass}
          .value=${cfg.power_export ?? ""}
          @value-changed=${(e: CustomEvent) =>
            this._setEntityType(type, "power_export", e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Power combined"
          .hass=${this.hass}
          .value=${cfg.power_combined ?? ""}
          @value-changed=${(e: CustomEvent) =>
            this._setEntityType(type, "power_combined", e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Daily usage"
          .hass=${this.hass}
          .value=${cfg.daily_usage ?? ""}
          @value-changed=${(e: CustomEvent) =>
            this._setEntityType(type, "daily_usage", e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Daily export"
          .hass=${this.hass}
          .value=${cfg.daily_export ?? ""}
          @value-changed=${(e: CustomEvent) =>
            this._setEntityType(type, "daily_export", e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="State of charge"
          .hass=${this.hass}
          .value=${cfg.soc ?? ""}
          @value-changed=${(e: CustomEvent) =>
            this._setEntityType(type, "soc", e.detail.value)}
        ></ha-entity-picker>
        <ha-textfield
          label="Label"
          .value=${cfg.label ?? ""}
          @change=${(e: Event) =>
            this._setEntityType(
              type,
              "label",
              (e.target as HTMLInputElement).value
            )}
        ></ha-textfield>
        <div class="color-row">
          <span>Colour</span>
          <input
            type="color"
            .value=${cfg.colour ?? "#4caf50"}
            @change=${(e: Event) =>
              this._setEntityType(
                type,
                "colour",
                (e.target as HTMLInputElement).value
              )}
          />
        </div>
        <div class="switch-row">
          <span>Show when zero</span>
          <ha-switch
            .checked=${cfg.show_zero ?? false}
            @change=${(e: Event) =>
              this._setEntityType(
                type,
                "show_zero",
                (e.target as HTMLInputElement).checked
              )}
          ></ha-switch>
        </div>
        <ha-textfield
          label="Zero tolerance"
          type="number"
          min="0"
          .value=${String(cfg.zero_tolerance ?? 0)}
          @change=${(e: Event) =>
            this._setEntityType(
              type,
              "zero_tolerance",
              Number((e.target as HTMLInputElement).value)
            )}
        ></ha-textfield>

        ${type === "grid" ? html`
          <div class="subsection-label">Octopus Energy</div>
          <ha-entity-picker
            label="Rate entity"
            .hass=${this.hass}
            .value=${cfg.octopus?.rate_entity ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this._setOctopus(type, "rate_entity", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Cost today entity"
            .hass=${this.hass}
            .value=${cfg.octopus?.cost_entity ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this._setOctopus(type, "cost_entity", e.detail.value)}
          ></ha-entity-picker>
          <ha-entity-picker
            label="Slots / rates entity"
            .hass=${this.hass}
            .value=${cfg.octopus?.slots_entity ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this._setOctopus(type, "slots_entity", e.detail.value)}
          ></ha-entity-picker>
        ` : nothing}
      </div>
    `;
  }

  private _capitalize(s: string) {
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

  private _renderEntityTypesSection() {
    const customTypes = Object.keys(
      this.config?.entity_types ?? {}
    ).filter(
      (k) => !(DEFAULT_ENTITY_TYPES as readonly string[]).includes(k)
    );

    return html`
      <ha-expansion-panel header="Entity Types" outlined>
        ${DEFAULT_ENTITY_TYPES.map(
          (type) => html`
            <ha-expansion-panel
              class="inner-panel"
              .header=${this._capitalize(type)}
              outlined
            >
              ${this._renderEntityTypeFields(type)}
            </ha-expansion-panel>
          `
        )}
        ${customTypes.map(
          (type) => html`
            <ha-expansion-panel
              class="inner-panel"
              .header=${this._capitalize(type)}
              outlined
            >
              ${this._renderEntityTypeFields(type)}
              <div class="remove-type">
                <button
                  class="text-btn"
                  @click=${() => this._removeCustomType(type)}
                >
                  Remove type
                </button>
              </div>
            </ha-expansion-panel>
          `
        )}
        <div class="add-type">
          <ha-textfield
            label="New type name"
            .value=${this._newTypeName}
            @input=${(e: Event) =>
              (this._newTypeName = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) =>
              e.key === "Enter" && this._addCustomType()}
          ></ha-textfield>
          <mwc-button @click=${this._addCustomType}>Add</mwc-button>
        </div>
      </ha-expansion-panel>
    `;
  }

  private _renderLiveDataSection() {
    const cfg: LiveDataConfig = this.config?.live_data ?? {};
    return html`
      <ha-expansion-panel header="Live Data" outlined>
        <div class="section-content">
          <ha-textfield
            label="Refresh interval (s)"
            type="number"
            min="1"
            .value=${String(cfg.refresh_interval ?? 5)}
            @change=${(e: Event) =>
              this._set("live_data", {
                ...cfg,
                refresh_interval: Number((e.target as HTMLInputElement).value),
              })}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show live badge</span>
            <ha-switch
              .checked=${cfg.show_live_badge ?? true}
              @change=${(e: Event) =>
                this._set("live_data", {
                  ...cfg,
                  show_live_badge: (e.target as HTMLInputElement).checked,
                })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  private _renderSystemSection() {
    const cfg: SystemConfig = this.config?.system ?? {};
    return html`
      <ha-expansion-panel header="System Settings" outlined>
        <div class="section-content">
          <ha-textfield
            label="Energy day reset hour (0–23)"
            type="number"
            min="0"
            max="23"
            .value=${String(cfg.energy_date_reset ?? 0)}
            @change=${(e: Event) =>
              this._set("system", {
                ...cfg,
                energy_date_reset: Number(
                  (e.target as HTMLInputElement).value
                ),
              })}
          ></ha-textfield>
          <ha-select
            label="Time format"
            .value=${cfg.time_format ?? "24h"}
            @value-changed=${(e: CustomEvent) =>
              this._set("system", {
                ...cfg,
                time_format: e.detail.value as "12h" | "24h",
              })}
          >
            <mwc-list-item value="12h">12h</mwc-list-item>
            <mwc-list-item value="24h">24h</mwc-list-item>
          </ha-select>
        </div>
      </ha-expansion-panel>
    `;
  }

  private _renderDisplaySection() {
    const cfg: DisplayConfig = this.config?.display ?? {};
    return html`
      <ha-expansion-panel header="Display" outlined>
        <div class="section-content">
          <ha-textfield
            label="Decimal places"
            type="number"
            min="0"
            max="4"
            .value=${String(cfg.decimal_places ?? 1)}
            @change=${(e: Event) =>
              this._set("display", {
                ...cfg,
                decimal_places: Number((e.target as HTMLInputElement).value),
              })}
          ></ha-textfield>
          <ha-select
            label="Unit"
            .value=${cfg.unit ?? "auto"}
            @value-changed=${(e: CustomEvent) =>
              this._set("display", {
                ...cfg,
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
              .checked=${cfg.animation ?? true}
              @change=${(e: Event) =>
                this._set("display", {
                  ...cfg,
                  animation: (e.target as HTMLInputElement).checked,
                })}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Dynamic animation speed</span>
            <ha-switch
              .checked=${cfg.dynamic_animation_speed ?? false}
              @change=${(e: Event) =>
                this._set("display", {
                  ...cfg,
                  dynamic_animation_speed: (e.target as HTMLInputElement).checked,
                })}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  render() {
    if (!this.config) return nothing;

    return html`
      <div class="detect-row">
        <mwc-button outlined @click=${this._runAutoDetect}>Auto-detect</mwc-button>
        ${this._detectStatus
          ? html`<span class="detect-status ${this._detectIsError ? "error" : ""}">${this._detectStatus}</span>`
          : html`<span class="detect-status">Scan entities to pre-fill fields.</span>`}
      </div>

      <div class="top-fields">
        <ha-textfield
          label="Device"
          .value=${this.config.device ?? ""}
          @change=${(e: Event) =>
            this._set("device", (e.target as HTMLInputElement).value || undefined)}
        ></ha-textfield>
        <ha-textfield
          label="Title"
          .value=${this.config.title ?? ""}
          @change=${(e: Event) =>
            this._set("title", (e.target as HTMLInputElement).value || undefined)}
        ></ha-textfield>
        <div class="switch-row">
          <span>Show header</span>
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

      ${this._renderEntityTypesSection()}
      ${this._renderLiveDataSection()}
      ${this._renderSystemSection()}
      ${this._renderDisplaySection()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card-editor": HomeEnergyCardEditor;
  }
}

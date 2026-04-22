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
  @state() private _openSections = new Set<string>();

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

    ha-expansion-panel {
      --expansion-panel-summary-padding: 0 16px;
      --expansion-panel-content-padding: 0 16px;
    }

    /* ── Section dividers / group labels ── */
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

    /* ── Custom accordion: one block per entity type ── */
    .type-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .type-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 500;
      text-align: left;
      color: var(--primary-text-color);
      gap: 8px;
    }

    .type-toggle:hover {
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
    }

    .type-toggle ha-icon {
      --mdc-icon-size: 18px;
      opacity: 0.5;
      flex-shrink: 0;
    }

    .type-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px 16px 16px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
    }

    .type-body[hidden] { display: none; }

    /* ── Entity pickers inside type body ── */
    .subsection-label {
      font-size: 0.72em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      opacity: 0.45;
      margin: 6px 0 0;
    }

    .remove-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 8px;
    }

    /* ── Add custom type ── */
    .add-type {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .add-type ha-textfield { flex: 1; }

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

    .section-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 0;
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
    const isCustom = !(DEFAULT_ENTITY_TYPES as readonly string[]).includes(type);

    const hasImportExport = type === "grid" || isCustom;
    const hasSoc          = type === "battery" || type === "ev" || isCustom;

    const pick = (key: keyof EntityTypeConfig) => (e: CustomEvent) =>
      this._setEntityType(type, key, e.detail.value);
    const text = (key: keyof EntityTypeConfig) => (e: Event) =>
      this._setEntityType(type, key, (e.target as HTMLInputElement).value || undefined);

    return html`

      <!-- ── Group 1: Entities ── -->
      <div class="subsection-label">Entities</div>

      ${hasImportExport ? html`
        <ha-entity-picker
          label="Import power"
          .hass=${this.hass}
          .value=${cfg.power_import ?? ""}
          @value-changed=${pick("power_import")}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Export power"
          .hass=${this.hass}
          .value=${cfg.power_export ?? ""}
          @value-changed=${pick("power_export")}
        ></ha-entity-picker>
      ` : nothing}

      <ha-entity-picker
        label="Combined power"
        .hass=${this.hass}
        .value=${cfg.power_combined ?? ""}
        @value-changed=${pick("power_combined")}
      ></ha-entity-picker>

      <ha-entity-picker
        label="Daily usage"
        .hass=${this.hass}
        .value=${cfg.daily_usage ?? ""}
        @value-changed=${pick("daily_usage")}
      ></ha-entity-picker>

      ${hasSoc ? html`
        <ha-entity-picker
          label="State of charge (%)"
          .hass=${this.hass}
          .value=${cfg.soc ?? ""}
          @value-changed=${pick("soc")}
        ></ha-entity-picker>
      ` : nothing}

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

      <!-- ── Group 2: Display ── -->
      <div class="subsection-label">Display</div>

      <div class="switch-row">
        <span>Show when idle</span>
        <ha-switch
          .checked=${cfg.show_zero !== false}
          @change=${(e: Event) =>
            this._setEntityType(type, "show_zero", (e.target as HTMLInputElement).checked)}
        ></ha-switch>
      </div>

      <ha-textfield
        label="Zero tolerance (W)"
        type="number"
        min="0"
        .value=${cfg.zero_tolerance != null ? String(cfg.zero_tolerance) : ""}
        @change=${(e: Event) => {
          const v = (e.target as HTMLInputElement).value;
          this._setEntityType(type, "zero_tolerance", v !== "" ? Number(v) : undefined);
        }}
      ></ha-textfield>

      <ha-textfield
        label="Label"
        .value=${cfg.label ?? ""}
        @change=${text("label")}
      ></ha-textfield>

      <ha-textfield
        label="Colour"
        .value=${cfg.colour ?? ""}
        placeholder="#e91e63"
        @change=${text("colour")}
      ></ha-textfield>

    `;
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

  private _toggleSection(type: string) {
    const s = new Set(this._openSections);
    s.has(type) ? s.delete(type) : s.add(type);
    this._openSections = s;
  }

  private _renderEntityTypeSections() {
    const customTypes = Object.keys(
      this.config?.entity_types ?? {}
    ).filter(
      (k) => !(DEFAULT_ENTITY_TYPES as readonly string[]).includes(k)
    );

    const renderSection = (type: string, isCustom = false) => {
      const open = this._openSections.has(type);
      return html`
        <div class="type-block">
          <button class="type-toggle" @click=${() => this._toggleSection(type)}>
            <span>${this._capitalize(type)}</span>
            <ha-icon icon="mdi:chevron-${open ? "up" : "down"}"></ha-icon>
          </button>
          ${open ? html`
            <div class="type-body">
              ${this._renderEntityTypeFields(type)}
              ${isCustom ? html`
                <div class="remove-row">
                  <button class="text-btn" @click=${() => this._removeCustomType(type)}>
                    Remove type
                  </button>
                </div>
              ` : nothing}
            </div>
          ` : nothing}
        </div>
      `;
    };

    return html`
      <div class="group-divider"></div>
      <div class="group-heading">Type</div>

      ${DEFAULT_ENTITY_TYPES.map(t => renderSection(t))}
      ${customTypes.map(t => renderSection(t, true))}

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
          <span>Show title</span>
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

      ${this._renderEntityTypeSections()}
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

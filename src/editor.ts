import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { autoDetect, mergeDetection } from "./auto-detect.js";
import {
  MAX_CUSTOM_TYPES,
  normalizeCardConfig,
  type CardConfig,
  type EntityTypeConfig,
} from "./types.js";

@customElement("home-energy-card-editor")
export class HomeEnergyCardEditor extends LitElement {
  @property({ attribute: false }) hass?: object;
  @property({ attribute: false }) config?: CardConfig;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ha-expansion-panel {
      --expansion-panel-content-padding: 0;
    }

    ha-textfield,
    ha-selector {
      display: block;
      width: 100%;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      min-height: 40px;
      padding: 0 16px;
      border-radius: 10px;
      border: 1px solid transparent;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: filter 0.15s ease, transform 0.1s ease;
      box-sizing: border-box;
    }

    .action-button:hover {
      filter: brightness(0.97);
    }

    .action-button:active {
      transform: translateY(1px);
    }

    .action-button.primary {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
      box-shadow: var(
        --ha-card-box-shadow,
        0 2px 6px rgba(0, 0, 0, 0.16)
      );
    }

    .action-button.delete-button {
      color: var(--error-color);
      background: var(--card-background-color, #fff);
      border-color: color-mix(in srgb, var(--error-color) 40%, transparent);
    }

    .action-icon {
      --mdc-icon-size: 18px;
    }

    .section-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px 0 4px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 0.95em;
    }

    .helper-text {
      font-size: 0.84em;
      line-height: 1.35;
      color: var(--secondary-text-color);
      padding: 0 2px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 6px 0 2px;
    }

    .field-group-label {
      font-size: 0.92em;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 0 2px;
    }

    .entity-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px;
      align-items: end;
    }

    .icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid color-mix(in srgb, var(--divider-color, #d0d0d0) 80%, transparent);
      background: var(--card-background-color, #fff);
      color: var(--secondary-text-color);
      cursor: pointer;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .icon-button.delete {
      color: var(--error-color);
      border-color: color-mix(in srgb, var(--error-color) 40%, transparent);
    }

    .inline-action {
      width: auto;
      align-self: flex-start;
      padding: 0 12px;
      min-height: 36px;
      font-weight: 500;
    }
  `;

  setConfig(config: CardConfig) {
    this.config = normalizeCardConfig(config);
  }

  private _dispatchConfig(config: CardConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: normalizeCardConfig(config) },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _addCustomType() {
    if ((this.config?.custom_types?.length ?? 0) >= MAX_CUSTOM_TYPES) return;
    const customTypes = [...(this.config?.custom_types ?? []), {}];
    this._dispatchConfig({
      ...this.config!,
      custom_types: customTypes,
    });
  }

  private _deleteCustomType(index: number) {
    const customTypes = [...(this.config?.custom_types ?? [])];
    customTypes.splice(index, 1);
    this._dispatchConfig({
      ...this.config!,
      custom_types: customTypes,
    });
  }

  private _setCustomType(index: number, patch: Partial<EntityTypeConfig>) {
    const customTypes = [...(this.config?.custom_types ?? [])];
    customTypes[index] = {
      ...(customTypes[index] ?? {}),
      ...patch,
    };
    this._dispatchConfig({
      ...this.config!,
      custom_types: customTypes,
    });
  }

  private _multiEntityValue(value?: string | string[]) {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }

  private _customEntityValues(
    customType: EntityTypeConfig,
    field: "import_power" | "export_power" | "combined_power" | "daily_usage",
  ): string[] {
    const values = this._multiEntityValue(customType[field]);
    return values.length ? values : [""];
  }

  private _setCustomTypeEntityAt(
    index: number,
    field: "import_power" | "export_power" | "combined_power" | "daily_usage",
    entityIndex: number,
    value: string | undefined,
  ) {
    const customType = this.config?.custom_types?.[index] ?? {};
    const values = [...this._customEntityValues(customType, field)];
    values[entityIndex] = value ?? "";
    this._setCustomType(index, {
      [field]: values.map((entry) => entry.trim()),
    });
  }

  private _addCustomTypeEntity(
    index: number,
    field: "import_power" | "export_power" | "combined_power" | "daily_usage",
  ) {
    const customType = this.config?.custom_types?.[index] ?? {};
    const values = [...this._customEntityValues(customType, field)];
    const next = [...values, ""];
    this._setCustomType(index, {
      [field]: next,
    });
  }

  private _deleteCustomTypeEntity(
    index: number,
    field: "import_power" | "export_power" | "combined_power" | "daily_usage",
    entityIndex: number,
  ) {
    const customType = this.config?.custom_types?.[index] ?? {};
    const values = [...this._customEntityValues(customType, field)];
    values.splice(entityIndex, 1);
    const next = values.map((entry) => entry.trim());
    this._setCustomType(index, {
      [field]: next.length ? next : undefined,
    });
  }

  render() {
    if (!this.config) return nothing;
    const customTypes = this.config.custom_types ?? [];
    const renderedCustomTypes = customTypes.slice(0, MAX_CUSTOM_TYPES);
    const maxCustomReached = customTypes.length >= MAX_CUSTOM_TYPES;

    return html`
      <ha-expansion-panel header="General">
        <div class="section-body">
          <mwc-button
            @click=${() =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: normalizeCardConfig(
                      mergeDetection(this.config!, autoDetect(this.hass), false),
                    ),
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          >
            Auto-detect
          </mwc-button>

          <ha-textfield
            label="Title"
            .value=${this.config.title ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      title: (e.target as HTMLInputElement).value || undefined,
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>

          <div class="switch-row">
            <span>Show Title</span>
            <ha-switch
              .checked=${this.config.show_header ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        show_header: (e.target as HTMLInputElement).checked,
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <span>Show Header Values</span>
            <ha-switch
              .checked=${this.config.show_header_values ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        show_header_values: (e.target as HTMLInputElement).checked,
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <span>Dynamic Custom Placement</span>
            <ha-switch
              .checked=${this.config.dynamic_custom_placement ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        dynamic_custom_placement: (e.target as HTMLInputElement).checked,
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Grid">
        <div class="section-body">
          <ha-selector
            label="Grid Import Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.grid?.power_import ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          power_import: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="Grid Export Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.grid?.power_export ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          power_export: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="Grid Combined Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.grid?.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          power_combined: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="Grid Daily Usage"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.grid?.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          daily_usage: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <ha-selector
            label="Export Current Rate"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.grid?.export_rate ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          export_rate: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <div class="switch-row">
            <span>Grid Show when idle</span>
            <ha-switch
              .checked=${this.config.entity_types?.grid?.show_zero ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          grid: {
                            ...(this.config!.entity_types?.grid ?? {}),
                            show_zero: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Grid Zero Tolerance"
            type="number"
            min="0"
            .value=${this.config.entity_types?.grid?.zero_tolerance != null ? String(this.config.entity_types?.grid?.zero_tolerance) : ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          zero_tolerance: (e.target as HTMLInputElement).value !== "" ? Number((e.target as HTMLInputElement).value) : undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${this.config.entity_types?.grid?.show_label ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          grid: {
                            ...(this.config!.entity_types?.grid ?? {}),
                            show_label: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Grid Label"
            .value=${this.config.entity_types?.grid?.label ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          label: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${this.config.entity_types?.grid?.icon ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          icon: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <ha-textfield
            label="Grid Colour"
            .value=${this.config.entity_types?.grid?.colour ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        grid: {
                          ...(this.config!.entity_types?.grid ?? {}),
                          colour: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Solar">
        <div class="section-body">
          <ha-selector
            label="Solar Combined Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.solar?.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        solar: {
                          ...(this.config!.entity_types?.solar ?? {}),
                          power_combined: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="Solar Daily Usage"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.solar?.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        solar: {
                          ...(this.config!.entity_types?.solar ?? {}),
                          daily_usage: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <div class="switch-row">
            <span>Solar Show when idle</span>
            <ha-switch
              .checked=${this.config.entity_types?.solar?.show_zero ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          solar: {
                            ...(this.config!.entity_types?.solar ?? {}),
                            show_zero: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Solar Zero Tolerance"
            type="number"
            min="0"
            .value=${this.config.entity_types?.solar?.zero_tolerance != null ? String(this.config.entity_types?.solar?.zero_tolerance) : ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        solar: {
                          ...(this.config!.entity_types?.solar ?? {}),
                          zero_tolerance: (e.target as HTMLInputElement).value !== "" ? Number((e.target as HTMLInputElement).value) : undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${this.config.entity_types?.solar?.show_label ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          solar: {
                            ...(this.config!.entity_types?.solar ?? {}),
                            show_label: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Solar Label"
            .value=${this.config.entity_types?.solar?.label ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        solar: {
                          ...(this.config!.entity_types?.solar ?? {}),
                          label: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${this.config.entity_types?.solar?.icon ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        solar: {
                          ...(this.config!.entity_types?.solar ?? {}),
                          icon: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <ha-textfield
            label="Solar Colour"
            .value=${this.config.entity_types?.solar?.colour ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        solar: {
                          ...(this.config!.entity_types?.solar ?? {}),
                          colour: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Battery">
        <div class="section-body">
          <ha-selector
            label="Battery State of Charge"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.battery?.soc ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        battery: {
                          ...(this.config!.entity_types?.battery ?? {}),
                          soc: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="Battery Combined Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.battery?.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        battery: {
                          ...(this.config!.entity_types?.battery ?? {}),
                          power_combined: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="Battery Daily Usage"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.battery?.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        battery: {
                          ...(this.config!.entity_types?.battery ?? {}),
                          daily_usage: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <div class="switch-row">
            <span>Battery Show when idle</span>
            <ha-switch
              .checked=${this.config.entity_types?.battery?.show_zero ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          battery: {
                            ...(this.config!.entity_types?.battery ?? {}),
                            show_zero: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Battery Zero Tolerance"
            type="number"
            min="0"
            .value=${this.config.entity_types?.battery?.zero_tolerance != null ? String(this.config.entity_types?.battery?.zero_tolerance) : ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        battery: {
                          ...(this.config!.entity_types?.battery ?? {}),
                          zero_tolerance: (e.target as HTMLInputElement).value !== "" ? Number((e.target as HTMLInputElement).value) : undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <div class="switch-row">
            <span>Reverse Power Flow</span>
            <ha-switch
              .checked=${this.config.entity_types?.battery?.reverse_power_flow ?? false}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          battery: {
                            ...(this.config!.entity_types?.battery ?? {}),
                            reverse_power_flow: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${this.config.entity_types?.battery?.show_label ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          battery: {
                            ...(this.config!.entity_types?.battery ?? {}),
                            show_label: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Battery Label"
            .value=${this.config.entity_types?.battery?.label ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        battery: {
                          ...(this.config!.entity_types?.battery ?? {}),
                          label: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${this.config.entity_types?.battery?.icon ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        battery: {
                          ...(this.config!.entity_types?.battery ?? {}),
                          icon: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <ha-textfield
            label="Battery Colour"
            .value=${this.config.entity_types?.battery?.colour ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        battery: {
                          ...(this.config!.entity_types?.battery ?? {}),
                          colour: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="Home">
        <div class="section-body">
          <ha-selector
            label="Home Combined Power"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.home?.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        home: {
                          ...(this.config!.entity_types?.home ?? {}),
                          power_combined: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="Home Daily Usage"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.home?.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        home: {
                          ...(this.config!.entity_types?.home ?? {}),
                          daily_usage: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <div class="switch-row">
            <span>Home Show when idle</span>
            <ha-switch
              .checked=${this.config.entity_types?.home?.show_zero ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          home: {
                            ...(this.config!.entity_types?.home ?? {}),
                            show_zero: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Home Zero Tolerance"
            type="number"
            min="0"
            .value=${this.config.entity_types?.home?.zero_tolerance != null ? String(this.config.entity_types?.home?.zero_tolerance) : ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        home: {
                          ...(this.config!.entity_types?.home ?? {}),
                          zero_tolerance: (e.target as HTMLInputElement).value !== "" ? Number((e.target as HTMLInputElement).value) : undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${this.config.entity_types?.home?.show_label ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          home: {
                            ...(this.config!.entity_types?.home ?? {}),
                            show_label: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="Home Label"
            .value=${this.config.entity_types?.home?.label ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        home: {
                          ...(this.config!.entity_types?.home ?? {}),
                          label: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${this.config.entity_types?.home?.icon ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        home: {
                          ...(this.config!.entity_types?.home ?? {}),
                          icon: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <ha-textfield
            label="Home Colour"
            .value=${this.config.entity_types?.home?.colour ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        home: {
                          ...(this.config!.entity_types?.home ?? {}),
                          colour: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel header="EV">
        <div class="section-body">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.ev?.power_combined ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        ev: {
                          ...(this.config!.entity_types?.ev ?? {}),
                          power_combined: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="EV State of Charge"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.ev?.soc ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        ev: {
                          ...(this.config!.entity_types?.ev ?? {}),
                          soc: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>

          <ha-selector
            label="EV Daily Usage"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${this.config.entity_types?.ev?.daily_usage ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        ev: {
                          ...(this.config!.entity_types?.ev ?? {}),
                          daily_usage: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <div class="switch-row">
            <span>EV Show when idle</span>
            <ha-switch
              .checked=${this.config.entity_types?.ev?.show_zero ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          ev: {
                            ...(this.config!.entity_types?.ev ?? {}),
                            show_zero: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="EV Zero Tolerance"
            type="number"
            min="0"
            .value=${this.config.entity_types?.ev?.zero_tolerance != null ? String(this.config.entity_types?.ev?.zero_tolerance) : ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        ev: {
                          ...(this.config!.entity_types?.ev ?? {}),
                          zero_tolerance: (e.target as HTMLInputElement).value !== "" ? Number((e.target as HTMLInputElement).value) : undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <div class="switch-row">
            <span>Subtract from Home</span>
            <ha-switch
              .checked=${this.config.ev_subtract_from_home ?? false}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        ev_subtract_from_home: (e.target as HTMLInputElement).checked,
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <div class="switch-row">
            <span>Show Label</span>
            <ha-switch
              .checked=${this.config.entity_types?.ev?.show_label ?? true}
              @change=${(e: Event) =>
                this.dispatchEvent(
                  new CustomEvent("config-changed", {
                    detail: {
                      config: {
                        ...this.config!,
                        entity_types: {
                          ...(this.config!.entity_types ?? {}),
                          ev: {
                            ...(this.config!.entity_types?.ev ?? {}),
                            show_label: (e.target as HTMLInputElement).checked,
                          },
                        },
                      },
                    },
                    bubbles: true,
                    composed: true,
                  })
                )}
            ></ha-switch>
          </div>
          <ha-textfield
            label="EV Label"
            .value=${this.config.entity_types?.ev?.label ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        ev: {
                          ...(this.config!.entity_types?.ev ?? {}),
                          label: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
          <ha-selector
            label="Icon"
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${this.config.entity_types?.ev?.icon ?? ""}
            @value-changed=${(e: CustomEvent) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        ev: {
                          ...(this.config!.entity_types?.ev ?? {}),
                          icon: e.detail.value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-selector>
          <ha-textfield
            label="EV Colour"
            .value=${this.config.entity_types?.ev?.colour ?? ""}
            @change=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent("config-changed", {
                  detail: {
                    config: {
                      ...this.config!,
                      entity_types: {
                        ...(this.config!.entity_types ?? {}),
                        ev: {
                          ...(this.config!.entity_types?.ev ?? {}),
                          colour: (e.target as HTMLInputElement).value || undefined,
                        },
                      },
                    },
                  },
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ha-textfield>
        </div>
      </ha-expansion-panel>

      <button
        class="action-button primary"
        type="button"
        ?disabled=${maxCustomReached}
        @click=${() => this._addCustomType()}
      >
        <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
        Add Custom Type
      </button>
      ${maxCustomReached
        ? html`<div class="helper-text">Maximum of 4 Custom types allowed</div>`
        : nothing}

      ${renderedCustomTypes.map((customType, index) => html`
        <ha-expansion-panel header=${customType.label?.trim() || `Custom ${index + 1}`}>
          <div class="section-body">
            <button
              class="action-button delete-button"
              type="button"
              @click=${() => this._deleteCustomType(index)}
            >
              <ha-icon class="action-icon" icon="mdi:delete"></ha-icon>
              Delete Custom Type
            </button>

            <div class="field-group">
              <div class="field-group-label">Import Power Entities</div>
              ${this._customEntityValues(customType, "import_power").map((entityId, entityIndex) => html`
                <div class="entity-row">
                  <ha-selector
                    label=${`Import Power Entity ${entityIndex + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${entityId}
                    @value-changed=${(e: CustomEvent) =>
                      this._setCustomTypeEntityAt(index, "import_power", entityIndex, e.detail.value || undefined)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Import Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(index, "import_power", entityIndex)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(index, "import_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Export Power Entities</div>
              ${this._customEntityValues(customType, "export_power").map((entityId, entityIndex) => html`
                <div class="entity-row">
                  <ha-selector
                    label=${`Export Power Entity ${entityIndex + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${entityId}
                    @value-changed=${(e: CustomEvent) =>
                      this._setCustomTypeEntityAt(index, "export_power", entityIndex, e.detail.value || undefined)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Export Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(index, "export_power", entityIndex)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(index, "export_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Combined Power Entities</div>
              ${this._customEntityValues(customType, "combined_power").map((entityId, entityIndex) => html`
                <div class="entity-row">
                  <ha-selector
                    label=${`Combined Power Entity ${entityIndex + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${entityId}
                    @value-changed=${(e: CustomEvent) =>
                      this._setCustomTypeEntityAt(index, "combined_power", entityIndex, e.detail.value || undefined)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Combined Power Entity"
                    @click=${() => this._deleteCustomTypeEntity(index, "combined_power", entityIndex)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(index, "combined_power")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <div class="field-group">
              <div class="field-group-label">Daily Usage Entities</div>
              ${this._customEntityValues(customType, "daily_usage").map((entityId, entityIndex) => html`
                <div class="entity-row">
                  <ha-selector
                    label=${`Daily Usage Entity ${entityIndex + 1}`}
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${entityId}
                    @value-changed=${(e: CustomEvent) =>
                      this._setCustomTypeEntityAt(index, "daily_usage", entityIndex, e.detail.value || undefined)}
                  ></ha-selector>
                  <button
                    class="icon-button delete"
                    type="button"
                    aria-label="Delete Daily Usage Entity"
                    @click=${() => this._deleteCustomTypeEntity(index, "daily_usage", entityIndex)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </button>
                </div>
              `)}
              <button
                class="action-button inline-action"
                type="button"
                @click=${() => this._addCustomTypeEntity(index, "daily_usage")}
              >
                <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
                Add Entity
              </button>
            </div>

            <ha-selector
              label="State of Charge Entity"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${customType.soc ?? ""}
              @value-changed=${(e: CustomEvent) =>
                this._setCustomType(index, { soc: e.detail.value || undefined })}
            ></ha-selector>
            <div class="switch-row">
              <span>Custom Show when idle</span>
              <ha-switch
                .checked=${customType.show_zero ?? true}
                @change=${(e: Event) =>
                  this._setCustomType(index, {
                    show_zero: (e.target as HTMLInputElement).checked,
                  })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Zero Tolerance"
              type="number"
              min="0"
              .value=${customType.zero_tolerance != null ? String(customType.zero_tolerance) : ""}
              @change=${(e: Event) =>
                this._setCustomType(index, {
                  zero_tolerance:
                    (e.target as HTMLInputElement).value !== ""
                      ? Number((e.target as HTMLInputElement).value)
                      : undefined,
                })}
            ></ha-textfield>
            <div class="switch-row">
              <span>Subtract from Home</span>
              <ha-switch
                .checked=${customType.subtract_from_home ?? false}
                @change=${(e: Event) =>
                  this._setCustomType(index, {
                    subtract_from_home: (e.target as HTMLInputElement).checked,
                  })}
              ></ha-switch>
            </div>
            <div class="switch-row">
              <span>Show Label</span>
              <ha-switch
                .checked=${customType.show_label ?? true}
                @change=${(e: Event) =>
                  this._setCustomType(index, {
                    show_label: (e.target as HTMLInputElement).checked,
                  })}
              ></ha-switch>
            </div>
            <ha-textfield
              label="Custom Label"
              .value=${customType.label ?? ""}
              @change=${(e: Event) =>
                this._setCustomType(index, {
                  label: (e.target as HTMLInputElement).value || undefined,
                })}
            ></ha-textfield>
            <ha-selector
              label="Icon"
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${customType.icon ?? ""}
              @value-changed=${(e: CustomEvent) =>
                this._setCustomType(index, {
                  icon: e.detail.value || undefined,
                })}
            ></ha-selector>
            <ha-textfield
              label="Custom Colour"
              .value=${customType.colour ?? ""}
              @change=${(e: Event) =>
                this._setCustomType(index, {
                  colour: (e.target as HTMLInputElement).value || undefined,
                })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card-editor": HomeEnergyCardEditor;
  }
}

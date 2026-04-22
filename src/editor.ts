import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { autoDetect, mergeDetection } from "./auto-detect.js";
import {
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

  render() {
    if (!this.config) return nothing;

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

      <button class="action-button primary" type="button" @click=${() => this._addCustomType()}>
        <ha-icon class="action-icon" icon="mdi:plus"></ha-icon>
        Add Custom Type
      </button>

      ${(this.config.custom_types ?? []).map((customType, index) => html`
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

            <ha-selector
              label="Custom Import Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${customType.power_import ?? ""}
              @value-changed=${(e: CustomEvent) =>
                this._setCustomType(index, { power_import: e.detail.value || undefined })}
            ></ha-selector>

            <ha-selector
              label="Custom Export Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${customType.power_export ?? ""}
              @value-changed=${(e: CustomEvent) =>
                this._setCustomType(index, { power_export: e.detail.value || undefined })}
            ></ha-selector>

            <ha-selector
              label="Custom Combined Power"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${customType.power_combined ?? ""}
              @value-changed=${(e: CustomEvent) =>
                this._setCustomType(index, { power_combined: e.detail.value || undefined })}
            ></ha-selector>

            <ha-selector
              label="Custom Daily Usage"
              .hass=${this.hass}
              .selector=${{ entity: {} }}
              .value=${customType.daily_usage ?? ""}
              @value-changed=${(e: CustomEvent) =>
                this._setCustomType(index, { daily_usage: e.detail.value || undefined })}
            ></ha-selector>

            <ha-selector
              label="Custom State of Charge"
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

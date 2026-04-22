import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { CardConfig } from "./types.js";

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

    ha-textfield,
    ha-selector {
      display: block;
      width: 100%;
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
    this.config = config;
  }

  render() {
    if (!this.config) return nothing;

    return html`
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

      <ha-selector
        label="Custom Import Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${this.config.entity_types?.custom_1?.power_import ?? ""}
        @value-changed=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
        label="Custom Export Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${this.config.entity_types?.custom_1?.power_export ?? ""}
        @value-changed=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
        label="Custom Combined Power"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${this.config.entity_types?.custom_1?.power_combined ?? ""}
        @value-changed=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
        label="Custom Daily Usage"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${this.config.entity_types?.custom_1?.daily_usage ?? ""}
        @value-changed=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
        label="Custom State of Charge"
        .hass=${this.hass}
        .selector=${{ entity: {} }}
        .value=${this.config.entity_types?.custom_1?.soc ?? ""}
        @value-changed=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
      <div class="switch-row">
        <span>Custom Show when idle</span>
        <ha-switch
          .checked=${this.config.entity_types?.custom_1?.show_zero ?? true}
          @change=${(e: Event) =>
            this.dispatchEvent(
              new CustomEvent("config-changed", {
                detail: {
                  config: {
                    ...this.config!,
                    entity_types: {
                      ...(this.config!.entity_types ?? {}),
                      custom_1: {
                        ...(this.config!.entity_types?.custom_1 ?? {}),
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
        label="Custom Zero Tolerance"
        type="number"
        min="0"
        .value=${this.config.entity_types?.custom_1?.zero_tolerance != null ? String(this.config.entity_types?.custom_1?.zero_tolerance) : ""}
        @change=${(e: Event) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
      <ha-textfield
        label="Custom Label"
        .value=${this.config.entity_types?.custom_1?.label ?? ""}
        @change=${(e: Event) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
      <ha-textfield
        label="Custom Colour"
        .value=${this.config.entity_types?.custom_1?.colour ?? ""}
        @change=${(e: Event) =>
          this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: {
                config: {
                  ...this.config!,
                  entity_types: {
                    ...(this.config!.entity_types ?? {}),
                    custom_1: {
                      ...(this.config!.entity_types?.custom_1 ?? {}),
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card-editor": HomeEnergyCardEditor;
  }
}

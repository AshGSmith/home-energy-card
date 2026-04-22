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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card-editor": HomeEnergyCardEditor;
  }
}

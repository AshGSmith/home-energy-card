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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card-editor": HomeEnergyCardEditor;
  }
}

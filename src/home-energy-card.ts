import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./editor.js";
import "./card-header.js";
import "./flow-layout.js";
import type { CardConfig } from "./types.js";
import type { HomeAssistant } from "./flow.js";

@customElement("home-energy-card")
export class HomeEnergyCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: CardConfig;

  static styles = css`
    :host { display: block; }

    ha-card { overflow: hidden; }

    .card-body { padding: 10px 12px 14px; }
  `;

  setConfig(config: CardConfig) {
    this.config = config;
  }

  static getConfigElement() {
    return document.createElement("home-energy-card-editor");
  }

  static getStubConfig(): Partial<CardConfig> {
    return { type: "custom:home-energy-card", show_header: true };
  }

  render() {
    if (!this.config) return nothing;

    return html`
      <ha-card>
        ${this.config.show_header !== false
          ? html`
              <hec-card-header
                .hass=${this.hass}
                .config=${this.config}
              ></hec-card-header>
            `
          : nothing}
        <div class="card-body">
          <hec-flow-layout
            .hass=${this.hass}
            .config=${this.config}
          ></hec-flow-layout>
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card": HomeEnergyCard;
  }
}

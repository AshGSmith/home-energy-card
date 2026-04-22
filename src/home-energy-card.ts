import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./editor.js";
import "./card-header.js";
import "./flow-layout.js";
import { normalizeCardConfig, type CardConfig } from "./types.js";
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
    this.config = normalizeCardConfig(config);
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
        <hec-card-header
          .hass=${this.hass}
          .config=${this.config}
          .showTitle=${this.config.show_header !== false}
          .showValues=${this.config.show_header_values !== false}
        ></hec-card-header>
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
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

// Register with the HA card picker
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "home-energy-card",
  name: "Home Energy Card",
  description: "Power flow and daily energy summary for solar, battery, grid and EV.",
  preview: true,
  documentationURL: "https://github.com/AshGSmith/home-energy-card",
});

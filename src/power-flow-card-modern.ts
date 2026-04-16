import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface HomeAssistant {
  states: Record<string, { state: string; attributes: Record<string, unknown> }>;
}

interface CardConfig {
  type: string;
  title?: string;
}

@customElement("home-energy-card")
export class PowerFlowCardModern extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: CardConfig;

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      padding: 16px;
    }

    .card-header {
      font-size: 1.2em;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      border: 2px dashed var(--divider-color, #e0e0e0);
      border-radius: 8px;
      color: var(--secondary-text-color, #888);
      font-size: 0.95em;
      text-align: center;
      gap: 8px;
      flex-direction: column;
    }

    .placeholder svg {
      opacity: 0.4;
    }
  `;

  setConfig(config: CardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
  }

  static getConfigElement(): HTMLElement {
    // TODO: return a config editor element
    return document.createElement("div");
  }

  static getStubConfig(): CardConfig {
    return { type: "custom:home-energy-card", title: "Home Energy" };
  }

  render() {
    if (!this._config) return html``;

    const title = this._config.title ?? "Home Energy";

    return html`
      <ha-card>
        <div class="card-header">${title}</div>
        <div class="placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M11.5 2L2 12h3v9h5v-5h4v5h5v-9h3L11.5 2zm0 2.84L19 12h-2v7h-3v-5H8v5H5v-7H3l8.5-7.16z"
            />
          </svg>
          <span>Power Flow Card — coming soon</span>
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-energy-card": PowerFlowCardModern;
  }
}

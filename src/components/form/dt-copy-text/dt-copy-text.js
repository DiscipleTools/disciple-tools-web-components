import { css, html } from "lit";
import { styleMap } from 'lit/directives/style-map.js';
import DtBase from '../../dt-base.js';
import DtFormBase from "../dt-form-base.js";



export class DTCopyText extends DtBase {
  static get styles() {
    return css`
      :root {
        font-size: inherit;
      }

      .copy-text {
        --dt-form-text-color: #575757;
        display: flex;
        align-items: center;
        position: relative;
        width: calc(100% + 20px);
      }

      .copy-text__input {
        flex: 1;
      }

      .copy_icon {
        cursor: copy;
        font-size: 16px;
        display: block;
        transform: translate(-24px, -5px);
        width: 20px;
      }

      :host([dir="rtl"]) .copy_icon {
        transform: translate(24px, -5px);
      }
    `;
  }

  static get properties() {
    return {
      value: { type: String },
      success: { type: Boolean },
      error: { type: Boolean },
    };
  }

  get inputStyles() {
    if (this.success) {
      return {
        "--dt-text-border-color":
          "var(--copy-text-success-color, var(--success-color))",
        "--dt-form-text-color":
          "var( --copy-text-success-color, var(--success-color))",
        color: "var( --copy-text-success-color, var(--success-color))",
      };
    }
    if (this.error) {
      return {
        "---dt-text-border-color":
          "var(--copy-text-alert-color, var(--alert-color))",
        "--dt-form-text-color":
          "var(--copy-text-alert-color, var(--alert-color))",
      };
    }

    return {};
  }

  get icon() {
    return this.success ? "ic:round-check" : "ic:round-content-copy";
  }

  async copy() {
    try {
      this.success = false;
      this.error = false;
      await navigator.clipboard.writeText(this.value);
      this.success = true;
      this.error = false;
    } catch (err) {
      console.log(err);
      this.success = false;
      this.error = true;
    }
  }

  render() {
    return html`
      <div class="copy-text" style=${styleMap(this.inputStyles)}>
        <dt-text
          class="copy-text__input"
          value="${this.value}"
          disabled
        ></dt-text>
        <dt-icon
          class="copy_icon"
          icon="${this.icon}"
          @click="${this.copy}"
        ></dt-icon>
      </div>
    `;
  }
}

window.customElements.define("dt-copy-text", DTCopyText);

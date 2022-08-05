import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';

export class DtTextField extends DtFormBase {
  static get styles() {
    return css`
      input {
        color: var(--color-text, #000);

        appearance: none;
        background-color: var(--background-color, pink);
        border: 1px solid var(--color-gray, pink);
        border-radius: 0;
        -webkit-box-shadow: inset 0 1px 2px hsl(0deg 0% 4% / 10%);
        box-shadow: inset 0 1px 2px hsl(0deg 0% 4% / 10%);
        box-sizing: border-box;
        display: block;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 300;
        height: 2.5rem;
        line-height: 1.5;
        margin: 0 0 1.0666666667rem;
        padding: 0.5333333333rem;
        transition: box-shadow .5s,border-color .25s ease-in-out,-webkit-box-shadow .5s;
        width: 100%;
      }
      input:disabled, input[readonly], textarea:disabled, textarea[readonly] {
        background-color: #e6e6e6;
        cursor: not-allowed;
      }
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      id: { type: String },
      name: { type: String },
      value: {
        type: String,
        reflect: true,
      },
      disabled: { type: Boolean },
      loading: { type: Boolean },
      saved: { type: Boolean },
      onchange: { type: String },
    };
  }

  onChange(e) {
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.value,
        newValue: e.target.value,
      },
    });

    this.value = e.target.value;

    this.dispatchEvent(event);
  }

  render() {
    return html`
      ${this.labelTemplate()}

      <input
        id="${this.id}"
        name="${this.name}"
        aria-label="${this.label}"
        type="text"
        ?disabled=${this.disabled}
        class="text-input"
        .value="${this.value}"
        @change=${this.onChange}
      />
    `;
  }
}

window.customElements.define('dt-text', DtTextField);

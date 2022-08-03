import { html, css, LitElement } from 'lit';

export class DtNumberField extends LitElement {
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
      id: { type: String },
      name: { type: String },
      label: { type: String },
      value: {
        type: String,
        reflect: true,
      },
      min: { type: Number },
      max: { type: Number },
      icon: { type: String },
      disabled: { type: Boolean },
      private: { type: Boolean },
      privateLabel: { type: String },
      loading: { type: Boolean },
      saved: { type: Boolean },
      onchange: { type: String },
    };
  }

  _checkValue(value) {
    if (value < this.min || value > this.max) {
      return false;
    }

    return true;
  }

  onChange(e) {
    if (this._checkValue(e.target.value)) {
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
          newValue: e.target.value,
        },
      });

      this.value = e.target.value;
      this.dispatchEvent(event);
    } else {
      e.currentTarget.value = '';
    }
  }

  labelTemplate() {
    return html`
      <dt-label
        ?private="${this.private}"
      >
        ${this.label}
        ${this.privateLabel ? html`<span slot="private-label">${this.privateLabel}</span>` : null}
      </dt-label>
    `;
  }

  render() {
    return html`
      ${this.labelTemplate()}

      <input
        id="${this.id}"
        name="${this.name}"
        aria-label="${this.label}"
        type="number"
        ?disabled=${this.disabled}
        class="text-input"
        .value="${this.value}"
        min="${this.min}"
        max="${this.max}"
        @change=${this.onChange}
      />
    `;
  }
}

window.customElements.define('dt-number', DtNumberField);

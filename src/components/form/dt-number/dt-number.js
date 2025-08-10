import { html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import DtFormBase from '../dt-form-base.js';

export class DtNumberField extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        input {
          color: var(--dt-form-text-color, #000);
          appearance: none;
          background-color: var(--dt-form-background-color, #fff);
          border: 1px solid var(--dt-form-border-color, #ccc);
          border-radius: 0;
          box-shadow: var(
            --dt-number-box-shadow,
            var(
              --dt-form-input-box-shadow,
              inset 0 1px 2px hsl(0deg 0% 4% / 10%)
            )
          );
          box-sizing: border-box;
          display: block;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 300;
          height: 2.5rem;
          line-height: 1.5;
          margin: 0;
          padding: var(--dt-form-padding, 0.5333333333rem);
          transition: var(
            --dt-form-transition,
            box-shadow 0.5s,
            border-color 0.25s ease-in-out
          );
          width: 100%;
        }
        input:disabled,
        input[readonly],
        textarea:disabled,
        textarea[readonly] {
          background-color: var(
            --dt-number-disabled-background-color,
            var(--dt-form-disabled-background-color, #e6e6e6)
          );
          cursor: not-allowed;
        }
        input:focus-within,
        input:focus-visible {
          outline: none;
        }
        input.invalid {
          border-color: var(--dt-form-invalid-border-color, #dc3545);
        }

        .icon-overlay {
          inset-inline-end: 2.5rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      /** Value of field. Reflected back to attribute in order to select from DOM if needed. */
      value: {
        type: String,
        reflect: true,
      },
      /** Minimum allowed value */
      min: { type: Number },
      /** Maximum allowed value */
      max: { type: Number },
    };
  }

  _input(e) {
    this.value = e.target.value;
    this._setFormValue(this.value);
  }

  _validateValue(value) {
    if (value < this.min || value > this.max) {
      return false;
    }

    return true;
  }

  async _change(e) {
    if (this._validateValue(e.target.value)) {
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
          newValue: e.target.value,
        },
        bubbles: true,
        composed: true,
      });

      this.value = e.target.value;

      this._setFormValue(this.value);

      this.dispatchEvent(event);
    } else {
      e.currentTarget.value = '';
    }
  }

  implicitFormSubmit(e) {
    const keycode = e.keyCode || e.which;
    // If the Enter key is pressed, find the first button in the form and click it.
    // This replicates normal browser handling of input elements when pressing Enter
    if (keycode === 13 && this.internals.form) {
      const button = this.internals.form.querySelector('button[type=submit]');
      if (button) {
        button.click();
      }
    }
  }

  _validateRequired() {
    const { value } = this;
    if (this.required && !value) {
      this.invalid = true;
      this.internals.setValidity(
        {
          valueMissing: true,
        },
        this.requiredMessage || 'This field is required',
        this._field,
      );
    } else {
      this.invalid = false;
      this.internals.setValidity({});
    }
  }

  get classes() {
    const classes = {
      'text-input': true,
      invalid: this.touched && this.invalid,
      disabled: this.disabled,
    };
    return classes;
  }

  render() {
    return html`
      ${this.labelTemplate()}

      <div class="input-group">
        <input
          id="${this.id}"
          name="${this.name}"
          aria-label="${this.label}"
          type="number"
          ?disabled=${this.disabled}
          ?required=${this.required}
          class="${classMap(this.classes)}"
          .value="${this.value}"
          min="${ifDefined(this.min)}"
          max="${ifDefined(this.max)}"
          @change=${this._change}
          @input=${this._input}
          novalidate
          @keyup="${this.implicitFormSubmit}"
          part="input"
        />

        ${this.renderIcons()}
      </div>
    `;
  }
}

window.customElements.define('dt-number', DtNumberField);

import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtFormBase from '../dt-form-base.js';

/**
 * Dropdown list that allows selection of a single value.
 */
export class DtSingleSelect extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          position: relative;
        }

        select {
          appearance: none;
          background-color: var(--dt-form-background-color, #fefefe);
          background-image: linear-gradient(
              45deg,
              transparent 50%,
              var(--dt-single-select-text-color) 50%
            ),
            linear-gradient(
              135deg,
              var(--dt-single-select-text-color) 50%,
              transparent 50%
            );
          background-position: calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
          background-size: 5px 5px, 5px 5px, 1px 1.5em;
          background-repeat: no-repeat;
          border: 1px solid var(--dt-form-border-color, #cacaca);
          border-radius: 0;
          color: var(--dt-single-select-text-color, #0a0a0a);
          font-family: var(--font-family, sans-serif);
          font-size: 1rem;
          font-weight: 300;
          height: 2.5rem;
          line-height: 1.5;
          margin: 0;
          padding: 0.53rem;
          padding-inline-end: 1.6rem;
          transition: border-color 0.25s ease-in-out;
          transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
          box-sizing: border-box;
          width: 100%;
          text-transform: none;
        }
        select:disabled,
        select[readonly] {
          background-color: var(
            --dt-single-select-disabled-background-color,
            var(--dt-form-disabled-background-color, #e6e6e6)
          );
          cursor: not-allowed;
        }
        [dir='rtl'] select {
          background-position: 15px calc(1em + 2px), 20px calc(1em + 2px),
            2.5em 0.5em;
        }
        select.color-select {
          background-image: linear-gradient(
              45deg,
              transparent 50%,
              currentColor 50%
            ),
            linear-gradient(
              135deg,
              currentColor 50%,
              transparent 50%
            );
          background-color: var(--dt-form-border-color, #cacaca);
          border: none;
          border-radius: 10px;
          color: var(--dt-single-select-text-color-inverse, #fff);
          font-weight: 700;
          text-shadow: rgb(0 0 0 / 45%) 0 0 6px;
        }

        .icon-overlay {
          height: 2.5rem;
          inset-inline-end: 2.5rem;
        }
        select.invalid {
          border-color: var(--dt-text-border-color-alert, var(--alert-color));
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      placeholder: { type: String },
      options: { type: Array },
      value: {
        type: String,
        reflect: true,
      },
      color: {
        type: String,
        state: true,
      },
      onchange: { type: String },
    };
  }

  /**
   * Find the color for the currently selected value
   */
  updateColor() {
    if (this.value && this.options) {
      const options = this.options.filter(opt => opt.id === this.value);
      if (options && options.length) {
        this.color = options[0].color;
      }
    }
  }

  isColorSelect() {
    return (this.options || []).reduce(
      (isColor, option) => isColor || option.color,
      false
    );
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('value')) {
      this.updateColor();
    }
  }

  _change(e) {
    // Create custom event with new/old values to pass to onchange function
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.value,
        newValue: e.target.value,
      },
    });

    // update value in this component
    this.value = e.target.value;
    this._setFormValue(this.value);

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
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
        this._field
      );
    } else {
      this.invalid = false;
      this.internals.setValidity({});
    }
  }

  get classes() {
    const classes = {
      invalid: this.touched && this.invalid,
      'color-select': this.isColorSelect(),
    };
    return classes;
  }

  render() {
    return html`
      ${this.labelTemplate()}

      <div class="input-group ${this.disabled ? 'disabled' : ''}" dir="${this.RTL ? 'rtl' : 'ltr'}">
        <select
          name="${this.name}"
          aria-label="${this.name}"
          @change="${this._change}"
          class="${classMap(this.classes)}"
          style="background-color: ${this.color};"
          ?disabled="${this.disabled}"
          ?required=${this.required}
          part="select"
        >
          <option disabled selected hidden value="">${this.placeholder}</option>

          ${this.options &&
          this.options.map(
            i => html`
              <option value="${i.id}" ?selected="${i.id === this.value}">
                ${i.label}
              </option>
            `
          )}
        </select>

        ${this.renderIcons()}
      </div>
    `;
  }

  reset() {
    this._field.value = '';
    super.reset();
  }
}

window.customElements.define('dt-single-select', DtSingleSelect);

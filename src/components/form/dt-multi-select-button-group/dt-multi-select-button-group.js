import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import '../dt-button/dt-button.js';

/**
 * Select field that allows multiple values to be selected. Displayed as a group of buttons.
 */
export class DtMultiSelectButtonGroup extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          margin-bottom: 5px;
          --dt-button-font-size: 0.75rem;
          --dt-button-font-weight: 0;
          --dt-button-line-height: 1em;
          --dt-button-padding-y: 0.85em;
          --dt-button-padding-x: 1em;
        }
        span .icon {
          vertical-align: middle;
          padding: 0 2px;
        }
        .icon img {
          width: 15px !important;
          height: 15px !important;
          margin-right: 1px !important;
          vertical-align: sub;
        }
        .button-group {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 5px 10px;
        }
        dt-button {
          margin: 0px;
        }

        .icon-overlay {
          align-items: flex-start;
          padding-block: 4px;
        }

        .input-group.disabled {
          background-color: inherit;
        }
      `
    ];
  };
  //border: 1px solid var(--dt-text-border-color-alert, var(--alert-color));
  constructor() {
    super();
    this.options = [];
  }

  static get properties() {
    return {
      /** Selected value(s) */
      value: {
        type: Array,
        reflect: true
      },
      /** Button context to be used. (E.g. primary, link, alert, etc.) */
      context: { type: String },
      /** All available options for selection */
      options: { type: Array },
      /** Indicates buttons should be outlined instead of filled */
      outline: { type: Boolean },
    };
  }

  get _field() {
    return this.shadowRoot.querySelector('.input-group');
  }

  _select(value) {
    // Create custom event with new/old values to pass to onchange function
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        field: this.name,
        oldValue: this.value,
      },
    });

    // update value in this component
    if (this.value && this.value.length) {
      const selected = this.value.includes(value);

      this.value = [
        // remove previous
        ...this.value.filter(x => x !== value && x !== `-${value}`),
        selected ? `-${value}` : value,
      ]
    } else {
      // no value. initialize value prop
      this.value = [value];
    }
    event.detail.newValue = this.value;

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
    this._setFormValue(this.value);
  }

  _clickOption(e) {
    if (e?.currentTarget?.value) {
      this._select(e.currentTarget.value);
    }
  }

  _inputKeyUp(e) {
    const keycode = e.keyCode || e.which;
    switch (keycode) {
      case 13: // enter
        this._clickOption(e);
        break;
      default:
        // handle other keycodes here
        break;
    }
  }

  _renderButton(opt) {
    const isSelected = (this.value ?? []).includes(opt.id);
    const context = isSelected ? 'success' : (this.touched && this.invalid) ? 'alert' : 'inactive';
    const outline = this.outline ?? (this.touched && this.invalid);

    return html`
    <dt-button
      custom
      type="success"
      context=${context}
      .value=${opt.id}
      @click="${this._clickOption}"
      ?disabled="${this.disabled}"
      ?outline="${outline}"
      role="button"
      value="${opt.id}"
    >
      ${opt.icon
        ? html`<span class="icon"><img src="${opt.icon}" alt="${this.iconAltText}" /></span>`
        : null}
      ${opt.label}
    </dt-button>
    `;
  }

  _validateRequired() {
    const { value } = this;

    if (this.required && (!value || value.every((item) => !item || item.charAt(0) === '-'))) {
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
      'button-group': true,
      invalid: this.touched && this.invalid,
    };
    return classes;
  }

  render() {
    return html`
       ${this.labelTemplate()}
       <div class="input-group ${this.disabled ? 'disabled' : ''}">
         <div class="${classMap(this.classes)}">
           ${repeat(this.options ?? [], (opt) => opt.id, (opt) => this._renderButton(opt))}
         </div>
         ${this.touched && this.invalid
          ? html`<dt-icon
              icon="mdi:alert-circle"
              class="icon-overlay alert"
              tooltip="${this.internals.validationMessage}"
              size="2rem"
            ></dt-icon>`
          : null}
         ${this.loading
           ? html`<dt-spinner class="icon-overlay"></dt-spinner>`
           : null}
         ${this.saved
           ? html`<dt-checkmark class="icon-overlay success"></dt-checkmark>`
           : null}
         ${this.error
           ? html`<dt-icon
                  icon="mdi:alert-circle"
                  class="icon-overlay alert"
                  tooltip="${this.error}"
                  size="2rem"
                  ></dt-icon>`
           : null}
       </div>
    `;
  }
}

window.customElements.define(
  'dt-multi-select-button-group',
  DtMultiSelectButtonGroup
);

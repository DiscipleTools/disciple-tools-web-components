import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';
import { repeat } from 'lit/directives/repeat.js';
import '../dt-button/dt-button.js';

export class DtMultiSelectButtonGroup extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          margin-bottom: 5px;
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
        }
        dt-button {
          margin-block-end: 5px;
          margin-inline-end: 10px;
        }

        .icon-overlay {
          align-items: flex-start;
          padding-block: 4px;
        }
      `
    ];
  };

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
      /** Indicates button corners should be rounded */
      rounded: { type: Boolean },
    };
  }

  get classes() {
    //todo: delete this?
    const classes = {
      'dt-button': true,
      'dt-button--outline': this.outline,
      'dt-button--rounded': this.rounded,
    };
    const contextClass = `dt-button--${this.context}`;
    classes[contextClass] = true;
    return classes;
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
    if (e.target && e.target.value) {
      this._select(e.target.value);
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
    const context = isSelected ? 'success' : 'inactive';

    return html`
    <dt-button
      custom
      type="success"
      context=${context}
      .value=${opt.id}
      @click="${this._clickOption}"
      ?disabled="${this.disabled}"
      ?outline="${this.outline}"
      role="button"
      value="${opt.id}"
    >
      <span class="icon">
        ${opt.icon
          ? html`<img src="${opt.icon}" alt="${this.iconAltText}" />`
          : null}
      </span>
      ${opt.label}
    </dt-button>
    `;
  }

  render() {
    return html`
       ${this.labelTemplate()}
       <div class="input-group ${this.disabled ? 'disabled' : ''}">
         <div class="button-group">
           ${repeat(this.options ?? [], (opt) => opt.id, (opt) => this._renderButton(opt))}
         </div>
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

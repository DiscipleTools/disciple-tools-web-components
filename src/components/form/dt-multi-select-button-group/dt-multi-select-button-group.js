import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import DtFormBase from '../dt-form-base.js';
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
          margin-bottom: var(--dt-multi-select-button-group-margin-bottom, 5px);
          --dt-button-font-size: var(
            --dt-multi-select-button-group-button-font-size,
            0.75rem
          );
          --dt-button-font-weight: var(
            --dt-multi-select-button-group-button-font-weight,
            0
          );
          --dt-button-line-height: var(
            --dt-multi-select-button-group-button-line-height,
            1em
          );
          --dt-button-padding-y: var(
            --dt-multi-select-button-group-button-padding-y,
            0.85em
          );
          --dt-button-padding-x: var(
            --dt-multi-select-button-group-button-padding-x,
            1em
          );
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
          gap: var(--dt-multi-select-button-group-gap-y, 5px)
            var(--dt-multi-select-button-group-gap-x, 10px);
        }
        dt-button {
          margin: 0px;
        }

        .icon-overlay {
          padding-block: 0;
        }

        .input-group.disabled {
          background-color: inherit;
        }

        .error-container {
          margin-block-start: var(
            --dt-multi-select-button-group-error-margin-top,
            5px
          );
        }
        .invalid ~ .error-container {
          border-top-width: 1px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.options = [];
  }

  static get properties() {
    return {
      /** Selected value(s) */
      value: {
        type: Array,
        reflect: true,
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
    const oldValue = this.value;
    // Create custom event with new/old values to pass to onchange function
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        field: this.name,
        oldValue,
      },
    });

    // update value in this component
    if (this.value && this.value.length) {
      const selected = this.value.includes(value);

      this.value = [
        // remove previous
        ...this.value.filter(x => x !== value && x !== `-${value}`),
        selected ? `-${value}` : value,
      ];
    } else {
      // no value. initialize value prop
      this.value = [value];
    }
    event.detail.newValue = this.value;

    this._setFormValue(this.value);

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
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
    const context = isSelected
      ? 'success'
      : this.touched && this.invalid
        ? 'alert'
        : 'inactive';
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
        part="button"
      >
        ${opt.icon
          ? html`<span class="icon"
              ><img src="${opt.icon}" alt="${this.iconAltText}"
            /></span>`
          : null}
        ${opt.label}
      </dt-button>
    `;
  }

  _validateRequired() {
    const { value } = this;

    if (
      this.required &&
      (!value || value.every(item => !item || item.charAt(0) === '-'))
    ) {
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
      'button-group': true,
      invalid: this.touched && this.invalid,
    };
    return classes;
  }

  render() {
    return html`
      ${this.labelTemplate()}
      <div
        class="input-group ${this.disabled ? 'disabled' : ''}"
        part="input-group"
      >
        <div class="${classMap(this.classes)}" part="button-group">
          ${repeat(
            this.options ?? [],
            opt => opt.id,
            opt => this._renderButton(opt),
          )}
        </div>
        ${this.renderIcons()}
      </div>
    `;
  }
}

window.customElements.define(
  'dt-multi-select-button-group',
  DtMultiSelectButtonGroup,
);

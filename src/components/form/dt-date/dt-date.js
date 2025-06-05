import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Basic date component
 */
export class DtDate extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        input {
          color: var(--dt-form-text-color, #000);
          appearance: none;
          background-color: var(--dt-form-background-color, #cecece);
          border: 1px solid var(--dt-form-border-color, #cacaca);
          border-radius: 0;
          box-shadow: var(
            --dt-form-input-box-shadow,
            inset 0 1px 2px hsl(0deg 0% 4% / 10%)
          );
          box-sizing: border-box;
          display: inline-flex;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 300;
          height: 2.5rem;
          line-height: 1.5;
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
        textarea[readonly],
        .input-group button:disabled {
          background-color: var(--dt-form-disabled-background-color, #e6e6e6);
          cursor: not-allowed;
        }

        /* input::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; } */
        input::-webkit-calendar-picker-indicator {
          color: red;
        }

        .input-group {
          position: relative;
          display: flex;
          width: 100%;
        }

        .input-group .input-group-button {
          font-size: 0.75rem;
          line-height: 1em;
          display: inline-flex;
        }
        .input-group .button {
          display: inline-block;
          background: var(--dt-form-background-color, #cecece);
          border: 1px solid var(--dt-form-border-color, #cecece);
          color: var(--alert-color, #cc4b37);
          align-self: stretch;
          font-size: 1rem;
          height: auto;
          padding: 0 1em;
          margin: 0;
        }
        .input-group .button:hover:not([disabled]) {
          background-color: var(--alert-color, #cc4b37);
          color: var(--text-color-inverse, #fefefe);
        }

        .icon-overlay {
          inset-inline-end: 4rem;
        }
        input.invalid {
          border-color: var(--dt-text-border-color-alert, var(--alert-color));
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      id: { type: String },
      value: {
        type: String,
        reflect: true,
      },
      timestamp: {
        converter: date => {
          let JStimestamp = Number(date);
          if (JStimestamp < 1000000000000) {
            JStimestamp *= 1000;
          }
          if (JStimestamp) return JStimestamp;
          return undefined;
        },
        reflect: true,
      },
    };
  }

  // _convertArabicToEnglishNumbers() {
  //   this.value
  //   .replace(/[\u0660-\u0669]/g, (c) => { return c.charCodeAt(0) - 0x0660; })
  //     .replace(/[\u06f0-\u06f9]/g, (c) => {
  //       return c.charCodeAt(0) - 0x06f0;
  //     });
  // }

  updateTimestamp(value) {
    const timestampMilliseconds = new Date(value).getTime();
    const timestampSecond = timestampMilliseconds / 1000;
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.timestamp,
        newValue: timestampSecond,
      },
    });

    this.timestamp = timestampMilliseconds;
    this.value = value;
    this._setFormValue(value);
    this.dispatchEvent(event);
  }

  _change(e) {
    this.updateTimestamp(e.target.value);
  }

  clearInput() {
    this.updateTimestamp('');
  }

  showDatePicker() {
    const input = this.shadowRoot.querySelector('input');
    input.showPicker();
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
      'input-group-field': true,
      'dt_date_picker': true,
      invalid: this.touched && this.invalid,
    };
    return classes;
  }

  render() {
    if (this.timestamp) {
      this.value = new Date(this.timestamp).toISOString().substring(0, 10);
    } else if (this.value) {
      this.timestamp = new Date(this.value).getTime();
    }

    return html`
      ${this.labelTemplate()}

      <div class="input-group">
        <input
          id="${this.id}"
          class="${classMap(this.classes)}"
          type="date"
          autocomplete="off"
          .placeholder="${new Date().toISOString().substring(0, 10)}"
          .value="${this.value}"
          .timestamp="${this.date}"
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change="${this._change}"
          @click="${this.showDatePicker}"
        />
        <button
          id="${this.id}-clear-button"
          class="button alert clear-date-button"
          data-inputid="${this.id}"
          title="Delete Date"
          type="button"
          ?disabled=${this.disabled}
          @click="${this.clearInput}"
        >
          x
        </button>

        ${this.touched && this.invalid
          ? html`<dt-icon
              icon="mdi:alert-circle"
              class="icon-overlay alert"
              tooltip="${this.internals.validationMessage}"
              size="2rem"
            ></dt-icon>`
          : null}
        ${this.error
          ? html`<dt-icon
              icon="mdi:alert-circle"
              class="icon-overlay alert"
              tooltip="${this.error}"
              size="2rem"
            ></dt-icon>`
          : null}
        ${this.loading
          ? html`<dt-spinner class="icon-overlay"></dt-spinner>`
          : null}
        ${this.saved
          ? html`<dt-checkmark class="icon-overlay success"></dt-checkmark>`
          : null}
      </div>
    `;
  }
}

window.customElements.define('dt-date', DtDate);

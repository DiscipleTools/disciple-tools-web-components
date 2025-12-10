import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtFormBase from '../dt-form-base.js';

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
          border-radius: var(--dt-date-border-radius, 0);
          box-shadow: var(
            --dt-date-box-shadow,
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
        }
        input:disabled,
        input[readonly],
        textarea:disabled,
        textarea[readonly],
        .input-group button:disabled {
          background-color: var(
            --dt-date-disabled-background-color,
            var(--dt-form-disabled-background-color, #e6e6e6)
          );
          cursor: not-allowed;
        }
        input.disabled {
          color: var(--dt-text-placeholder-color, #999);
        }
        input:focus-within,
        input:focus-visible {
          outline: none;
        }
        input::placeholder {
          color: var(--dt-date-placeholder-color, #999);
          text-transform: var(--dt-date-placeholder-transform, none);
          font-size: var(--dt-date-placeholder-font-size, 1rem);
          font-weight: var(--dt-date-placeholder-font-weight, 400);
          letter-spacing: var(--dt-date-placeholder-letter-spacing, normal);
        }
        .invalid,
        .field-container.invalid .input-addon {
          border-color: var(--dt-date-border-color-alert, var(--alert-color));
        }
      `,
      css`
        .field-container {
          display: flex;
        }
        .field-container input {
          flex-grow: 1;
        }
        .field-container .input-addon {
          flex-shrink: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
          padding: 10px;
          border: solid 1px gray;
          border-collapse: collapse;
          background-color: var(
            --dt-date-background-color,
            var(--dt-form-background-color, buttonface)
          );
          border: 1px solid
            var(--dt-date-border-color, var(--dt-form-border-color, #fefefe));
          border-radius: var(--dt-date-border-radius, 0);
          box-shadow: var(
            --dt-date-box-shadow,
            var(
              --dt-form-input-box-shadow,
              inset 0 1px 2px hsl(0deg 0% 4% / 10%)
            )
          );
        }

        .input-addon:disabled {
          background-color: var(--dt-form-disabled-background-color);
          color: var(--dt-date-placeholder-color, #999);
        }
        .input-addon:disabled:hover {
          background-color: var(--dt-form-disabled-background-color);
          color: var(--dt-date-placeholder-color, #999);
          cursor: not-allowed;
        }

        .input-addon.btn-clear {
          height: 2.5rem;
          color: var(--alert-color, #cc4b37);
          &:disabled {
            color: var(--dt-date-placeholder-color, #999);
          }
          &:hover:not([disabled]) {
            background-color: var(--alert-color, #cc4b37);
            color: var(--dt-date-button-hover-color, #ffffff);
          }
        }

        .icon-overlay {
          inset-inline-end: 5rem;
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
      /** Timestamp value of field. Reflected back to attribute in order to select from DOM if needed. */
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
  get fieldContainerClasses() {
    return {
      'field-container': true,
      invalid: this.touched && this.invalid,
    };
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
        <div class="${classMap(this.fieldContainerClasses)}">
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
            novalidate
            @click="${this.showDatePicker}"
            part="input"
          />
          <button
            class="input-addon btn-clear"
            @click="${this.clearInput}"
            data-inputid="${this.id}"
            ?disabled=${this.disabled}
            part="clear-button"
            aria-label="Clear date"
          >
            <dt-icon icon="mdi:close"></dt-icon>
          </button>
        </div>

        ${this.renderIcons()}
      </div>
    `;
  }

  reset() {
    this.updateTimestamp('');
    super.reset();
  }
}

window.customElements.define('dt-date', DtDate);

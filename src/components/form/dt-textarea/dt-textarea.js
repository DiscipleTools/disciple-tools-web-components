import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtFormBase from '../dt-form-base.js';

/**
 * Multi-line text input
 */
export class DtTextArea extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        textarea {
          color: var(
            --dt-textarea-text-color,
            var(--dt-form-text-color, #0a0a0a)
          );
          appearance: none;
          background-color: var(
            --dt-textarea-background-color,
            var(--dt-form-background-color, #fefefe)
          );
          border: 1px solid
            var(
              --dt-textarea-border-color,
              var(--dt-form-border-color, #cecece)
            );
          border-radius: 3px;
          box-shadow: var(
            --dt-textarea-input-box-shadow,
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
          height: 10rem;
          line-height: 1.5;
          margin: 0;
          padding: var(--dt-form-padding, 0.5333333333rem);
          transition: var(
            --dt-form-transition,
            box-shadow 0.5s,
            border-color 0.25s ease-in-out
          );
          position: relative;
          outline: 0;
          resize: none;
          width: 100%;
        }
        input:disabled,
        input[readonly],
        textarea:disabled,
        textarea[readonly] {
          background-color: var(
            --dt-textarea-disabled-background-color,
            var(--dt-form-disabled-background-color, #e6e6e6)
          );
          cursor: not-allowed;
        }

        textarea.invalid {
          border-color: var(
            --dt-textarea-border-color-alert,
            var(--dt-form-border-color-alert, var(--alert-color))
          );
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      /** Element ID */
      id: { type: String },
      /** Value of field. Reflected back to attribute in order to select from DOM if needed. */
      value: {
        type: String,
        reflect: true,
      },
    };
  }

  _input(e) {
    this.value = e.target.value;
    this._setFormValue(this.value);
  }

  _change(e) {
    const { value } = this;
    const newValue = e.target.value;

    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        field: this.name,
        oldValue: value,
        newValue,
      },
    });

    this.value = newValue;

    this._setFormValue(this.value);

    this.dispatchEvent(event);
  }

  _validateRequired() {
    const { value } = this;

    if (!value && this.required) {
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
    };
    return classes;
  }

  render() {
    return html`
      ${this.labelTemplate()}

      <div class="input-group">
        <textarea
          id="${this.id}"
          name="${this.name}"
          aria-label="${this.label}"
          ?disabled=${this.disabled}
          ?required=${this.required}
          class="${classMap(this.classes)}"
          .value="${this.value || ''}"
          @change=${this._change}
          @input=${this._input}
          part="textarea"
        ></textarea>

        ${this.renderIcons()}
      </div>
    `;
  }
}

window.customElements.define('dt-textarea', DtTextArea);

import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtFormBase from '../dt-form-base.js';
import '../../icons/dt-spinner.js';
import '../../icons/dt-checkmark.js';
import '../../icons/dt-exclamation-circle.js';

export class DtTextArea extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        textarea {
          color: var(--dt-textarea-text-color, #0a0a0a);
          appearance: none;
          background-color: var(--dt-textarea-background-color, #fefefe);
          border: 1px solid var(--dt-textarea-border-color, #cecece);
          border-radius: 3px;
          box-shadow: var(
            --dt-textarea-input-box-shadow,
            inset 0 1px 2px hsl(0deg 0% 4% / 10%)
          );
          box-sizing: border-box;
          display: block;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 300;
          height: 10rem;
          line-height: 1.5;
          margin: 0 0 1.0666666667rem;
          padding: var(--dt-form-padding, 0.5333333333rem);
          transition: var(
            --dt-form-transition,
            box-shadow 0.5s,
            border-color 0.25s ease-in-out
          );
          overflow: hidden;
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
            #e6e6e6
          );
          cursor: not-allowed;
        }

        .icon-overlay {
          align-items: flex-start;
          padding-block: 1rem;
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
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        field: this.name,
        oldValue: this.value,
        newValue: e.target.value,
      },
    });

    this.value = e.target.value;

    this._setFormValue(this.value);

    this.dispatchEvent(event);
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
          class="${classMap(this.classes)}"
          .value="${this.value || ''}"
          @change=${this._change}
          @input=${this._input}
        ></textarea>

        ${this.touched && this.invalid
          ? html`<dt-exclamation-circle
              class="icon-overlay alert"
            ></dt-exclamation-circle>`
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

window.customElements.define('dt-textarea', DtTextArea);

import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';

export class DtToggle extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: inline-block;
        }

        .toggle {
          position: relative;
          display: flex;
          align-items: center;
          padding-top: 0.5rem;
          cursor: pointer;
          width: fit-content;
        }

        button.toggle {
          border: 0;
          background-color: transparent;
          font: inherit;
        }

        .toggle-input {
          position: absolute;
          opacity: 0;
          width: fit-content;
          height: 100%;
        }

        .toggle-display {
          --offset: 2px;
          --diameter: 1em;

          display: inline-flex;
          align-items: center;
          justify-content: space-around;
          box-sizing: content-box;
          width: calc(var(--diameter) * 2 + var(--offset) * 2);
          height: calc(var(--diameter) + var(--offset) * 2);
          border: 0.1em solid rgb(0 0 0 / 0.2);
          position: relative;
          border-radius: 100vw;
          background-color: var(
            --dt-toggle-background-color-off,
            var(--gray-2)
          );
          transition: 250ms;
        }

        .toggle-display::before {
          content: '';
          z-index: 2;
          position: absolute;
          top: 50%;
          left: var(--offset);
          box-sizing: border-box;
          width: var(--diameter);
          height: var(--diameter);
          border-radius: 50%;
          background-color: white;
          transform: translate(0, -50%);
          will-change: transform;
          transition: inherit;
        }

        .toggle:focus .toggle-display,
        .toggle-input:focus + .toggle-display {
          outline: 1px dotted #212121;
          outline: 1px auto -webkit-focus-ring-color;
          outline-offset: 2px;
        }

        .toggle:focus,
        .toggle:focus:not(:focus-visible) .toggle-display,
        .toggle-input:focus:not(:focus-visible) + .toggle-display {
          outline: 0;
        }

        .toggle[aria-pressed='true'] .toggle-display,
        .toggle-input:checked + .toggle-display {
          background-color: var(--primary-color);
        }

        .toggle[aria-pressed='true'] .toggle-display::before,
        .toggle-input:checked + .toggle-display::before {
          transform: translate(100%, -50%);
        }

        .toggle[disabled] .toggle-display,
        .toggle-input:disabled + .toggle-display {
          opacity: 0.6;
          filter: grayscale(40%);
          cursor: not-allowed;
        }
        [dir='rtl'] .toggle-display::before {
          left: auto;
          right: var(--offset);
        }

        [dir='rtl'] .toggle[aria-pressed='true'] + .toggle-display::before,
        [dir='rtl'] .toggle-input:checked + .toggle-display::before {
          transform: translate(-100%, -50%);
        }

        .toggle-icon {
          display: inline-block;
          width: 1em;
          height: 1em;
          color: inherit;
          fill: currentcolor;
          vertical-align: middle;
          overflow: hidden;
        }

        .toggle-icon--cross {
          color: var(--alert-color);
          font-size: 0.55em;
        }

        .toggle-icon--checkmark {
          font-size: 0.65em;
          color: var(--success-color);
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      id: { type: String },
      checked: {
        type: Boolean,
        reflect: true,
      },
      icons: { type: Boolean, default: false },
    };
  }

  constructor() {
    super();
    this.icons = false;
  }

  onChange(e) {
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.checked,
        newValue: e.target.checked,
      },
    });
    this.checked = e.target.checked;

    console.log(this.checked);
    this._setFormValue(this.checked);
    console.log(event);
    this.dispatchEvent(event);
  }

  render() {
    // prettier-ignore
    const check = html`<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="toggle-icon toggle-icon--checkmark"><path d="M6.08471 10.6237L2.29164 6.83059L1 8.11313L6.08471 13.1978L17 2.28255L15.7175 1L6.08471 10.6237Z" fill="currentcolor" stroke="currentcolor" /></svg>`
    // prettier-ignore
    const cross = html`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="toggle-icon toggle-icon--cross"><path d="M11.167 0L6.5 4.667L1.833 0L0 1.833L4.667 6.5L0 11.167L1.833 13L6.5 8.333L11.167 13L13 11.167L8.333 6.5L13 1.833L11.167 0Z" fill="currentcolor" /></svg>`
    return html`
      ${this.labelTemplate()}

      <label class="toggle" for="${this.id}" aria-label="${this.label}">
        <input
          type="checkbox"
          name="${this.name}"
          id="${this.id}"
          class="toggle-input"
          ?checked=${this.checked}
          @click=${this.onChange}
          ?disabled=${this.disabled}
        />
        <span class="toggle-display" hidden>
          ${this.icons ? html` ${check} ${cross} ` : html``}
        </span>
      </label>
    `;
  }
}

window.customElements.define('dt-toggle', DtToggle);

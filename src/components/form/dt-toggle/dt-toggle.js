import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';

export class DtToggle extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        .root {
          display: block;
        }

        .toggle-wrapper {
          display: flex; /* Aligns children (label and icons) horizontally */
          align-items: center; /* Vertically aligns children */
          gap: 1ch; /* Adds a small gap between the label and the icons */
        }

        .toggle {
          position: relative;
          flex-wrap: wrap;
          display: flex;
          align-items: center;
          width: fit-content;
          cursor: pointer;
          min-height: var(
            --dt-toggle-input-height,
            var(--dt-form-input-height, 2.5rem)
          );
        }

        .icon-overlay {
          inset-inline-end: 0.5rem;
          align-items: center;
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
          border: 0.1em solid var(--dt-toggle-border-color, rgb(0 0 0 / 0.2));
          position: relative;
          border-radius: 100vw;
          background-color: var(
            --dt-toggle-background-color-off,
            var(--dt-form-background-color-off, #e6e6e6)
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
          background-color: var(--dt-toggle-handle-color, white);
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
          background-color: var(
            --dt-toggle-background-color-on,
            var(--dt-form-primary-color, var(--primary-color))
          );
        }

        .toggle[aria-pressed='true'] .toggle-display::before,
        .toggle-input:checked + .toggle-display::before {
          transform: translate(100%, -50%);
        }

        .toggle[disabled] .toggle-display,
        .toggle-input:disabled + .toggle-display {
          opacity: var(--dt-toggle-disabled-opacity, 0.6);
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
          color: var(--dt-toggle-icon-color-off, var(--alert-color));
          font-size: 0.55em;
        }

        .toggle-icon--checkmark {
          font-size: 0.65em;
          color: var(--dt-toggle-icon-color-on, var(--success-color));
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

  firstUpdated() {
    if (this.checked === undefined) {
      this.checked = false;
    }

    const initialFormValue = this.checked ? '1' : '0';
    this._setFormValue(initialFormValue);

    this.value = this.checked;
  }

  onChange(e) {
    const newValue = e.target.checked;
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        field: this.name,
        oldValue: this.checked,
        newValue,
      },
    });
    this.checked = newValue;

    this.value = newValue;

    this._setFormValue(this.checked ? '1' : '0');

    this.dispatchEvent(event);
  }

  onClickToggle(e) {
    e.preventDefault();
    // When dt-toggle is nested in the health circle,
    // clicks on the toggle icon will not trigger the input click event.
    // This is a workaround to ensure the input is clicked when the toggle icon is clicked.
    const target = e.target.closest('label').querySelector('input');
    target.click();
  }

  render() {
    // prettier-ignore
    const check = html`<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="toggle-icon toggle-icon--checkmark"><path d="M6.08471 10.6237L2.29164 6.83059L1 8.11313L6.08471 13.1978L17 2.28255L15.7175 1L6.08471 10.6237Z" fill="currentcolor" stroke="currentcolor" /></svg>`
    // prettier-ignore
    const cross = html`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="toggle-icon toggle-icon--cross"><path d="M11.167 0L6.5 4.667L1.833 0L0 1.833L4.667 6.5L0 11.167L1.833 13L6.5 8.333L11.167 13L13 11.167L8.333 6.5L13 1.833L11.167 0Z" fill="currentcolor" /></svg>`
    return html`
      <div class="root" part="root">
        ${this.labelTemplate()}

        <div class="input-group">
          <label
            class="toggle"
            for="${this.id}"
            aria-label="${this.label}"
            part="toggle"
          >
            <input
              type="checkbox"
              name="${this.name}"
              id="${this.id}"
              class="toggle-input"
              .checked=${this.checked || 0}
              @click=${this.onChange}
              ?disabled=${this.disabled}
            />
            <span class="toggle-display" @click=${this.onClickToggle}>
              ${this.icons ? html` ${check} ${cross} ` : html``}
            </span>
          </label>
          ${this.renderIcons()}
        </div>
      </div>
    `;
  }
}

window.customElements.define('dt-toggle', DtToggle);

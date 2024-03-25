import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { msg } from '@lit/localize';
import DtFormBase from '../dt-form-base.js';
import '../../icons/dt-spinner.js';
import '../../icons/dt-checkmark.js';

export class DtButtonGroup extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          position: relative;
          font-family: Helvetica, Arial, sans-serif;
        }
        .select-button {
          border-radius: 5px;
          margin-right: 5px;
          margin-bottom: 5px;
        }
        .select-button:hover {
          background-color: #4CAF50;
          opacity: .5;
          color: white;
        }
        .select-button[disabled] {
          background-color: #eee;
          color: black;
        }
        .empty-select-button {
          background-color: #eee;
          color: black;
        }
        .empty-select-button:focus {
            background-color: #eee;
            color:black;
        }
        .selected-select-button {
          background-color: #4CAF50;
          color: white;
        }
        .selected-select-button:focus {
          background-color: #4CAF50;
          color:white;
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      options: { type: Array },
      value: {
        type: Array,
        reflect: true,
      }
    };
  }

  constructor() {
    super();
    this.loading = false;
    this.saved = false;
    this.error = "";
    this.value = [];
  }


  _clickOption(e) {
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.value,
      },
    });

    if (e?.target?.className?.includes('selected-select-button')) {
      this.value = this.value.filter(v=>v !== e.target.value);
    } else if (e.target && e.target.value) {
      this.value = [...this.value || [], e.target.value];
    }
    event.detail.newValue = this.value
    this.dispatchEvent(event);
    this._setFormValue(this.value);
  }

  render() {
    return html`
      ${this.labelTemplate()}

      <div class="button-group">
        
          ${(this.options || []).map(opt=>
            html`<button
                value="${opt.id}"
                type="button"
                class="select-button ${ this.value && this.value.indexOf(opt.id) > -1 ? 'selected-select-button' : 'empty-select-button'}"
                @click="${this._clickOption}"
                ?disabled="${this.disabled}"
            >${opt.label}</button>`
          )}
          
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

window.customElements.define('dt-button-group', DtButtonGroup);

import { html } from 'lit';
import { DtDate } from '../dt-date/dt-date.js';

export class DtDatetime extends DtDate {
  static get properties() {
    return {
      ...super.properties,
      tzoffset: { type: Number },
    };
  }

  constructor() {
    super();
    this.tzoffset = (new Date()).getTimezoneOffset() * 60000;
  }

  render() {
    if (this.timestamp) {
      this.value = new Date(this.timestamp - this.tzoffset).toISOString().substring(0, 16);
    } else if (this.value) {
      this.timestamp = new Date(this.value).getTime();
    }

    return html`
      ${this.labelTemplate()}

      <div class="input-group">
        <input
          id="${this.id}"
          class="input-group-field dt_date_picker"
          type="datetime-local"
          autocomplete="off"
          .placeholder="${new Date().toISOString()}"
          .value="${this.value}"
          .timestamp="${this.date}"
          ?disabled=${this.disabled}
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

        ${(this.touched && this.invalid) || this.error
          ? html`<dt-exclamation-circle
              class="icon-overlay alert"
            ></dt-exclamation-circle>`
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

  window.customElements.define('dt-datetime', DtDatetime);

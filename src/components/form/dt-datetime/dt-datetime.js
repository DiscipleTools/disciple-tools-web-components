import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { DtDate } from '../dt-date/dt-date.js';

export class DtDatetime extends DtDate {
  static get styles() {
    return [
      ...super.styles,
      css`
        input[type='datetime-local'] {
          max-width: calc(100% - 22px - 1rem);
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      tzoffset: { type: Number },
    };
  }

  constructor() {
    super();
    this.tzoffset = new Date().getTimezoneOffset() * 60000;
  }

  render() {
    if (this.timestamp) {
      this.value = new Date(this.timestamp - this.tzoffset)
        .toISOString()
        .substring(0, 16);
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
            type="datetime-local"
            autocomplete="off"
            .placeholder="${new Date().toISOString()}"
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
          >
            <dt-icon icon="mdi:close"></dt-icon>
          </button>
        </div>

        ${this.renderIcons()}
      </div>
    `;
  }
}

window.customElements.define('dt-datetime', DtDatetime);

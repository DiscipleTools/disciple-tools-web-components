import { html, css, LitElement } from 'lit';

export class DtDateField extends LitElement {
  static get styles() {
    return css`
      input {
        color: var(--color-text, #000);

        appearance: none;
        background-color: var(--background-color, pink);
        border: 1px solid var(--color-gray, pink);
        border-radius: 0;
        -webkit-box-shadow: inset 0 1px 2px hsl(0deg 0% 4% / 10%);
        box-shadow: inset 0 1px 2px hsl(0deg 0% 4% / 10%);
        box-sizing: border-box;
        display: block;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 300;
        height: 2.5rem;
        line-height: 1.5;
        margin: 0 0 1.0666666667rem;
        padding: 0.5333333333rem;
        transition: box-shadow .5s,border-color .25s ease-in-out,-webkit-box-shadow .5s;
        width: 100%;
      }
      input:disabled, input[readonly], textarea:disabled, textarea[readonly] {
        background-color: #e6e6e6;
        cursor: not-allowed;
      }
    `;
  }

  static get properties() {
    return {
      id: { type: String },
      name: { type: String },
      label: { type: String },
      value: {
        type: String,
       reflect: true,
     },
      timestamp: {
        converter: (date) => {
        let JStimestamp = Number(date);
        if (JStimestamp < 1000000000000) {
          JStimestamp *= 1000
        }
        if(JStimestamp) return JStimestamp;
        return undefined;
        },
        reflect: true
      },
      icon: { type: String },
      disabled: { type: Boolean },
      private: { type: Boolean },
      privateLabel: { type: String },
      loading: { type: Boolean },
      saved: { type: Boolean },
      onchange: { type: String },
    };
  }

  // _convertArabicToEnglishNumbers() {
  //   this.value
  //   .replace(/[\u0660-\u0669]/g, (c) => { return c.charCodeAt(0) - 0x0660; })
  //     .replace(/[\u06f0-\u06f9]/g, (c) => {
  //       return c.charCodeAt(0) - 0x06f0;
  //     });
  // }

  updateTimestamp(timestamp) {
    let timestampSecond = '';
    let timestampMilliseconds = '';
    if (typeof timestamp === 'number') {
      timestampMilliseconds = new Date(timestamp).getTime();
      timestampSecond = timestampMilliseconds/1000;
    }
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.timestamp,
        newValue: timestampSecond,
      },
    });

    this.dispatchEvent(event);
    this.timestamp = timestampMilliseconds
    this.value = timestamp;
  }

  onChange(e) {
    this.updateTimestamp(e.target.value);
  }

  clearInput() {
    this.updateTimestamp('');
  }

  labelTemplate() {
    return html`
      <dt-label
        ?private="${this.private}"
      >
        ${this.label}
        ${this.privateLabel ? html`<span slot="private-label">${this.privateLabel}</span>` : null}
      </dt-label>
    `;
  }

  render() {
    if (this.timestamp) {
      this.value = new Date(this.timestamp).toISOString().substring(0,10);
    } else if (this.value) {
      this.timestamp = new Date(this.value).getTime();
    }

    return html`
      ${this.labelTemplate()}

      <div class="input-group">
          <input
            id="${this.id}"
            class="input-group-field dt_date_picker"
            type="date"
            autocomplete="off"
            .placeholder="${new Date().toISOString().substring(0,10)}"
            .value="${this.value}"
            .timestamp="${this.date}"
            ?disabled=${this.disabled}
            @change="${this.onChange}"
          />
          <div class="input-group-button">
            <button
                id="${this.id}-clear-button"
                class="button alert clear-date-button"
                data-inputid="${this.id}"
                title="Delete Date"
                type="button"
                @click="${this.clearInput}">
                x
            </button>
          </div>
      </div>
    `;
  }
}

window.customElements.define('dt-date', DtDateField);

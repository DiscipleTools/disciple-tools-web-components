import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { DtText } from '../dt-text/dt-text.js';

export class DtCommChannel extends DtText {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
        }
       .label-wrapper {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          align-items: center;
       }
        .add-btn {
          color: var(--dt-comm-channel-add-btn-color, var(--success-color));
          height: 1.75rem;
          margin: 0 1rem
        }
        .input-group {
          width: 100%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      value: { type: Array, reflect: true }
    };
  }

  _addClick() {
    console.log('add click');
    console.log(this.value);
    this.value.push({
      verified: false,
      value: '',
      key: `new-${this.name}`
    });
    this.requestUpdate();
  }

  labelTemplate() {
    if (!this.label) {
      return '';
    }

    return html`
      <dt-label
        ?private=${this.private}
        privateLabel="${this.privateLabel}"
        iconAltText="${this.iconAltText}"
        icon="${this.icon}"
      >
        ${!this.icon
          ? html`<slot name="icon-start" slot="icon-start"></slot>`
          : null}
        ${this.label}
      </dt-label>
      <svg class="add-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4z" @click=${this._addClick}></svg>
    `;
  }

  _inputFieldTemplate(item) {
    return html`
      <div class="input-group">
        <input
          id="${item.key}"
          name="${this.name}"
          aria-label="${this.label}"
          type="${this.type || 'text'}"
          placeholder="${this.placeholder}"
          ?disabled=${this.disabled}
          ?required=${this.required}
          class="${classMap(this.classes)}"
          .value="${item.value || ''}"
          @change=${this._change}
          novalidate
          @keyup="${this.implicitFormSubmit}"
        />

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

  _setFormValue(value) {
    super._setFormValue(value);
    this.internals.setFormValue(JSON.stringify(value));
  }

  _change(e) {
    const key = e.target.id;
    const {value} = e.target;
    const newValue = this.value;

    this.value.find((o, i) => {
      if (o.key === key) {
          newValue[i] = { verified: false, value, key };
          return true; // stop searching
      }
      return false;
    });

    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.value,
        newValue,
      },
    });

    this.value = newValue;
    console.log(this.value);

    this._setFormValue(this.value);

    this.dispatchEvent(event);
  }

  _renderInputFields() {
    if (!this.value) {
      return this._inputFieldTemplate({});
    }
    return html`
      ${this.value.map((item) =>
        this._inputFieldTemplate(item)
      )}
    `;
  }

  render() {
    return html`
     <div class="label-wrapper">
        ${this.labelTemplate()}
      </div>
      ${this._renderInputFields()}
    `;
  }
}

window.customElements.define('dt-comm-channel', DtCommChannel);

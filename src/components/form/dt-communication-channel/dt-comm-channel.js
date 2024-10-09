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
          background-color: transparent;
          border: none;
       }
        .add-icon {
          color: var(--dt-comm-channel-add-btn-color, var(--success-color));
          height: 1.75rem;
          margin: 0 1rem
        }
        .input-group {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        .input-group li {
          display: flex;
          width: 100%;
          flex-direction: row;
          align-content: center;
          justify-content: center;
          align-items: center;
        }
        #path0_fill {
          fill: red;
        }

        .delete-button {
          background-color: transparent;
          border: none;
        }

        .delete-button svg {
          width: 1.5em;
          height: 1.5em;
          cursor: pointer;
        }

        .icon-overlay {
          inset-inline-end: 3rem;
          top: -15%;
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
    const newValue = {
      verified: false,
      value: '',
      key: `new-${this.name}-${Math.floor(Math.random() * 100)}`
    };
    this.value = [...this.value, newValue];
    this.requestUpdate();
  }

  _deleteField(item) {
    const index = this.value.findIndex(currentItem => currentItem.key === item.key);
    if (index !== -1) {
      this.value.splice(index, 1);
    }
    this.value = [...this.value];

     // alter the item object for covertValue function
     const { verified, value, ...itemToDispatch } = item;
     const newItem = {...itemToDispatch, delete:true};

     // Event to bind with cross button of comm-channel
      const removeEvent = new CustomEvent('change', {
       detail: {
         field: this.name,
         oldValue:newItem,
         newValue: this.value,
       },
     });
     this.dispatchEvent(removeEvent);
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
      <button class="add-btn" @click=${this._addClick}>
        <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4z"></svg>
      </button>
    `;
  }

  _inputFieldTemplate(item) {
    const isFirstItem = item.key === `new-${this.name}-0`;
    const deleteButton = !isFirstItem ? html`
      <button class="delete-button"  @click=${() => this._deleteField(item)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path
            id="path0_fill"
            fill-rule="evenodd"
            d="M 14 7C 14 10.866 10.866 14 7 14C 3.13403 14 0 10.866 0 7C 0 3.13401 3.13403 0 7 0C 10.866 0 14 3.13401 14 7ZM 9.51294 3.51299L 7 6.01299L 4.48706 3.51299L 3.5 4.49999L 6.01294 6.99999L 3.5 9.49999L 4.48706 10.487L 7 7.98699L 9.5 10.5L 10.4871 9.51299L 7.98706 6.99999L 10.5 4.49999L 9.51294 3.51299Z"
          />
        </svg>
      </button>
  ` : '';
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
        ${deleteButton}

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

  // update the value comming from API
  _setFormValue(value) {
    super._setFormValue(value);
    this.internals.setFormValue(JSON.stringify(value));
    this.value = value;
    this.requestUpdate();
  }

  _change(e) {
    const key = e.target.id;
    const { value } = e.target;
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
        onSuccess: result => {
          if (result) {
            this._setFormValue(result[this.name]);
          }
        },
      },
    });
    this.value = newValue;
    this._setFormValue(this.value);

    this.dispatchEvent(event);
  }

  // rendering the input at 0 index
  _renderInputFields() {
    if ((this.value == null || !(this.value.length))) {
      this.value = [{
        verified: false,
        value: '',
        key: `new-${this.name}-0`
      }];

      // initializing with 0 so that delete button does comes in
      return this._inputFieldTemplate(this.value[0]);
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

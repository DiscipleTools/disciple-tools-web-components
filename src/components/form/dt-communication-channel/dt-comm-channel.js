import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import '../../icons/dt-icon.js';
import { DtText } from '../dt-text/dt-text.js';

export class DtCommChannel extends DtText {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
        }
        input {
          color: var(--dt-form-text-color, #000);
          appearance: none;
          background-color: var(--dt-comm-channel-background-color, #fefefe);
          border: 1px solid var(--dt-comm-channel-border-color, #fefefe);
          border-radius: var(--dt-comm-channel-border-radius, 0);
          box-shadow: var(
            --dt-comm-channel-box-shadow,
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
          height: auto;
          line-height: 1.5;
          margin: 0;
          padding: var(--dt-form-padding, 0.5333333333rem);
          transition: var(
            --dt-form-transition,
            box-shadow 0.5s,
            border-color 0.25s ease-in-out
          );
        }
        input:disabled,
        input[readonly],
        textarea:disabled,
        textarea[readonly] {
          background-color: var(
            --dt-text-disabled-background-color,
            var(--dt-form-disabled-background-color, #e6e6e6)
          );
          cursor: not-allowed;
        }
        input.disabled {
          color: var(--dt-text-placeholder-color, #999);
        }
        input:focus-within,
        input:focus-visible {
          outline: none;
        }
        input::placeholder {
          color: var(--dt-text-placeholder-color, #999);
          text-transform: var(--dt-text-placeholder-transform, none);
          font-size: var(--dt-text-placeholder-font-size, 1rem);
          font-weight: var(--dt-text-placeholder-font-weight, 400);
          letter-spacing: var(--dt-text-placeholder-letter-spacing, normal);
        }
        input.invalid {
          border-color: var(--dt-text-border-color-alert, var(--alert-color));
        }

        .field-container {
          display: flex;
          margin-bottom: 0.5rem;
        }
        .field-container input {
          flex-grow: 1;
        }
        .field-container .input-addon {
          flex-shrink: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
          padding: 10px;
          border: solid 1px gray;
          border-collapse: collapse;
          background-color: var(--dt-comm-channel-background-color, buttonface);
          border: 1px solid var(--dt-comm-channel-border-color, #fefefe);
          border-radius: var(--dt-comm-channel-border-radius, 0);
          box-shadow: var(
            --dt-comm-channel-box-shadow,
            var(
              --dt-form-input-box-shadow,
              inset 0 1px 2px hsl(0deg 0% 4% / 10%)
            )
          );
        }

        .input-addon:disabled {
          background-color: var(--dt-form-disabled-background-color);
          color: var(--dt-text-placeholder-color, #999);
        }
        .input-addon:disabled:hover {
          background-color: var(--dt-form-disabled-background-color);
          color: var(--dt-text-placeholder-color, #999);
          cursor: not-allowed;
        }

        .input-addon.btn-remove {
          color: var(--alert-color, #cc4b37);
          &:disabled {
            color: var(--dt-text-placeholder-color, #999);
          }
          &:hover:not([disabled]) {
            background-color: var(--alert-color, #cc4b37);
            color: var(--dt-comm-channel-button-hover-color, #ffffff);
          }
        }
        .input-addon.btn-add {
          color: var(--success-color, #cc4b37);
          &:disabled {
            color: var(--dt-text-placeholder-color, #999);
          }
          &:hover:not([disabled]) {
            background-color: var(--success-color, #cc4b37);
            color: var(--dt-comm-channel-button-hover-color, #ffffff);
          }
        }

        .icon-overlay {
          inset-inline-end: 5.5rem;
          height: 2.5rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      value: {
        type: Array,
        reflect: true,
      },
    };
  }

  updated(changedProperties) {
    // if length of value was changed, focus the last element (which is new)
    if (changedProperties.has('value')) {
      const old = changedProperties.get('value');
      if (old && old?.length !== this.value?.length) {
        this.focusNewItem();
      }
    }
  }

  focusNewItem() {
    const items = this.shadowRoot.querySelectorAll('input');
    if (items && items.length) {
      // console.log('trigger focus');
      items[items.length - 1].focus();
    }
  }

  _addItem() {
    // new items in the API will generate their own key,
    // but we need a temporary key in order to remove items from the list,
    // so we add a tempKey that is the current timestamp.
    const newValue = {
      verified: false,
      value: '',
      tempKey: Date.now().toString(),
    };
    this.value = [...this.value, newValue];
  }

  _removeItem(e) {
    const keyToRemove = e.currentTarget.dataset.key;
    if (keyToRemove) {
      const event = new CustomEvent('change', {
        bubbles: true,
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // remove item from value
      const newValue = this.value
        // if removed item hasn't been saved, just remove from list
        .filter(x => x.tempKey !== keyToRemove)
        // if remove item was saved (has `key`), mark as `delete`
        .map(x => {
          const item = { ...x };
          // add `delete` prop to clicked item
          if (x.key === keyToRemove) {
            item.delete = true;
          }
          return item;
        });

      // if no active items, add a blank one
      if (!newValue.filter(x => !x.delete).length) {
        newValue.push({
          value: '',
          tempKey: Date.now().toString(),
        });
      }

      this.value = newValue;

      event.detail.newValue = this.value;

      this.dispatchEvent(event);
      this._setFormValue(this.value);
    }
  }

  _change(e) {
    const key = e?.currentTarget?.dataset?.key;
    if (key) {
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // update this item's value in the list
      this.value = this.value.map(x => ({
        ...x,
        value: x.key === key || x.tempKey === key
        ? e.target?.value
          : x.value
      }));
      event.detail.newValue = this.value;

      this._setFormValue(this.value);
      this.dispatchEvent(event);
    }
  }

  _inputFieldTemplate(item) {
    return html`
      <div class="field-container">
        <input
          data-key="${item.key ?? item.tempKey}"
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

        <button
          class="input-addon btn-remove"
          @click=${this._removeItem}
          data-key="${item.key ?? item.tempKey}"
          ?disabled=${this.disabled}
        >
          <dt-icon icon="mdi:close"></dt-icon>
        </button>
        <button
          class="input-addon btn-add"
          @click=${this._addItem}
          ?disabled=${this.disabled}
        >
          <dt-icon icon="mdi:plus-thick"></dt-icon>
        </button>
      </div>
    `;
  }

  // update the value comming from API
  /*_setFormValue(value) {
    super._setFormValue(value);
    this.internals.setFormValue(JSON.stringify(value));
    this.value = value;
    this.requestUpdate();
  }*/


  // rendering the input at 0 index
  _renderInputFields() {
    if ((this.value == null || !(this.value.length))) {
      this.value = [{
        verified: false,
        value: '',
        tempKey: Date.now().toString(),
      }];

      // initializing with 0 so that delete button does comes in
      return this._inputFieldTemplate(this.value[0]);
    }
    return html`
      ${repeat(
        (this.value ?? []).filter(x => !x.delete),
        (x) => x.id,
        (x) => this._inputFieldTemplate(x))
      }
    `;
  }

  render() {
    return html`
      ${this.labelTemplate()}
      <div class="input-group">
        ${this._renderInputFields()}

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

window.customElements.define('dt-comm-channel', DtCommChannel);

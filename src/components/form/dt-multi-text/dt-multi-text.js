import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { DtText } from '../dt-text/dt-text.js';
import '../../icons/dt-icon.js';
import '../../layout/dt-phone-modal/dt-phone-modal.js';

/**
 * Field to edit multiple text values with ability to add/remove values.
 * Used primarily for lists of communication channels (e.g. phone, email, social links, etc.)
 */
export class DtMultiText extends DtText {
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
          background-color: var(--dt-multi-text-background-color, #fefefe);
          border: 1px solid var(--dt-multi-text-border-color, #fefefe);
          border-radius: var(--dt-multi-text-border-radius, 0);
          box-shadow: var(
            --dt-multi-text-box-shadow,
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
      `,
      css`
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .field-container {
          display: flex;
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
          background-color: var(--dt-multi-text-background-color, buttonface);
          border: 1px solid var(--dt-multi-text-border-color, #fefefe);
          border-radius: var(--dt-multi-text-border-radius, 0);
          box-shadow: var(
            --dt-multi-text-box-shadow,
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
            color: var(--dt-multi-text-button-hover-color, #ffffff);
          }
        }
        .input-addon.btn-add {
          color: var(--success-color, #cc4b37);
          &:disabled {
            color: var(--dt-text-placeholder-color, #999);
          }
          &:hover:not([disabled]) {
            background-color: var(--success-color, #cc4b37);
            color: var(--dt-multi-text-button-hover-color, #ffffff);
          }
        }

        .icon-overlay {
          inset-inline-end: 4rem;
          height: 2.5rem;
        }
        .field-container:has(.btn-remove) ~ .icon-overlay {
          inset-inline-end: 5.5rem;
        }

        .input-addon.btn-phone-open {
          color: var(--primary-color, #0073aa);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          white-space: nowrap;
          &:disabled {
            color: var(--dt-text-placeholder-color, #999);
          }
          &:hover:not([disabled]) {
            background-color: var(--primary-color, #0073aa);
            color: var(--dt-multi-text-button-hover-color, #ffffff);
          }
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
        value: x.key === key || x.tempKey === key ? e.target?.value : x.value,
      }));
      event.detail.newValue = this.value;

      this._setFormValue(this.value);
      this.dispatchEvent(event);
    }
  }

  _openPhoneModal(e) {
    // Use 'this' to comply with class method expectations
    const { phoneNumber } = e.currentTarget.dataset;
    if (phoneNumber) {
      // Get or create the phone modal
      let modal = document.querySelector('dt-phone-modal');
      if (!modal) {
        modal = document.createElement('dt-phone-modal');
        document.body.appendChild(modal);
      }
      // Optionally, store a reference to the modal on this instance if needed
      this._phoneModal = modal;
      modal.open(phoneNumber);
    }
  }

  _inputFieldTemplate(item, itemCount) {
    const isPhone = this.type === 'phone' || this.type === 'phone-intl';
    const hasPhoneValue = isPhone && item.value && item.value.trim() !== '';

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
        />

        ${when(
          hasPhoneValue,
          () => html`
            <button
              class="input-addon btn-phone-open"
              @click=${this._openPhoneModal}
              data-phone-number="${item.value}"
              ?disabled=${this.disabled}
              title="Send a message"
              aria-label="Send a message to ${item.value}"
            >
              <dt-icon icon="mdi:phone-outgoing"></dt-icon> Open
            </button>
          `,
        )}
        ${when(
          itemCount > 1 || item.key || item.value,
          () => html`
            <button
              class="input-addon btn-remove"
              @click=${this._removeItem}
              data-key="${item.key ?? item.tempKey}"
              ?disabled=${this.disabled}
            >
              <dt-icon icon="mdi:close"></dt-icon>
            </button>
          `,
          () => html``,
        )}
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

  // rendering the input at 0 index
  _renderInputFields() {
    if (!this.value || !this.value.length) {
      this.value = [
        {
          verified: false,
          value: '',
          tempKey: Date.now().toString(),
        },
      ];
    }

    return html`
      ${repeat(
        (this.value ?? []).filter(x => !x.delete),
        x => x.id,
        x => this._inputFieldTemplate(x, this.value.length),
      )}
    `;
  }

  _validateRequired() {
    const { value } = this;

    if (this.required && (!value || value.every(item => !item.value))) {
      this.invalid = true;
      this.internals.setValidity(
        {
          valueMissing: true,
        },
        this.requiredMessage || 'This field is required',
        this._field,
      );
    } else {
      this.invalid = false;
      this.internals.setValidity({});
    }
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
        ${this._renderInputFields()} ${this.renderIcons()}
      </div>
    `;
  }
}

window.customElements.define('dt-multi-text', DtMultiText);

import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import CountryList from 'country-list-with-dial-code-and-flag';
import countries from 'i18n-iso-countries';
import { DtText } from '../dt-text/dt-text.js';
import '../../icons/dt-icon.js';

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
        
        /* Phone-intl specific styles */
        .phone-intl-container {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 0;
          position: relative;
        }
        .phone-intl-container .country-button {
          flex-shrink: 0;
          min-width: 60px;
          width: auto;
          padding: var(--dt-form-padding, 0.5333333333rem);
          border: 1px solid var(--dt-multi-text-border-color, #fefefe);
          border-radius: var(--dt-multi-text-border-radius, 0);
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
          background-color: var(--dt-multi-text-background-color, #fefefe);
          box-shadow: var(
            --dt-multi-text-box-shadow,
            var(
              --dt-form-input-box-shadow,
              inset 0 1px 2px hsl(0deg 0% 4% / 10%)
            )
          );
          font-family: inherit;
          font-size: 1rem;
          color: var(--dt-form-text-color, #000);
          text-align: center;
          height: auto;
          line-height: 1.5;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }
        .phone-intl-container .country-button:disabled {
          background-color: var(
            --dt-text-disabled-background-color,
            var(--dt-form-disabled-background-color, #e6e6e6)
          );
          cursor: not-allowed;
        }
        .phone-intl-container .country-button:hover:not(:disabled) {
          background-color: var(--dt-multi-text-background-color, #f0f0f0);
        }
        .phone-intl-container .country-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          background-color: var(--dt-multi-text-background-color, #fefefe);
          border: 1px solid var(--dt-multi-text-border-color, #fefefe);
          border-radius: var(--dt-multi-text-border-radius, 0);
          box-shadow: var(
            --dt-multi-text-box-shadow,
            var(
              --dt-form-input-box-shadow,
              0 2px 8px hsl(0deg 0% 4% / 20%)
            )
          );
          max-height: 200px;
          overflow-y: auto;
          min-width: 250px;
          display: none;
        }
        .phone-intl-container .country-dropdown.open {
          display: block;
        }
        .phone-intl-container .country-option {
          padding: var(--dt-form-padding, 0.5333333333rem);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: inherit;
          font-size: 1rem;
          color: var(--dt-form-text-color, #000);
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .phone-intl-container .country-option:hover {
          background-color: var(--dt-multi-text-background-color, #f0f0f0);
        }
        .phone-intl-container .country-option.selected {
          background-color: var(--dt-multi-text-background-color, #e6f3ff);
        }
        .phone-intl-container .dial-code {
          flex-shrink: 0;
          padding: var(--dt-form-padding, 0.5333333333rem);
          border-top: 1px solid var(--dt-multi-text-border-color, #fefefe);
          border-bottom: 1px solid var(--dt-multi-text-border-color, #fefefe);
          border-left: none;
          border-right: none;
          background-color: var(--dt-multi-text-background-color, #f8f8f8);
          font-family: inherit;
          font-size: 1rem;
          color: var(--dt-form-text-color, #000);
          font-weight: 500;
          line-height: 1.5;
          display: flex;
          align-items: center;
          min-width: 50px;
          justify-content: center;
        }
        .phone-intl-container input[data-type="phone"] {
          flex-grow: 1;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: none;
          line-height: 1.5;
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
      _openDropdownKey: {
        type: String,
        state: true,
      },
    };
  }

  constructor() {
    super();
    this._countries = CountryList.getAll();
    this._openDropdownKey = null;
    
    // Register some common locales with i18n-iso-countries
    // We'll register them on-demand in _getCountryOptions to avoid bundling all locales
    
    // Bind click outside handler
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  _getCountryOptions() {
    return this._countries.map(country => {
      const { data } = country;
      // Use localized country names when possible, fallback to default
      let localizedName = data.name;
      try {
        const locale = this.locale || 'en';
        // Convert locale format: 'en_US' -> 'en', 'fr_FR' -> 'fr', etc.
        const [isoLanguage] = locale.split('_');
        
        // Try to get localized name, fallback to English or default
        const localizedNameResult = countries.getName(data.code, isoLanguage) || 
                                   countries.getName(data.code, 'en') ||
                                   data.name;
        if (localizedNameResult) {
          localizedName = localizedNameResult;
        }
      } catch (e) {
        // Fallback to default name if localization fails
        // eslint-disable-next-line no-console
        console.debug('Failed to get localized country name:', e);
      }
      
      return {
        code: data.code,
        name: localizedName,
        dialCode: data.dial_code,
        flag: data.flag,
      };
    });
  }

  _parsePhoneValue(value) {
    if (!value) return { countryCode: 'US', phoneNumber: '' };
    
    // Try to extract country code and phone number from the value
    // Expected format: "+1 555-123-4567" or similar
    const match = value.match(/^(\+\d{1,4})\s*(.*)$/);
    if (match) {
      const dialCode = match[1];
      const phoneNumber = match[2];
      
      // Find countries by dial code
      const matchingCountries = this._countries.filter(c => c.data.dial_code === dialCode);
      
      // Prefer the country marked as preferred, otherwise take the first one
      let country = matchingCountries.find(c => c.data.preferred);
      if (!country && matchingCountries.length > 0) {
        [country] = matchingCountries;
      }
      
      return {
        countryCode: country ? country.data.code : 'US',
        phoneNumber,
      };
    }
    
    // If no country code detected, assume it's just a phone number
    return { countryCode: 'US', phoneNumber: value };
  }

  _formatPhoneValue(countryCode, phoneNumber) {
    const country = this._countries.find(c => c.data.code === countryCode);
    const dialCode = country ? country.data.dial_code : '+1';
    return phoneNumber ? `${dialCode} ${phoneNumber}` : '';
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

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
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

  _inputFieldTemplate(item, itemCount) {
    if (this.type === 'phone-intl') {
      return this._phoneIntlFieldTemplate(item, itemCount);
    }
    
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

  _phoneIntlFieldTemplate(item, itemCount) {
    const parsed = this._parsePhoneValue(item.value);
    const countryOptions = this._getCountryOptions();
    const selectedCountry = countryOptions.find(c => c.code === parsed.countryCode) || countryOptions.find(c => c.code === 'US');
    const dropdownKey = item.key ?? item.tempKey;
    const isDropdownOpen = this._openDropdownKey === dropdownKey;
    
    return html`
      <div class="field-container">
        <div class="phone-intl-container">
          <button 
            class="country-button"
            data-key="${dropdownKey}"
            data-type="country-button"
            ?disabled=${this.disabled}
            @click=${this._toggleCountryDropdown}
            type="button"
          >
            <span>${selectedCountry?.flag || '🇺🇸'}</span>
            <dt-icon icon="mdi:chevron-down" size="0.8em"></dt-icon>
          </button>
          <div class="country-dropdown ${isDropdownOpen ? 'open' : ''}">
            ${countryOptions.map(country => html`
              <button 
                class="country-option ${country.code === parsed.countryCode ? 'selected' : ''}"
                data-key="${dropdownKey}"
                data-country-code="${country.code}"
                @click=${this._selectCountry}
                type="button"
              >
                <span>${country.flag}</span>
                <span>${country.name}</span>
                <span>${country.dialCode}</span>
              </button>
            `)}
          </div>
          <div class="dial-code">${selectedCountry?.dialCode || '+1'}</div>
          <input
            data-key="${dropdownKey}"
            data-type="phone"
            name="${this.name}"
            aria-label="${this.label} phone number"
            type="tel"
            placeholder="${this.placeholder || 'Phone number'}"
            ?disabled=${this.disabled}
            ?required=${this.required}
            class="${classMap(this.classes)}"
            .value="${parsed.phoneNumber || ''}"
            @change=${this._changePhone}
            novalidate
          />
        </div>

        ${when(
          itemCount > 1 || item.key || item.value,
          () => html`
            <button
              class="input-addon btn-remove"
              @click=${this._removeItem}
              data-key="${item.key ?? item.tempKey}"
              ?disabled=${this.disabled}
              type="button"
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
          type="button"
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

  _changeCountry(e) {
    const key = e?.currentTarget?.dataset?.key;
    if (key) {
      const countryCode = e.target.value;
      const phoneInput = e.target.parentElement.querySelector('input[data-type="phone"]');
      const dialCodeDisplay = e.target.parentElement.querySelector('.dial-code');
      const phoneNumber = phoneInput ? phoneInput.value : '';
      
      // Update the dial code display
      const countryOptions = this._getCountryOptions();
      const selectedCountry = countryOptions.find(c => c.code === countryCode);
      if (dialCodeDisplay && selectedCountry) {
        dialCodeDisplay.textContent = selectedCountry.dialCode;
      }
      
      const newValue = this._formatPhoneValue(countryCode, phoneNumber);
      
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // update this item's value in the list
      this.value = this.value.map(x => ({
        ...x,
        value: x.key === key || x.tempKey === key ? newValue : x.value,
      }));
      event.detail.newValue = this.value;

      this._setFormValue(this.value);
      this.dispatchEvent(event);
    }
  }

  _toggleCountryDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (this.disabled) return;
    
    const key = e.currentTarget.dataset.key;
    if (this._openDropdownKey === key) {
      this._closeDropdown();
    } else {
      this._openDropdownKey = key;
      // Add click outside listener when dropdown opens
      setTimeout(() => {
        document.addEventListener('click', this._handleClickOutside);
      }, 0);
    }
  }

  _selectCountry(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const key = e.currentTarget.dataset.key;
    const countryCode = e.currentTarget.dataset.countryCode;
    
    if (key && countryCode) {
      // Find the phone input and dial code display for this item
      const container = e.currentTarget.closest('.phone-intl-container');
      const phoneInput = container?.querySelector('input[data-type="phone"]');
      const dialCodeDisplay = container?.querySelector('.dial-code');
      const phoneNumber = phoneInput ? phoneInput.value : '';
      
      // Update the dial code display
      const countryOptions = this._getCountryOptions();
      const selectedCountry = countryOptions.find(c => c.code === countryCode);
      if (dialCodeDisplay && selectedCountry) {
        dialCodeDisplay.textContent = selectedCountry.dialCode;
      }
      
      const newValue = this._formatPhoneValue(countryCode, phoneNumber);
      
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // update this item's value in the list
      this.value = this.value.map(x => ({
        ...x,
        value: x.key === key || x.tempKey === key ? newValue : x.value,
      }));
      event.detail.newValue = this.value;

      this._setFormValue(this.value);
      this.dispatchEvent(event);
      
      // Close the dropdown and trigger a re-render to update the flag
      this._closeDropdown();
      
      // Force re-render to update the flag button
      this.requestUpdate();
    }
  }

  _closeDropdown() {
    this._openDropdownKey = null;
    document.removeEventListener('click', this._handleClickOutside);
  }

  _handleClickOutside(e) {
    const dropdown = e.target.closest('.phone-intl-container');
    if (!dropdown) {
      this._closeDropdown();
    }
  }

  _changePhone(e) {
    const key = e?.currentTarget?.dataset?.key;
    if (key) {
      const phoneNumber = e.target.value;
      const countrySelect = e.target.parentElement.querySelector('.country-select');
      const countryCode = countrySelect ? countrySelect.value : 'US';
      
      const newValue = this._formatPhoneValue(countryCode, phoneNumber);
      
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // update this item's value in the list
      this.value = this.value.map(x => ({
        ...x,
        value: x.key === key || x.tempKey === key ? newValue : x.value,
      }));
      event.detail.newValue = this.value;

      this._setFormValue(this.value);
      this.dispatchEvent(event);
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

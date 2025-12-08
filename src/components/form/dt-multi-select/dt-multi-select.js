import { html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg } from '@lit/localize';
import DtFormBase from '../dt-form-base.js';
import {HasOptionsList} from '../mixins/hasOptionsList.js';
import '../../icons/dt-spinner.js';
import '../../icons/dt-checkmark.js';

/**
 * Select field that allows multiple values to be selected. Displayed as a typeahead or autocomplete style input.
 */
export class DtMultiSelect extends HasOptionsList(DtFormBase) {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          position: relative;
          font-family: Helvetica, Arial, sans-serif;
        }

        .input-group {
          cursor: text; /* Indicates the area is clickable */
          color: var(--dt-multi-select-text-color, #0a0a0a);
        }
        .input-group.disabled input,
        .input-group.disabled .field-container {
          background-color: var(--disabled-color);
        }
        .input-group.disabled a,
        .input-group.disabled button {
          cursor: not-allowed;
          pointer-events: none;
        }
        .input-group.disabled *:hover {
          cursor: not-allowed;
        }

        .field-container {
          background-color: var(--dt-multi-select-background-color, #fefefe);
          border: 1px solid var(--dt-form-border-color, #cacaca);
          border-radius: 0;
          color: var(--dt-multi-select-text-color, #0a0a0a);
          font-size: 1rem;
          font-weight: 300;
          min-height: 2.5rem;
          line-height: 1.5;
          margin: 0;
          padding-top: calc(0.5rem - 0.375rem);
          padding-bottom: 0.5rem;
          padding-inline: 0.5rem 1.6rem;
          box-sizing: border-box;
          width: 100%;
          text-transform: none;
          display: flex;
          flex-wrap: wrap;
        }

        .field-container input,
        .field-container .selected-option {
          //height: 1.5rem;
        }

        .selected-option {
          cursor: default;
          border: 1px solid var(--dt-multi-select-tag-border-color, #c2e0ff);
          background-color: var(
            --dt-multi-select-tag-background-color,
            #c2e0ff
          );

          display: flex;
          font-size: 0.875rem;
          position: relative;
          border-radius: 2px;
          margin-inline-end: 4px;
          margin-block-start: 0.375rem;
          box-sizing: border-box;
        }
        .selected-option > *:first-child {
          padding-inline-start: 4px;
          padding-block: 0.25rem;
          line-height: normal;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          --container-padding: calc(0.5rem + 1.6rem + 2px);
          --option-padding: 8px;
          --option-button: 20px;
          max-width: calc(
            var(--container-width) - var(--container-padding) -
              var(--option-padding) - var(--option-button)
          );
        }
        .selected-option * {
          align-self: center;
        }
        .selected-option button {
          background: transparent;
          outline: 0;
          border: 0;
          border-inline-start: 1px solid
            var(--dt-multi-select-tag-border-color, #c2e0ff);
          color: var(--dt-multi-select-text-color, #0a0a0a);
          margin-inline-start: 4px;
        }
        .selected-option button:hover {
          cursor: pointer;
        }

        .field-container input {
          background-color: var(--dt-form-background-color, #fff);
          color: var(--dt-form-text-color, #000);
          flex-grow: 1;
          min-width: 50px;
          flex-basis: 50px;
          border: 0;
          margin-block-start: 0.375rem;
        }
        .field-container input:focus,
        .field-container input:focus-visible,
        .field-container input:active {
          border: 0;
          outline: 0;
        }
        .field-container input::placeholder {
          color: var(--dt-text-placeholder-color, #999);
          opacity: 1;
        }

        /* === Options List === */
        .option-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border: 1px solid var(--dt-form-border-color, #cacaca);
          background: var(--dt-form-background-color, #fefefe);
          z-index: 10;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          box-shadow: var(--shadow-1);
          max-height: 150px;
          overflow-y: scroll;
        }
        .option-list li {
          border-block-start: 1px solid var(--dt-form-border-color, #cacaca);
          outline: 0;
        }
        .option-list li div,
        .option-list li button {
          padding: 0.5rem 0.75rem;
          color: var(--dt-multi-select-text-color, #0a0a0a);
          font-weight: 100;
          font-size: 1rem;
          text-decoration: none;
          text-align: inherit;
        }
        .option-list li button {
          display: block;
          width: 100%;
          border: 0;
          background: transparent;
        }
        .option-list li button:hover,
        .option-list li button.active {
          cursor: pointer;
          background: var(--dt-multi-select-option-hover-background, #f5f5f5);
        }

        .field-container.invalid {
          border: 1px solid var(--dt-text-border-color-alert, var(--alert-color));
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      /** Placeholder displayed when no value is entered */
      placeholder: { type: String },
      /** Override height of container * */
      containerHeight: {
        type: Number,
        state: true,
      },
    };
  }

  _select(value) {
    // Create custom event with new/old values to pass to onchange function
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        field: this.name,
        oldValue: this.value,
      },
    });

    // update value in this component
    if (this.value && this.value.length) {
      if (typeof this.value[0] === 'string') {
        // If value is array of strings, check for same value prefixed with hyphen
        this.value = [...this.value.filter(i => i !== `-${value}`), value];
      } else {
        // If value is array of objects, check for same value with `delete` property
        let foundPrevious = false;
        const newVal = this.value.map(i => {
          const val = {
            ...i,
          };
          if (i.id === value.id && i.delete) {
            delete val.delete;
            foundPrevious = true;
          }
          return val;
        });
        if (!foundPrevious) {
          newVal.push(value);
        }
        this.value = newVal;
      }
    } else {
      this.value = [value];
    }
    event.detail.newValue = this.value;
    this.open = false; // close options list
    this.activeIndex = -1; // reset keyboard-selected option
    this.canUpdate = true;

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
    this._setFormValue(this.value);
    if (this.query) {
      this.query = '';
    }
    this._clearSearch();
  }

  _remove(e) {
    e.stopPropagation();
    if (e.target && e.target.dataset && e.target.dataset.value) {
      const event = new CustomEvent('change', {
        bubbles: true,
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });
      this.value = (this.value || []).map(i =>
        i === e.target.dataset.value ? `-${i}` : i
      );
      event.detail.newValue = this.value;

      // dispatch event for use with addEventListener from javascript
      this.dispatchEvent(event);
      this._setFormValue(this.value);

      // If option was de-selected while list was open, re-focus input
      if (this.open) {
        this.shadowRoot.querySelector('input').focus();
      }
    }
    document.activeElement.blur();
  }

  // Add or modify this method in your DtMultiSelect class

  updated() {
      super.updated();

      this._updateContainerHeight();
  }

  _updateContainerHeight() {
    const container = this.shadowRoot.querySelector('.field-container');

    if (container) {
      const newHeight = container.offsetHeight;
      
      if (this.containerHeight !== newHeight) {
        this.containerHeight = newHeight;
        this.requestUpdate();
      }
    }
  }

  /**
   * Filter to options that:
   *   1: are not selected
   *   2: match the search query
   * @private
   */
  _filterOptions() {
    this.filteredOptions = (this.options || []).filter(
      opt =>
        !(this.value || []).includes(opt.id) &&
        (!this.query ||
          opt.label
            .toLocaleLowerCase()
            .includes(this.query.toLocaleLowerCase()))
    );
    return this.filteredOptions;
  }

  willUpdate(props) {
    super.willUpdate(props);

    if (props) {
      const valueChanged = props.has('value');
      const queryChanged = props.has('query');
      const optionsChanged = props.has('options');

      // if value, query, or options change, trigger filter
      if (valueChanged || queryChanged || optionsChanged) {
        this._filterOptions();
      }
    }
  }

  _handleDivClick() {
    const input = this.renderRoot.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  _handleItemClick(e) {
    e.stopPropagation();
    document.activeElement.blur();
  }

  _renderSelectedOptions() {
    return (
      this.options &&
      this.value &&
      this.value
      .filter(val => val.charAt(0) !== '-')
      .map(
          val => html`
            <div class="selected-option"
              @click="${this._handleItemClick}"
              @keydown="${this._handleItemClick}">
              <span>${this.options.find(option => option.id === val).label}</span>
              <button
                @click="${this._remove}"
                ?disabled="${this.disabled}"
                data-value="${val}"
              >
                x
              </button>
            </div>
          `
        )
    );
  }

  _validateRequired() {
    const { value } = this;

    if (this.required && (!value || value.every((item) => !item || item.charAt(0) === '-'))) {
      this.invalid = true;
      this.internals.setValidity(
        {
          valueMissing: true,
        },
        this.requiredMessage || 'This field is required',
        this._field
      );
    } else {
      this.invalid = false;
      this.internals.setValidity({});
    }
  }

  get classes() {
    const classes = {
      'field-container': true,
      invalid: this.touched && this.invalid,
    };
    return classes;
  }

  render() {
    const optionListStyles = {
      display: this.open ? 'block' : 'none',
      top: this.containerHeight ? `${this.containerHeight}px` : '2.5rem',
    };
    return html`
      ${this.labelTemplate()}

      <div class="input-group ${this.disabled ? 'disabled' : ''}"
          @click="${this._handleDivClick}"
          @keydown="${this._handleDivClick}">
        <div
          class="${classMap(this.classes)}"
          @click="${this._focusInput}"
          @keydown="${this._focusInput}"
        >
          ${this._renderSelectedOptions()}
          <input
            type="text"
            placeholder="${this.placeholder}"
            autocomplete="off"
            @focusin="${this._inputFocusIn}"
            @blur="${this._inputFocusOut}"
            @keydown="${this._inputKeyDown}"
            @keyup="${this._inputKeyUp}"
            ?disabled="${this.disabled}"
            ?required=${this.required}
          />
        </div>
        <ul class="option-list" style=${styleMap(optionListStyles)}>
          ${this._renderOptions()}
        </ul>
        ${this.touched && this.invalid
          ? html`<dt-icon
              icon="mdi:alert-circle"
              class="icon-overlay alert"
              tooltip="${this.internals.validationMessage}"
              size="2rem"
            ></dt-icon>`
          : null}
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

window.customElements.define('dt-multi-select', DtMultiSelect);

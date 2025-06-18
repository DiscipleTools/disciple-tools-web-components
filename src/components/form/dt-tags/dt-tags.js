import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import '../../icons/dt-icon.js';
import { DtMultiSelect } from '../dt-multi-select/dt-multi-select.js';

/**
 * Implementation of the Multi Select field that allows adding new values that don't exist.
 * Can also fetch options from API.
 */
export class DtTags extends DtMultiSelect {
  static get properties() {
    return {
      ...super.properties,
      /** Indicates if new items can be added to the list that aren't in the options */
      allowAdd: { type: Boolean },
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .selected-option a,
        .selected-option a:active,
        .selected-option a:visited {
          text-decoration: none;
          color: var(--primary-color, #3f729b);
        }
        .invalid {
          border-color: var(--dt-text-border-color-alert, var(--alert-color));
        }
        .input-group {
          display: flex;
        }

        .field-container {
          flex: 1;
        }

        .field-container .input-addon {
          flex-shrink: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
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
        .input-addon.btn-add {
          width: 37.5px;
          &:disabled {
            color: var(--dt-text-placeholder-color, #999);
          }
          &:hover:not([disabled]) {
            background-color: var(--success-color, #cc4b37);
            color: var(--dt-multi-text-button-hover-color, #ffffff);
          }
        }
        .input-group.allowAdd .icon-overlay {
          inset-inline-end: 3rem;
        }
      `,
    ];
  }

  _addRecord() {
    // dispatch event for use with addEventListener from javascript
    const event = new CustomEvent('dt:add-new', {
      detail: {
        field: this.name,
        value: this.query,
      },
    });

    this.dispatchEvent(event);
  }

  willUpdate(props) {
    super.willUpdate(props);

    if (props) {
      const openChanged = props.has('open');
      // When list is first opened and we don't have any options yet,
      // trigger _filterOptions to load options
      if (openChanged && this.open && (!this.filteredOptions || !this.filteredOptions.length)) {
        this._filterOptions();
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
    const selectedValues = (this.value || [])
      .filter(i => !i.startsWith('-'));

    if (this.options?.length) {
      this.filteredOptions = (this.options || []).filter(
        opt =>
          !selectedValues.includes(opt.id) &&
          (!this.query ||
            opt.id
              .toLocaleLowerCase()
              .includes(this.query.toLocaleLowerCase()))
      );
    } else if (this.open || this.canUpdate) {
      // Only run this filtering if the list is open.
      // This prevents it from running on initial load before a `load` event is attached.
      this.loading = true;
      this.filteredOptions = [];

      // need to fetch data via API request
      const self = this;
      const event = new CustomEvent('dt:get-data', {
        bubbles: true,
        detail: {
          field: this.name,
          postType: this.postType,
          query: this.query,
          onSuccess: result => {
            self.loading = false;

            // if given an array of strings, transform to object array
            let options = result;
            if (options.length && typeof options[0] === 'string') {
              options = options.map(o => ({
                id: o,
              }));
            }

            self.allOptions = options;
            // filter out selected values from list
            self.filteredOptions = options.filter(
              opt => !selectedValues.includes(opt.id)
            );
          },
          onError: error => {
            console.warn(error);
            self.loading = false;
            this.canUpdate = false;
          },
        },
      });
      this.dispatchEvent(event);
    }
    return this.filteredOptions;
  }

  _renderOption(opt, idx) {
    return html`
      <li tabindex="-1">
        <button
          value="${opt.id}"
          type="button"
          data-label="${opt.label}"
          @click="${this._clickOption}"
          @touchstart="${this._touchStart}"
          @blur="${this._inputFocusOut}"
          @touchmove="${this._touchMove}"
          @touchend="${this._touchEnd}"
          tabindex="-1"
          class="${this.activeIndex > -1 && this.activeIndex === idx
      ? 'active'
      : ''}"
        >
          ${opt.label || opt.id}
        </button>
      </li>
    `;
  }

  _validateRequired() {
    const { value } = this;

    if (this.required && (!value || value.every((item) => !item || (typeof item === 'string' && item.charAt(0) === '-')))) {
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

  _renderSelectedOptions() {
    const options = this.options || this.allOptions;
    return (this.value || [])
      .filter(i => !i.startsWith('-'))
      .map(
        tag => {
          let label = tag;
          if (options) {
            const option = options.filter(o => o === tag || o.id === tag);
            if (option.length) {
              label = option[0].label || option[0].id || tag;
            }
          }
          let link;
          if (!link && window?.SHAREDFUNCTIONS?.createCustomFilter) {
            const query =  window.SHAREDFUNCTIONS.createCustomFilter(this.name, [tag])
            const fieldLabel = this.label || this.name
            const labels = [{ id: `${this.name}_${tag}`, name: `${fieldLabel}: ${tag}`}]
            link = window.SHAREDFUNCTIONS.create_url_for_list_query(this.postType, query, labels);
          }
          return html`
          <div class="selected-option">
            <a
              href="${link || '#'}"
              ?disabled="${this.disabled}"
              alt="${tag}"
              >${label}</a
            >
            <button
              @click="${this._remove}"
              ?disabled="${this.disabled}"
              data-value="${tag}"
            >
              x
            </button>
          </div>
        `}
      );
  }

  render() {
    const optionListStyles = {
      display: this.open ? 'block' : 'none',
      top: this.containerHeight ? `${this.containerHeight}px` : '2.5rem',
    };
    return html`
      ${this.labelTemplate()}

      <div class="input-group ${this.disabled ? 'disabled' : ''} ${this.allowAdd ? 'allowAdd' : ''}">
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
        ${this.allowAdd
          ? html`<button
          class="input-addon btn-add"
          @click=${this._addRecord}
          >
            <dt-icon icon="mdi:account-plus-outline"></dt-icon>
          </button>`
          : null}
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

window.customElements.define('dt-tags', DtTags);

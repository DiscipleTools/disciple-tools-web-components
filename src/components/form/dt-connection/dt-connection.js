import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import '../../icons/dt-icon.js';
import { DtTags } from '../dt-tags/dt-tags.js';

/**
 * Multi-select field that allows selection of posts to be connected.
 * Fetches options by API.
 * Optionally allows adding new items.
 */
export class DtConnection extends DtTags {
  static get styles() {
    return [
      ...super.styles,
      css`
        .selected-option a {
          border-inline-start: solid 3px transparent;
        }

        li button * {
          pointer-events: none;
        }

        li {
          border-inline-start: solid 5px transparent;
        }

        li button .status {
          font-style: italic;
          opacity: 0.6;
        }
        li button .status:before {
          content: '[';
          font-style: normal;
        }
        li button .status:after {
          content: ']';
          font-style: normal;
        }

        li button svg {
          width: 1.5em;
          height: auto;
          margin-bottom: -0.25em;
        }
        li button svg use {
          fill: var(--dt-connection-icon-fill, var(--primary-color));
        }
        .invalid {
          border-color: var(--dt-form-border-color-alert, var(--alert-color));
        }
      `,
    ];
  }

  _clickOption(e) {
    if (e.target && e.target.value) {
      const id = parseInt(e.target.value, 10);
      const option = this.filteredOptions.reduce((result, opt) => {
        if (!result && opt.id == id) {
          return opt;
        }
        return result;
      }, null);
      if (option) {
        this._select(option);
      }
    }
  }

  _clickAddNew(e) {
    if (e.target) {
      this._select({
        id: e.target.dataset?.label,
        label: e.target.dataset?.label,
        isNew: true,
      });
      // clear search field if clicked with mouse, since field will lose focus
      const input = this.shadowRoot.querySelector('input');
      if (input) {
        input.value = '';
      }
    }
  }

  _keyboardSelectOption() {
    if (this.activeIndex > -1) {
      if (this.activeIndex + 1 > this.filteredOptions.length) {
        this._select({
          id: this.query,
          label: this.query,
          isNew: true,
        });
      } else {
        this._select(this.filteredOptions[this.activeIndex]);
      }
    }
  }

  _remove(e) {
    e.stopPropagation();
    if (e.target && e.target.dataset && e.target.dataset.value) {
      // check if value from html could be integer and convert if so
      let clickedValue = e.target.dataset.value;
      const intVal = Number.parseInt(clickedValue);
      if (!Number.isNaN(intVal)) {
        clickedValue = intVal;
      }
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });
      this.value = (this.value || []).map(i => {
        const val = {
          ...i,
        };
        if (i.id === clickedValue) {
          val.delete = true;
        }
        return val;
      });
      event.detail.newValue = this.value;

      // dispatch event for use with addEventListener from javascript
      this.dispatchEvent(event);

      // If option was de-selected while list was open, re-focus input
      if (this.open) {
        this.shadowRoot.querySelector('input').focus();
      }

      this._validateRequired();
    }
    document.activeElement.blur();
  }

  /**
   * Filter to options that:
   *   1: are not selected
   *   2: match the search query
   * @private
   */
  _filterOptions() {
    const selectedValues = (this.value || [])
      .filter(i => !i.delete)
      .map(v => v?.id);

    if (this.options?.length) {
      this.filteredOptions = (this.options || []).filter(
        opt =>
          !selectedValues.includes(opt.id) &&
          (!this.query ||
            opt.label
              .toLocaleLowerCase()
              .includes(this.query.toLocaleLowerCase())),
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

            // filter out selected values from list
            self.filteredOptions = result.filter(
              opt => !selectedValues.includes(opt.id),
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

  _validateRequired() {
    const { value } = this;

    if (
      this.required &&
      (!value || value.every(item => !item || item.delete))
    ) {
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

  _renderSelectedOptions() {
    return (this.value || [])
      .filter(i => !i.delete)
      .map(
        opt => html`
          <div
            class="selected-option"
            @click="${this._handleItemClick}"
            @keydown="${this._handleItemClick}"
          >
            <a
              href="${opt.link}"
              style="border-inline-start-color: ${opt.status
                ? opt.status.color
                : ''}"
              ?disabled="${this.disabled}"
              ?required=${this.required}
              title="${opt.status ? opt.status.label : opt.label}"
              >${opt.label}</a
            >
            <button
              @click="${this._remove}"
              ?disabled="${this.disabled}"
              data-value="${opt.id}"
            >
              x
            </button>
          </div>
        `,
      );
  }

  _renderOption(opt, idx) {
    // prettier-ignore
    const svg = html`<svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>circle-08 2</title><desc>Created using Figma</desc><g id="Canvas" transform="translate(1457 4940)"><g id="circle-08 2"><g id="Group"><g id="Vector"><use xlink:href="#path0_fill" transform="translate(-1457 -4940)" fill="#000000"/></g></g></g></g><defs><path id="path0_fill" d="M 12 0C 5.383 0 0 5.383 0 12C 0 18.617 5.383 24 12 24C 18.617 24 24 18.617 24 12C 24 5.383 18.617 0 12 0ZM 8 10C 8 7.791 9.844 6 12 6C 14.156 6 16 7.791 16 10L 16 11C 16 13.209 14.156 15 12 15C 9.844 15 8 13.209 8 11L 8 10ZM 12 22C 9.567 22 7.335 21.124 5.599 19.674C 6.438 18.091 8.083 17 10 17L 14 17C 15.917 17 17.562 18.091 18.401 19.674C 16.665 21.124 14.433 22 12 22Z"/></defs></svg>`

    const status = opt.status || {
      key: '',
      label: '',
      color: '',
    };
    return html`
      <li tabindex="-1" style="border-inline-start-color:${status.color}">
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
          <span class="label">${opt.label}</span>
          <span class="connection-id">(#${opt.id})</span>
          ${status.label
            ? html`<span class="status">${status.label}</span>`
            : null}
          ${opt.user ? svg : null}
        </button>
      </li>
    `;
  }

  render() {
    const optionListStyles = {
      display: this.open ? 'block' : 'none',
      top: this.containerHeight ? `${this.containerHeight}px` : '2.5rem',
    };
    return html`
      ${this.labelTemplate()}

      <div
        class="input-group ${this.disabled ? 'disabled' : ''} ${this.allowAdd
          ? 'allowAdd'
          : ''}"
        @click="${this._handleDivClick}"
        @keydown="${this._handleDivClick}"
      >
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
          ? html`<button class="input-addon btn-add" @click=${this._addRecord}>
              <dt-icon icon="mdi:account-plus-outline"></dt-icon>
            </button>`
          : null}
        <ul class="option-list" style=${styleMap(optionListStyles)}>
          ${this._renderOptions()}
        </ul>
        ${this.renderIcons()}
      </div>
    `;
  }
}

window.customElements.define('dt-connection', DtConnection);

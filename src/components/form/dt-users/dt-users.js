import { css, html } from 'lit';
import { DtTags } from '../dt-tags/dt-tags.js';

export class DtUsers extends DtTags {
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
          width: 20px;
          height: auto;
          margin-bottom: -4px;
        }
        li button svg use {
          fill: var(--dt-connection-icon-fill, var(--primary-color));
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
      this._clearSearch();
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
      this._clearSearch();
    }
  }

  _remove(e) {
    if (e.target && e.target.dataset && e.target.dataset.value) {
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
        if (i.id === parseInt(e.target.dataset.value)) {
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
      .filter(i => !i.delete)
      .map(v => v?.id);

    if (this.options?.length) {
      this.filteredOptions = (this.options || []).filter(
        opt =>
          !selectedValues.includes(opt.id) &&
          (!this.query ||
            opt.name
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

            // filter out selected values from list
            self.filteredOptions = result.filter(
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

  _renderSelectedOptions() {
    console.log('this.value', this.value)
    return (this.value || [])
      .filter(i => !i.delete)
      .map(
        opt => html`
          <div class="selected-option">
            <a
              style="border-inline-start-color: ${opt.status_color
                ? opt.status_color
                : ''}"
              ?disabled="${this.disabled}"
              title="${opt.name}"
              >${opt.name}</a
            >
            <button
              @click="${this._remove}"
              ?disabled="${this.disabled}"
              data-value="${opt.id}"
            >
              x
            </button>
          </div>
        `
      );
  }

  _renderOption(opt, idx) {
    // prettier-ignore
    const svg = html`<svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>circle-08 2</title><desc>Created using Figma</desc><g id="Canvas" transform="translate(1457 4940)"><g id="circle-08 2"><g id="Group"><g id="Vector"><use xlink:href="#path0_fill" transform="translate(-1457 -4940)" fill="#000000"/></g></g></g></g><defs><path id="path0_fill" d="M 12 0C 5.383 0 0 5.383 0 12C 0 18.617 5.383 24 12 24C 18.617 24 24 18.617 24 12C 24 5.383 18.617 0 12 0ZM 8 10C 8 7.791 9.844 6 12 6C 14.156 6 16 7.791 16 10L 16 11C 16 13.209 14.156 15 12 15C 9.844 15 8 13.209 8 11L 8 10ZM 12 22C 9.567 22 7.335 21.124 5.599 19.674C 6.438 18.091 8.083 17 10 17L 14 17C 15.917 17 17.562 18.091 18.401 19.674C 16.665 21.124 14.433 22 12 22Z"/></defs></svg>`

    return html`
      <li tabindex="-1" style="border-inline-start-color:${opt.status_color}">
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
          <span class="connection-id">${opt.name}</span>
        </button>
      </li>
    `;
  }
}

window.customElements.define('dt-users', DtUsers);

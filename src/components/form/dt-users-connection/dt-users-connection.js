import { css, html } from 'lit';
import { DtTags } from '../dt-tags/dt-tags.js';

export class DtUsersConnection extends DtTags {
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
          remove: true,
        },
      });
      this.value = (this.value || []).map(i => {
        const val = {
          ...i,
        };
        if (i.id === parseInt(e.target.dataset.value, 10)) {
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
            opt.label
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
    return (this.value || [])
      .filter(i => !i.delete)
      .map(
        opt => html`
          <div class="selected-option">
            <a
              href="${opt.link}"
              style="border-inline-start-color: ${opt.status
                ? opt.status
                : ''}"
              ?disabled="${this.disabled}"
              title="${opt.label}"
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
        `
      );
  }

  _renderOption(opt, idx) {
    return html`
      <li tabindex="-1" style="border-inline-start-color:${opt.status}">
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
          <span class="avatar"><img src="${opt.avatar}" alt="${opt.label}"/></span> &nbsp;
          <span class="connection-id">${opt.label}</span>
        </button>
      </li>
    `;
  }
}

window.customElements.define('dt-users-connection', DtUsersConnection);

import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { map } from 'lit/directives/map.js';
import { DtTags } from '../dt-tags/dt-tags.js';

export class DtLocation extends DtTags {
  static get properties() {
    return {
      ...super.properties,
      filters: { type: Array },
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .input-group {
          display: flex;
        }

        .field-container {
          position: relative;
        }

        select {
          border: 1px solid var(--dt-form-border-color, #cacaca);
          outline: 0;
        }
        .selected-option > *:first-child {
          max-width: calc(
            var(--container-width) - var(--select-width) - var(
                --container-padding
              ) - var(--option-padding) - var(--option-button) -
              8px
          );
        }
      `,
    ];
  }

  _clickOption(e) {
    if (e.target && e.target.value) {
      const id = e.target.value;
      const option = this.filteredOptions.reduce((result, opt) => {
        if (!result && opt.id === id) {
          return opt;
        }
        return result;
      }, null);
      this._select(option);
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
        if (i.id.toString() === e.target.dataset.value) {
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

  updated() {
    super.updated();

    // set variable with width of container for truncating selected options via CSS
    const container = this.shadowRoot.querySelector('.input-group');
    const currentValue = container.style.getPropertyValue('--select-width');
    const select = this.shadowRoot.querySelector('select');
    if (!currentValue && select?.clientWidth > 0) {
      container.style.setProperty('--select-width', `${select.clientWidth}px`);
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
      .map(v => v?.id.toString());

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
      this.loading = true;
      this.filteredOptions = [];

      // need to fetch data via API request
      const self = this;
      const selectEl = this.shadowRoot.querySelector('select');
      const event = new CustomEvent('dt:get-data', {
        bubbles: true,
        detail: {
          field: this.name,
          query: this.query,
          filter: selectEl?.value,
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
          @touchmove="${this._touchMove}"
          @touchend="${this._touchEnd}"
          tabindex="-1"
          class="${this.activeIndex > -1 && this.activeIndex === idx
            ? 'active'
            : ''}"
        >
          ${opt.label}
        </button>
      </li>
    `;
  }

  _renderSelectedOptions() {
    return (this.value || [])
      .filter(i => !i.delete)
      .map(
        opt => html`
          <div class="selected-option">
            <a
              href="${opt.link}"
              ?disabled="${this.disabled}"
              alt="${opt.status ? opt.status.label : opt.label}"
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

  render() {
    const optionListStyles = {
      display: this.open ? 'block' : 'none',
      top: `${this.containerHeight}px`,
    };
    return html`
      ${this.labelTemplate()}

      <div class="input-group ${this.disabled ? 'disabled' : ''}">
        <div
          class="field-container"
          @click="${this._focusInput}"
          @keydown="${this._focusInput}"
        >
          ${this._renderSelectedOptions()}
          <input
            type="text"
            placeholder="${this.placeholder}"
            @focusin="${this._inputFocusIn}"
            @blur="${this._inputFocusOut}"
            @keydown="${this._inputKeyDown}"
            @keyup="${this._inputKeyUp}"
            ?disabled="${this.disabled}"
          />

          ${this.renderIconLoading()} ${this.renderIconSaved()}
        </div>
        <select
          class="filter-list"
          ?disabled="${this.disabled}"
          @change="${this._filterOptions}"
        >
          ${map(
            this.filters,
            f => html`<option value="${f.id}">${f.label}</option>`,
          )}
        </select>
        <ul class="option-list" style=${styleMap(optionListStyles)}>
          ${this._renderOptions()}
        </ul>
        ${this.renderIconInvalid()} ${this.renderError()}
      </div>
    `;
  }
}

window.customElements.define('dt-location', DtLocation);

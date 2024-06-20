import { css, html } from 'lit';
import { DtMultiSelect } from '../dt-multi-select/dt-multi-select.js';

export class DtTags extends DtMultiSelect {
  static get properties() {
    return {
      ...super.properties,
      allowAdd: { type: Boolean },
      onload: { type: String },
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
      `,
    ];
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
}

window.customElements.define('dt-tags', DtTags);

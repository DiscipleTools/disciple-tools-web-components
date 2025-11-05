import { css, html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg } from '@lit/localize';
import MapboxService from '../../../services/mapboxService.js';
import GoogleGeocodeService from '../../../services/googleGeocodeService.js';
import '../../icons/dt-icon.js';
import './dt-map-modal.js';

export default class DtLocationMapItem extends LitElement {
  static get properties() {
    return {
      id: { type: String, reflect: true },
      placeholder: { type: String },
      mapboxToken: { type: String, attribute: 'mapbox-token' },
      googleToken: { type: String, attribute: 'google-token' },
      validationMessage: { type: String },
      metadata: { type: Object },
      disabled: { type: Boolean },
      open: {
        type: Boolean,
        state: true,
      },
      query: {
        type: String,
        state: true,
      },
      activeIndex: {
        type: Number,
        state: true,
      },
      containerHeight: {
        type: Number,
        state: true,
      },
      loading: { type: Boolean },
      saved: { type: Boolean },
      error: { type: String },
      invalid: { type: Boolean },
      filteredOptions: { type: Array, state: true },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          --dt-location-map-border-color: var(--dt-form-border-color, #fefefe);
          position: relative;
          font-family: Helvetica, Arial, sans-serif;
          display: block;
        }

        .input-group {
          color: var(--dt-multi-select-text-color, #0a0a0a);
          margin-bottom: 1rem;
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

        /* === Options List === */
        .option-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border: 1px solid var(--dt-form-border-color, #cacaca);
          background: var(--dt-form-background-color, #fefefe);
          z-index: 10;
          position: absolute;
          width: var(--container-width, 100%);
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
      `,
      css`
        input {
          color: var(--dt-form-text-color, #000);
          appearance: none;
          background-color: var(--dt-location-map-background-color, #fefefe);
          border: 1px solid var(--dt-location-map-border-color);
          box-shadow: var(
            --dt-location-map-box-shadow,
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
          --dt-location-map-border-radius: var(--dt-form-border-radius, 0);
          display: flex;
          margin-bottom: 0.5rem;
        }
        .field-container > *:first-child {
          border-start-start-radius: var(--dt-location-map-border-radius);
          border-end-start-radius: var(--dt-location-map-border-radius);
        }
        .field-container > *:last-child {
          border-start-end-radius: var(--dt-location-map-border-radius);
          border-end-end-radius: var(--dt-location-map-border-radius);
        }
        .field-container input {
          flex-grow: 1;
          border-width: var(--dt-form-border-width, 1px);
        }
        .field-container .input-addon {
          flex-shrink: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
          padding: 0.6em;
          border-collapse: collapse;
          color: var(--dt-location-map-button-color, #cc4b37);
          background-color: var(--dt-location-map-background-color, buttonface);
          border: var(--dt-form-border-width, 1px) solid var(--dt-location-map-border-color);
          box-shadow: var(
            --dt-location-map-box-shadow,
            var(
              --dt-form-input-box-shadow,
              inset 0 1px 2px hsl(0deg 0% 4% / 10%)
            )
          );
          min-width: 3em;
        }
        .field-container .input-addon dt-icon {
          display: flex;
          font-size: var(--dt-location-map-icon-size, 1rem);
        }
        .field-container .input-addon:hover {
          background-color: var(--dt-location-map-button-hover-background-color, #cc4b37);
          color: var(--dt-location-map-button-hover-color, #ffffff);
        }
        .field-container.invalid {
          border: 1px solid var(--dt-text-border-color-alert, var(--alert-color));
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
      `,
      css`
        /* === Inline Icons === */
        .icon-overlay {
          position: absolute;
          top: 0;
          inset-inline-end: 3.5rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon-overlay.alert {
          color: var(--alert-color);
        }
        .icon-overlay.success {
          color: var(--success-color);
        }
        .icon-overlay.selected {
          inset-inline-end: 6.25rem;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.activeIndex = -1;
    this.filteredOptions = [];
    this.detectTap = false;
    this.debounceTimer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('autofocus', async () => {
      // wait for render to complete
      await this.updateComplete;

      const input = this.shadowRoot.querySelector('input');
      if (input) {
        input.focus();
      }
    });

    if (this.mapboxToken) {
      this.mapboxService = new MapboxService(this.mapboxToken);
    }

    if (this.googleToken) {
      this.googleGeocodeService = new GoogleGeocodeService(this.googleToken, window, document);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('autofocus', this.handleAutofocus);
  }

  updated() {
    this._scrollOptionListToActive();

    // set variable with width of container for truncating selected options via CSS
    const container = this.shadowRoot.querySelector('.input-group');
    const currentValue = container.style.getPropertyValue('--container-width');
    if (!currentValue) {
      container.style.setProperty(
        '--container-width',
        `${container.clientWidth}px`
      );
    }
  }

  /**
   * When navigating via keyboard, keep active element within visible area of option list
   * @private
   */
  _scrollOptionListToActive() {
    const optionList = this.shadowRoot.querySelector('.option-list');
    const activeEl = this.shadowRoot.querySelector('button.active');
    if (optionList && activeEl) {
      const elTop = activeEl.offsetTop;
      const elBottom = activeEl.offsetTop + activeEl.clientHeight;
      const listTop = optionList.scrollTop;
      const listBottom = optionList.scrollTop + optionList.clientHeight;
      if (elBottom > listBottom) {
        // active element below visible area. scroll down
        optionList.scrollTo({
          top: elBottom - optionList.clientHeight,
          behavior: 'smooth',
        });
      } else if (elTop < listTop) {
        // active element above visible area. scroll up
        optionList.scrollTo({ top: elTop, behavior: 'smooth' });
      }
    }
  }

  _clickOption(e) {
    const target = e.currentTarget ?? e.target;
    if (target && target.value) {
      const targetData = JSON.parse(target.value);
      this._select({
          ...targetData,
          key: this.metadata?.key,
      });
    }
  }

  _touchStart(e) {
    if (e.target) {
      this.detectTap = false;
    }
  }

  _touchMove(e) {
    if (e.target) {
      this.detectTap = true;
    }
  }

  _touchEnd(e) {
    if (!this.detectTap) {
      if (e.target && e.target.value) {
        this._clickOption(e);
      }
      this.detectTap = false;
    }
  }

  _keyboardSelectOption() {
    if (this.activeIndex > -1) {
      if (this.activeIndex < this.filteredOptions.length) {
        // select one of the options
        this._select(this.filteredOptions[this.activeIndex]);
      } else {
        // select the Add New option
        this._select({
          value: this.query,
          label: this.query,
          key: this.metadata?.key,
        })
      }
    }
  }

  async _select(metadata) {
    if (metadata.place_id && this.googleGeocodeService) {
      // Google Places autocomplete will give a place_id instead of geometry details,
      // so we need to get those details by geocoding the full address from Place lookup
      this.loading = true;
      const place = await this.googleGeocodeService.getPlaceDetails(metadata.label, this.locale);
      this.loading = false;
      if (place) {
        metadata.lat = place.geometry.location.lat;
        metadata.lng = place.geometry.location.lng;
        metadata.level = place.types && place.types.length ? place.types[0] : null;
      }
    }

    // Create custom event with new/old values to pass to onchange function
    const options = {
      detail: {
        metadata,
      },
      bubbles: false,
    };
    this.dispatchEvent(new CustomEvent('select', options));

    // update value in this component
    this.metadata = metadata;
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.value = metadata?.label;
    }

    this.open = false; // close options list
    this.activeIndex = -1; // reset keyboard-selected option
  }

  get _focusTarget() {
    let target = this._field;
    if (this.metadata) {
      target = this.shadowRoot.querySelector('button') || target;
    }
    return target;
  }

  _inputFocusIn() {
    this.activeIndex = -1;
  }

  _inputFocusOut(e) {
    // allow clicks on option list button to not close the option list
    // Safari actually passes the parent <li> as the relatedTarget
    if (
      !e.relatedTarget ||
      !['BUTTON', 'LI'].includes(e.relatedTarget.nodeName)
    ) {
      this.open = false;
    }
  }

  _inputKeyDown(e) {
    const keycode = e.keyCode || e.which;

    switch (keycode) {
      case 38: // arrow up
        this.open = true;
        this._listHighlightPrevious();
        break;
      case 40: // arrow down
        this.open = true;
        this._listHighlightNext();
        break;
      case 9: // tab
        if (this.activeIndex < 0) {
          // if pressing tab while no option is selected,
          // close the list so you can go to next field
          this.open = false;
        } else {
          e.preventDefault();
        }
        this._keyboardSelectOption();
        break;
      case 13: // enter
        this._keyboardSelectOption();
        break;
      case 27: // escape
        this.open = false;
        this.activeIndex = -1;
        break;
      default:
        this.open = true;
        break;
    }
  }

  _inputKeyUp(e) {
    const keycode = e.keyCode || e.which;
    const ignoredKeys = [9, 13]; // ignore tab & enter;
    if (e.target.value && !ignoredKeys.includes(keycode)) {
      this.open = true;
    }
    this.query = e.target.value;
  }

  _listHighlightNext() {
    this.activeIndex = Math.min(
      this.filteredOptions.length,
      this.activeIndex + 1
    );
  }

  _listHighlightPrevious() {
    this.activeIndex = Math.max(0, this.activeIndex - 1);
  }

  /**
   * Filter to options that:
   *   1: are not selected
   *   2: match the search query
   * @private
   */
  async _filterOptions() {
    if (this.query) {
      if (this.googleToken && this.googleGeocodeService) {
        this.loading = true;

        try {
          const predictions = await this.googleGeocodeService.getPlacePredictions(this.query, this.locale);

          this.filteredOptions = (predictions || []).map((i) => ({
            label: i.description,
            place_id: i.place_id,
            source: 'user',
            raw: i,
          }));

          this.loading = false;
        } catch (ex) {
          console.error(ex);
          this.error = true;
          this.loading = false;
          return;
        }
      } else if (this.mapboxToken && this.mapboxService) {
        this.loading = true;

        const results = await this.mapboxService.searchPlaces(this.query, this.locale);

        this.filteredOptions = results.map((i) => ({
          lng: i.center[0],
          lat: i.center[1],
          level: i.place_type[0],
          label: i.place_name,
          source: 'user'
        }));

        this.loading = false;
      }
    }
    return this.filteredOptions;
  }

  willUpdate(props) {
    super.willUpdate(props);

    if (props) {
      // // if query changes, trigger filter
      const queryChanged = props.has('query');
      if (queryChanged) {
        this.error = false;
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this._filterOptions(), 300);
      }

      // Set the containerHeight for dropdown positioning if it hasn't been set yet
      if (
        !this.containerHeight &&
        this.shadowRoot.children &&
        this.shadowRoot.children.length
      ) {
        const inputGroup = this.shadowRoot.querySelector('.input-group');
        if (inputGroup) {
          this.containerHeight = inputGroup.offsetHeight;
        }
      }
    }
  }

  _change() {

  }

  _delete() {
    const options = {
      detail: {
        metadata: this.metadata,
      },
      bubbles: false,
    };
    this.dispatchEvent(new CustomEvent('delete', options));
  }

  _openMapModal() {
    this.shadowRoot.querySelector('dt-map-modal').dispatchEvent(new Event('open'));
  }

  async _onMapModalSubmit(e) {
    if (e?.detail?.location?.lat) {
      const { location } = e?.detail;
      const { lat, lng } = location;

      // reverse geocode location and save
      if (this.googleGeocodeService) {
        const results = await this.googleGeocodeService.reverseGeocode(lng, lat, this.locale);
        if (results && results.length) {
          const place = results[0];
          this._select({
            lng: place.geometry.location.lng,
            lat: place.geometry.location.lat,
            level: place.types && place.types.length ? place.types[0] : null,
            label: place.formatted_address,
            source: 'user',
          });
        }
      } else if (this.mapboxService) {
        const results = await this.mapboxService.reverseGeocode(lng, lat, this.locale);
        if (results && results.length) {
          const place = results[0];
          this._select({
            lng: place.center[0],
            lat: place.center[1],
            level: place.place_type[0],
            label: place.place_name,
            source: 'user',
          });
        }
      }
    }
  }

  _renderOption(opt, idx, label) {
    return html`
      <li tabindex="-1">
        <button
          value="${JSON.stringify(opt)}"
          type="button"
          @click="${this._clickOption}"
          @touchstart="${this._touchStart}"
          @touchmove="${this._touchMove}"
          @touchend="${this._touchEnd}"
          tabindex="-1"
          class="${this.activeIndex > -1 && this.activeIndex === idx
      ? 'active'
      : ''}"
        >
          ${label ?? opt.label}
        </button>
      </li>
    `;
  }

  _renderOptions() {
    const options = [];
    if (!this.filteredOptions.length) {
      if (this.loading) {
        options.push(html`<li><div>${msg('Loading...')}</div></li>`);
      } else {
        options.push(html`<li><div>${msg('No Data Available')}</div></li>`);
      }
    } else {
      options.push(...this.filteredOptions.map((opt, idx) => this._renderOption(opt, idx)));
    }

    options.push(this._renderOption({
      value: this.query,
      label: this.query,
    }, (this.filteredOptions || []).length, html`<strong>${msg('Use')}: "${this.query}"</strong>`));
    return options;
  }

  get classes() {
    const classes = {
      'field-container': true,
      invalid: this.invalid,
    }
    return classes;
  }

  render() {
    const optionListStyles = {
      display: this.open ? 'block' : 'none',
      top: this.containerHeight ? `${this.containerHeight}px` : '2.5rem',
    };
    const existingValue = !!this.metadata?.label;
    const hasGeometry = this.metadata?.lat && this.metadata?.lng;
    return html`
      <div class="input-group">
        <div class="${classMap(this.classes)}">
          <input
            type="text"
            class="${this.disabled ? 'disabled' : null}"
            placeholder="${this.placeholder}"
            .value="${this.metadata?.label ?? ''}"
            .disabled=${(existingValue && hasGeometry) || this.disabled}
            @focusin="${this._inputFocusIn}"
            @blur="${this._inputFocusOut}"
            @keydown="${this._inputKeyDown}"
            @keyup="${this._inputKeyUp}"
          />

          ${existingValue && hasGeometry ? html`
          <button
            class="input-addon btn-map"
            @click=${this._openMapModal}
            ?disabled=${this.disabled}
          >
            <slot name="map-icon"><dt-icon icon="mdi:map"></dt-icon></slot>
          </button>
          ` : null }
          ${existingValue ? html`
          <button
            class="input-addon btn-delete"
            @click=${this._delete}
            ?disabled=${this.disabled}
          >
            <slot name="delete-icon"><dt-icon icon="mdi:trash-can-outline"></dt-icon></slot>
          </button>
          ` : html`
          <button
            class="input-addon btn-pin"
            @click=${this._openMapModal}
            ?disabled=${this.disabled}
          >
            <slot name="pin-icon"><dt-icon icon="mdi:map-marker-radius"></dt-icon></slot>
          </button>
          ` }
        </div>
        <ul class="option-list" style=${styleMap(optionListStyles)}>
          ${this._renderOptions()}
        </ul>
        ${this.invalid || this.error
          ? html`<dt-icon
            icon="mdi:alert-circle"
            class="icon-overlay alert"
            tooltip="${this.validationMessage ? this.validationMessage : this.error}"
            size="2rem"
          ></dt-icon>` : null}
        ${this.loading
          ? html`<dt-spinner class="icon-overlay ${hasGeometry ? 'selected' : ''}"></dt-spinner>` : null}
        ${this.saved
          ? html`<dt-checkmark class="icon-overlay success ${hasGeometry ? 'selected' : ''}"></dt-checkmark>` : null}
      </div>

      <dt-map-modal
        .metadata=${this.metadata}
        mapbox-token="${this.mapboxToken}"
        @submit=${this._onMapModalSubmit}
      ></dt-map-modal>

`;
  }
}
window.customElements.define('dt-location-map-item', DtLocationMapItem);

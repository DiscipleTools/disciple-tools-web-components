import { css, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import DtFormBase from '../dt-form-base.js';
import './dt-location-map-item.js';
import '../../icons/dt-icon.js';

export class DtLocationMap extends DtFormBase {
  static get properties() {
    return {
      ...super.properties,
      placeholder: { type: String },
      value: {
        type: Array,
        reflect: true,
      },
      locations: {
        type: Array,
        state: true,
      },
      open: {
        type: Boolean,
        state: true,
      },
      limit: {
        type: Number,
        attribute: 'limit',
      },
      onchange: { type: String },
      mapboxToken: {
        type: String,
        attribute: 'mapbox-token',
      },
      googleToken: {
        type: String,
        attribute: 'google-token',
      },
      activeItem: {
        type: String,
        state: true,
      },
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          font-family: Helvetica, Arial, sans-serif;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .field-container {
          position: relative;
        }

        .icon-btn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          height: 0.9em;
          padding: 0;
          color: var(--success-color, #cc4b37);
          transform: scale(1.5);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.limit = 0; // 0 means no limit
    this.value = [];
    this.locations = [
      {
        id: Date.now(),
      },
    ];
  }

  _setFormValue(value) {
    super._setFormValue(value);
    this.internals.setFormValue(JSON.stringify(value));
  }

  willUpdate(...args) {
    super.willUpdate(...args);
    if (this.value) {
      if (this.value.filter(opt => !opt.id)) {
        this.value = [
          ...this.value.map(opt => ({
            ...opt,
            id: opt.id || opt.grid_meta_id,
          })),
        ];
      }
    }
    this.updateLocationList();
  }

  firstUpdated(...args) {
    super.firstUpdated(...args);
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  updated(changedProperties) {
    // if length of value was changed, focus the last element
    if (changedProperties.has('value')) {
      const old = changedProperties.get('value');
      if (old && old?.length !== this.value?.length) {
        this.focusNewLocation();
      }
    }
    // if length of locations was changed, focus the last element
    if (changedProperties.has('locations')) {
      const old = changedProperties.get('locations');
      if (old && old?.length !== this.locations?.length) {
        this.focusNewLocation();
      }
    }
  }

  focusNewLocation() {
    const items = this.shadowRoot.querySelectorAll('dt-location-map-item');
    if (items && items.length) {
      // console.log('trigger focus');
      items[items.length - 1].dispatchEvent(new Event('autofocus'));
    }
  }

  updateLocationList() {
    if (!this.disabled && (this.open || !this.value || !this.value.length)) {
      this.open = true;
      const currentLocations = (this.value || []).filter(i => i.label);
      const canAddMore =
        this.limit === 0 || currentLocations.length < this.limit;

      this.locations = [
        ...currentLocations,
        ...(canAddMore ? [{ id: Date.now() }] : []),
      ];
    } else {
      this.locations = [...(this.value || []).filter(i => i.label)];
    }
  }

  selectLocation(evt) {
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.value,
      },
    });
    const newLocation = {
      ...evt.detail.metadata,
      id: Date.now(),
    };
    if (newLocation.lat) {
      const lat = Math.round(newLocation.lat*(10**7))/10**7;
      const lng = Math.round(newLocation.lng*(10**7))/10**7;
      this.activeItem = `${lat}/${lng}`;
    } else {
      this.activeItem = newLocation.label; // activeId
    }
    this.value = [
      ...(this.value || []).filter(
        i =>
          i.label &&
          (!i.key || i.key !== newLocation.key) &&
          (!i.id || i.id !== newLocation.id),
      ),
      newLocation,
    ];
    this.updateLocationList();
    event.detail.newValue = this.value;

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
    this._setFormValue(this.value);
  }

  deleteItem(evt) {
    this.activeItem = undefined;
    const event = new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.value,
      },
    });

    const item = evt.detail?.metadata;
    const gridMetaId = item?.grid_meta_id;
    if (gridMetaId) {
      // remove this item from the value
      this.value = (this.value || []).filter(
        m => m.grid_meta_id !== gridMetaId,
      );
    } else if (item.lat && item.lng) {
      // remove by lat/lng
      this.value = (this.value || []).filter(
        m => m.lat !== item.lat && m.lng !== item.lng,
      );
    } else {
      // if value has no lat/lng, remove item by key/id
      this.value = (this.value || []).filter(
        m => (!m.key || m.key !== item.key) && (!m.id || m.id !== item.id),
      );
    }

    this.updateLocationList();
    event.detail.newValue = this.value;

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
    this._setFormValue(this.value);
  }

  addNew() {
    const currentLocations = (this.value || []).filter(i => i.label);
    if (this.limit === 0 || currentLocations.length < this.limit) {
      this.open = true;
      this.updateLocationList();
    }
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
      );
    } else {
      this.invalid = false;
      this.internals.setValidity({});
    }
  }

  labelTemplate() {
    if (!this.label) {
      return '';
    }

    return html`
      <dt-label
        ?private=${this.private}
        privateLabel="${this.privateLabel}"
        iconAltText="${this.iconAltText}"
        icon="${this.icon}"
      >
        ${!this.icon
          ? html`<slot name="icon-start" slot="icon-start"></slot>`
          : null}
        ${this.label}
        ${!this.open && (this.limit == 0 || this.locations.length < this.limit)
          ? html`
              <slot name="icon-end" slot="icon-end">
                <button
                  @click="${this.addNew}"
                  class="icon-btn"
                  id="add-item"
                  type="button"
                >
                  <dt-icon icon="mdi:plus-thick"></dt-icon>
                </button>
              </slot>
            `
          : null}
      </dt-label>
    `;
  }

  renderItem(opt, idx) {
    const lat = Math.round(opt.lat*(10**7))/10**7;
    const lng = Math.round(opt.lng*(10**7))/10**7;
    const latLng = `${lat}/${lng}`;
    const showStatus = (this.activeItem && (this.activeItem === opt.label || this.activeItem === latLng))
                    || idx === 0 && !this.activeItem;
    return html`
      <dt-location-map-item
        placeholder="${this.placeholder}"
        .metadata=${opt}
        mapbox-token="${this.mapboxToken}"
        google-token="${this.googleToken}"
        @delete=${this.deleteItem}
        @select=${this.selectLocation}
        ?disabled=${this.disabled}
        ?invalid=${this.invalid && this.touched}
        validationMessage=${this.internals.validationMessage}
        ?loading=${showStatus ? this.loading : false}
        ?saved=${showStatus ? this.saved : false}
        error=${showStatus ? this.error : ''}
      ></dt-location-map-item>
    `;
  }

  render() {
    const values = [...(this.value || [])];
    values.push({
      id: Date.now(),
    });
    return html`
      ${this.labelTemplate()}
      <div class="input-group">
        ${repeat(
          this.locations || [],
          opt => opt.id,
          (opt, idx) => this.renderItem(opt, idx),
        )}
        ${this.renderError()} ${this.renderIconInvalid()}
      </div>
    `;
  }
}

window.customElements.define('dt-location-map', DtLocationMap);


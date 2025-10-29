import { css, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import DtFormBase from '../dt-form-base.js';
import './dt-location-map-item.js';

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
        }

        .field-container {
          position: relative;
        }

        .dt-btn {
            /* Background, Text, and Border Color (Green-600 approximation: #16a34a) */
            background-color: white;
            color: #4CAF50;
            border: 1px solid #4CAF50;
            
            /* Rounded Corners (rounded-xl approximation) */
            border-radius: 0.5rem; 
            
            /* Padding (px-6 py-3 approximation) */
            padding: 0.25rem .25rem;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.limit = 0; // 0 means no limit
    this.value = [];
    this.locations = [{
      id: Date.now(),
    }];
  }

  _setFormValue(value) {
    super._setFormValue(value);
    this.internals.setFormValue(JSON.stringify(value));
  }

  willUpdate(...args) {
    super.willUpdate(...args);

    if (this.value) {
      if (this.value.filter((opt) => !opt.id)) {
        this.value = [
          ...this.value.map((opt) => ({
            ...opt,
            id: opt.grid_meta_id,
          }))
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
      const canAddMore = this.limit === 0 || currentLocations.length < this.limit;
      
      this.locations = [
        ...currentLocations,
        ...(canAddMore ? [{ id: Date.now() }] : [])
      ];
    } else {
      this.locations = [
        ...(this.value || []).filter(i => i.label),
      ];
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
    }
    this.value = [
      ...(this.value || []).filter(i => i.label),
      newLocation,
    ];
    this.updateLocationList();
    event.detail.newValue = this.value;

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
    this._setFormValue(this.value);
  }

  deleteItem(evt) {
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
      this.value = (this.value || []).filter(m => m.grid_meta_id !== gridMetaId);
    } else if (!item.lat || !item.lng) {
      // if value has no lat/lng, remove item by key
      this.value = (this.value || []).filter(m => !m.key || m.key !== item.key);
    } else {
      // otherwise remove by lat/lng
      this.value = (this.value || []).filter(m => m.lat !== item.lat && m.lng !== item.lng);
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

  renderItem(opt) {
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

      ${repeat(this.locations || [], (opt) => opt.id, (opt, idx) => this.renderItem(opt, idx))}
      ${!this.open && (this.limit == 0 || this.locations.length < this.limit)
        ? html`<button @click="${this.addNew}" class="dt-btn">+ Add New</button>`
        : null}
    `;
  }
}

window.customElements.define('dt-location-map', DtLocationMap);

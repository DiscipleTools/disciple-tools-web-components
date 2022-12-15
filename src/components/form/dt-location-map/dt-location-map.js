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
      open: {
        type: Boolean,
        state: true,
      },
      onchange: { type: String },
      mapboxToken: {
        type: String,
        attribute: 'mapbox-token',
      },
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
      `,
    ];
  }

  constructor() {
    super();
    this.value = [];
    this.locations = [{
      id: Date.now(),
    }];
  }

  firstUpdated(...args) {
    super.firstUpdated(...args);

    if (this.value) {
      // set `id` on every location
      this.value = [
        ...this.value.map((opt) => ({
          ...opt,
          id: opt.grid_meta_id,
        }))
      ];
    }
    this.updateLocationList();
  }
  updated(changedProperties) {
    // if length of value was changed, focus the last element
    if (changedProperties.has('value')) {
      const old = changedProperties.get('value');
      if (old && old?.length !== this.value?.length) {
        const items = this.shadowRoot.querySelectorAll('dt-location-map-item');
        if (items && items.length) {
          console.log('trigger focus');
          items[items.length - 1].dispatchEvent(new Event('autofocus'));
        }
      }
    }
  }

  updateLocationList() {
    this.locations = [
      ...(this.value || []).filter(i => i.lat),
      {
        id: Date.now(),
      }
    ]
  }

  selectLocation(evt) {
    const newLocation = {
      ...evt.detail.metadata,
      id: Date.now(),
    }
    this.value = [
      ...(this.value || []).filter(i => i.label),
      newLocation,
    ];
    this.updateLocationList();
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
    } else {
      // remove by lat/lng
      this.value = (this.value || []).filter(m => m.lat !== item.lat && m.lng !== item.lng);
    }

    this.updateLocationList();
    event.detail.newValue = this.value;

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
  }

  renderItem(opt, idx) {
    return html`
      <dt-location-map-item 
        placeholder="${this.placeholder}"
        .metadata=${opt}
        mapbox-token="${this.mapboxToken}"
        @delete=${this.deleteItem}
        @select=${this.selectLocation}
        ?disabled=${this.disabled}
      />
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
    `;
  }
}

window.customElements.define('dt-location-map', DtLocationMap);

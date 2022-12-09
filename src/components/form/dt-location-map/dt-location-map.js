import { css, html } from 'lit';
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

  deleteItem(evt) {
    const gridMetaId = evt.detail?.metadata?.grid_meta_id;
    if (gridMetaId) {
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // remove this item from the value
      this.value = (this.value || []).filter(m => m.grid_meta_id !== gridMetaId);
      event.detail.newValue = this.value;

      // dispatch event for use with addEventListener from javascript
      this.dispatchEvent(event);
    }
  }

  renderItem(opt, idx) {
    return html`
      <dt-location-map-item 
        placeholder="${this.placeholder}"
        .metadata=${opt}
        @delete=${this.deleteItem}
      />
    `;
  }
  renderItems() {
    if (!this.value || !this.value.length) {
      return html`
        <dt-location-map-item 
          placeholder="${this.placeholder}"
          @delete=${this.deleteItem}
          />`;
    }

    return this.value.map((val, idx) => this.renderItem(val, idx));
  }

  render() {
    return html`
      ${this.labelTemplate()}

      ${this.renderItems()}
      
      <button>Add New</button>
    `;
  }
}

window.customElements.define('dt-location-map', DtLocationMap);

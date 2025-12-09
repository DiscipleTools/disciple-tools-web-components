import { css, html } from 'lit';
import { msg } from '@lit/localize';
import DtBase from '../../dt-base.js';
import '../../layout/dt-modal/dt-modal.js';

export class DtMapModal extends DtBase {
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      isOpen: { type: Boolean },
      canEdit: { type: Boolean, state: true },
      metadata: { type: Object },
      center: { type: Array },
      mapboxToken: {
        type: String,
        attribute: 'mapbox-token',
      },
    };
  }

  static get styles() {
    return [
      css`
        .map {
          width: 100%;
          min-width: 50vw;
          min-height: 50dvb;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.addEventListener('open', (e) => {
      this.shadowRoot.querySelector('dt-modal').dispatchEvent(new Event('open'));
      this.isOpen = true;
    });
    this.addEventListener('close', (e) => {
      this.shadowRoot.querySelector('dt-modal').dispatchEvent(new Event('close'));
      this.isOpen = false;
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.canEdit = !this.metadata;

    if (!window.mapboxgl) {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js';
      script.onload = this.initMap.bind(this);
      document.body.appendChild(script);
    } else {
      this.initMap();
    }
  }

  initMap() {
    if (!this.isOpen || !window.mapboxgl || !this.mapboxToken) {
      return;
    }

    const mapContainer = this.shadowRoot.querySelector('#map')
    if (mapContainer && !this.map) {
      this.map = new window.mapboxgl.Map({
        accessToken: this.mapboxToken,
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        minZoom: 1,
      });
      this.map.on('load', () => this.map.resize());
      if (this.center && this.center.length) {
        this.map.setCenter(this.center);
        this.map.setZoom(15);
      }

      // Add zoom controls
      const nav = new mapboxgl.NavigationControl();
      this.map.addControl(nav, 'bottom-right');

      // Add pin if there is one
      this.addPinFromMetadata();

      // If map is editable add/move marker on click
      this.map.on('click', (e) => {
        if (!this.canEdit) {
          return;
        }
        if (this.marker) {
          this.marker.setLngLat(e.lngLat)
        } else {
          this.marker = new mapboxgl.Marker()
            .setLngLat(e.lngLat)
            .addTo(this.map);
        }
      });
    }
  }

  addPinFromMetadata() {
    if (this.metadata) {
      const { lng, lat, level } = this.metadata;
      let zoom = 15
      if (level === 'admin0') {
        zoom = 3
      } else if (level === 'admin1') {
        zoom = 6
      } else if (level === 'admin2') {
        zoom = 10
      }

      if (this.map) {
        this.map.setCenter([lng, lat]);
        this.map.setZoom(zoom);
        this.marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(this.map);
      }
    }
  }

  updated(changedProperties) {
    if (!window.mapboxgl) {
      return;
    }

    if (changedProperties.has('metadata') && this.metadata && this.metadata.lat) {
      this.addPinFromMetadata()
    }
    if (changedProperties.has('isOpen') && this.isOpen) {
      this.initMap();
    }
  }

  onClose(e) {
    if (e?.detail?.action === 'button' && this.marker) {
      this.dispatchEvent(new CustomEvent('submit', {
        detail: {
          location: this.marker.getLngLat(),
        }
      }));
    }
  }

  render() {
    return html`
      <dt-modal
        .title=${this.metadata?.label}
        ?isopen=${this.isOpen}
        hideButton
        @close=${this.onClose}
      >
        <div slot="content">
          <div class="map" id="map"></div>
        </div>

        ${this.canEdit ? html`<div slot="close-button">${msg('Save')}</div>` : null}
      </dt-modal>

      <link href='https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css' rel='stylesheet' />
    `;
  }
}

window.customElements.define('dt-map-modal', DtMapModal);

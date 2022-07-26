import { css, html } from 'lit';
import DtBase from '../../dt-base.js';
import '../../layout/dt-modal/dt-modal.js';

export class DtMapModal extends DtBase {
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      isOpen: { type: Boolean },
      metadata: { type: Object },
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
    });
    this.addEventListener('close', (e) => {
      this.shadowRoot.querySelector('dt-modal').dispatchEvent(new Event('close'));
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('mapboxToken') && this.mapboxToken) {
      window.mapboxgl.accessToken = this.mapboxToken;
    }

    if (changedProperties.has('metadata') && this.metadata && this.metadata.lat) {
      const { lng, lat, level } = this.metadata;
      let zoom = 15
      if ('admin0' === level) {
        zoom = 3
      } else if ('admin1' === level) {
        zoom = 6
      } else if ('admin2' === level) {
        zoom = 10
      }
      const mapContainer = this.shadowRoot.querySelector('#map')
      if (mapContainer) {
        this.map = new window.mapboxgl.Map({
          container: mapContainer,
          style: 'mapbox://styles/mapbox/streets-v12', // style URL
          center: [lng, lat],
          minZoom: 1,
          zoom: zoom
        });
        this.map.on('load', () => this.map.resize());
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(this.map);
      }
    }
  }

  render() {
    return html`      
      <dt-modal
        .title=${this.metadata?.label}
        ?isopen=${this.isOpen}
        hideButton
      >
        <div slot="content">
          <div class="map" id="map"></div>
        </div>
      </dt-modal>
      
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css' rel='stylesheet' />
    `;
  }
}

window.customElements.define('dt-map-modal', DtMapModal);

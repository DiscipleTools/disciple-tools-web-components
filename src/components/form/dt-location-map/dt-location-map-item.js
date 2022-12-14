import { css, html, LitElement } from 'lit';
import '../../icons/dt-icon.js';
import './dt-map-modal.js';

export default class DtLocationMapItem extends LitElement {
  static get properties() {
    return {
      placeholder: { type: String },
      mapboxToken: { type: String, attribute: 'mapbox-token' },
      metadata: { type: Object, reflect: true },
      disabled: { type: Boolean },
    };
  }

  static get styles() {
    return [
      css`
        input {
          color: var(--dt-form-text-color, #000);
          appearance: none;
          background-color: var(--dt-location-map-background-color, #fefefe);
          border: 1px solid var(--dt-location-map-border-color, #fefefe);
          border-radius: var(--dt-location-map-border-radius, 0);
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
        
        .location-item {
          display: flex;
          margin-bottom: 0.5rem;
        }
        .location-item input {
          flex-grow: 1;
        }
        .location-item .input-addon {
          flex-shrink: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
          padding: 10px;
          border: solid 1px gray;
          border-collapse: collapse;
          color: var(--dt-location-map-button-color, #cc4b37);
          background-color: var(--dt-location-map-background-color, buttonface);
          border: 1px solid var(--dt-location-map-border-color, #fefefe);
          border-radius: var(--dt-location-map-border-radius, 0);
          box-shadow: var(
            --dt-location-map-box-shadow,
            var(
              --dt-form-input-box-shadow,
              inset 0 1px 2px hsl(0deg 0% 4% / 10%)
            )
          );
        }
        .location-item .input-addon:hover {
          background-color: var(--dt-location-map-button-hover-background-color, #cc4b37);
          color: var(--dt-location-map-button-hover-color, #ffffff);
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
    ];
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

  render() {
    const existingValue = !!this.metadata?.label;
    return html`
      <div class="location-item">
        <input 
          type="text"
          class="${this.disabled ? 'disabled' : null}"
          placeholder="${this.placeholder}"
          value="${this.metadata?.label}"
          .disabled=${existingValue || this.disabled}
          @change=${this._change}
        />
        
        ${existingValue ? html`
        <button 
          class="input-addon" 
          @click=${this._openMapModal}
          ?disabled=${this.disabled}
        >
          <dt-icon icon="mdi:map" />
        </button>
        <button 
          class="input-addon" 
          @click=${this._delete}
          ?disabled=${this.disabled}
        >
          <dt-icon icon="mdi:trash-can-outline" />
        </button>
        ` : null }
      </div>
      
      ${this.metadata ? html`
      <dt-map-modal 
        .metadata=${this.metadata} 
        mapbox-token="${this.mapboxToken}" 
      />
      ` : null}
      
`;
  }
}
window.customElements.define('dt-location-map-item', DtLocationMapItem);

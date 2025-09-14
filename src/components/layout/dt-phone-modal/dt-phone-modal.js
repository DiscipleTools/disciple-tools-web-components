import { html, css } from 'lit';
import { msg } from '@lit/localize';
import DtBase from '../../dt-base.js';
import '../dt-modal/dt-modal.js';
import '../../icons/dt-icon.js';

/**
 * Modal component for phone messaging services integration
 * Displays options to open phone numbers with various messaging apps
 */
export class DtPhoneModal extends DtBase {
  static get styles() {
    return css`
      :host {
        display: none;
      }

      dt-modal {
        --dt-modal-padding: 1rem;
      }

      .messaging-services {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .messaging-service {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        margin: 0.5rem 0;
        border: 1px solid var(--dt-form-border-color, #ccc);
        border-radius: 0.25rem;
        background: var(--dt-form-background-color, #fff);
        text-decoration: none;
        color: inherit;
        min-height: 60px;
        transition: background-color 0.2s ease;
      }

      .messaging-service:hover {
        background: var(--dt-form-hover-background-color, #f5f5f5);
      }

      .messaging-service:focus {
        outline: 2px solid var(--dt-form-focus-color, #0073aa);
        outline-offset: 2px;
      }

      .service-icon {
        width: 24px;
        height: 24px;
        margin-right: 0.75rem;
        flex-shrink: 0;
      }

      .service-text {
        flex-grow: 1;
        font-size: 1rem;
      }

      .phone-number {
        font-weight: bold;
        color: var(--dt-form-text-color, #333);
      }

      .service-name {
        color: var(--dt-form-text-color-secondary, #666);
      }
    `;
  }

  static get properties() {
    return {
      phoneNumber: { type: String },
      isOpen: { type: Boolean },
      messagingServices: { type: Object },
    };
  }

  constructor() {
    super();
    this.phoneNumber = '';
    this.isOpen = false;
    this.messagingServices = this._getDefaultMessagingServices();
  }

  _getDefaultMessagingServices() {
    return {
      phone: {
        name: 'Phone',
        icon: 'mdi:phone',
        link: 'tel:PHONE_NUMBER',
      },
      whatsapp: {
        name: 'WhatsApp',
        icon: 'mdi:whatsapp',
        link: 'https://wa.me/PHONE_NUMBER_NO_PLUS',
      },
      viber: {
        name: 'Viber',
        icon: 'mdi:viber',
        link: 'viber://chat?number=PHONE_NUMBER',
      },
      signal: {
        name: 'Signal',
        icon: 'mdi:signal',
        link: 'sgnl://signal.me/#p/PHONE_NUMBER',
      },
      telegram: {
        name: 'Telegram',
        icon: 'mdi:telegram',
        link: 'https://t.me/PHONE_NUMBER_NO_PLUS',
      },
    };
  }

  open(phoneNumber) {
    this.phoneNumber = phoneNumber;
    this.isOpen = true;
    this.style.display = 'block';
    
    // Open the modal
    this.updateComplete.then(() => {
      const modal = this.shadowRoot.querySelector('dt-modal');
      if (modal) {
        modal.dispatchEvent(new CustomEvent('open'));
      }
    });
  }

  close() {
    this.isOpen = false;
    this.style.display = 'none';
    
    // Close the modal
    const modal = this.shadowRoot.querySelector('dt-modal');
    if (modal) {
      modal.dispatchEvent(new CustomEvent('close'));
    }
  }

  _handleModalClose() {
    this.close();
  }

  _createServiceLink(service, phoneNumber) {
    // Clean phone number - remove all non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, ''); 
    // For PHONE_NUMBER_NO_PLUS, remove the leading 1 if it's a US/CA number
    const cleanNumberNoPlus = cleanNumber.startsWith('1') ? cleanNumber.substring(1) : cleanNumber;
    
    return service.link
      .replace(/PHONE_NUMBER_NO_PLUS/g, cleanNumberNoPlus)
      .replace(/PHONE_NUMBER/g, phoneNumber);
  }

  _renderMessagingService(serviceKey, service) {
    const link = this._createServiceLink(service, this.phoneNumber);
    
    return html`
      <a 
        href="${link}" 
        class="messaging-service"
        target="_blank"
        rel="noopener noreferrer"
        @click=${this.close}
      >
        <dt-icon 
          icon="${service.icon}" 
          class="service-icon"
          alt="${service.name} icon"
        ></dt-icon>
        <div class="service-text">
          ${msg('Open')} <span class="phone-number">${this.phoneNumber}</span> 
          ${msg('with')} <span class="service-name">${service.name}</span>
        </div>
      </a>
    `;
  }

  _renderMessagingServices() {
    // Add iMessage for Apple devices
    const services = { ...this.messagingServices };
    
    // Check if user is on Apple device
    const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.platform) || 
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isApple) {
      services.imessage = {
        name: 'iMessage',
        icon: 'mdi:message-text',
        link: 'imessage:PHONE_NUMBER',
      };
    }

    return Object.entries(services).map(([key, service]) => 
      this._renderMessagingService(key, service)
    );
  }

  render() {
    if (!this.isOpen) {
      return html``;
    }

    return html`
      <dt-modal
        title="${msg('Send a Message')}"
        bottom
        hide-button
        close-button
        @close=${this._handleModalClose}
      >
        <div slot="content">
          <div class="messaging-services">
            ${this._renderMessagingServices()}
          </div>
        </div>
      </dt-modal>
    `;
  }
}

window.customElements.define('dt-phone-modal', DtPhoneModal);
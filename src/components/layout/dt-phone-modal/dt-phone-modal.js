import { html, css } from 'lit';
import { msg } from '@lit/localize';
import DtBase from '../../dt-base.js';
import '../dt-modal/dt-modal.js';

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
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .service-icon svg {
        width: 100%;
        height: 100%;
        color: var(--dt-form-text-color, #333);
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
    this.messagingServices = DtPhoneModal._getDefaultMessagingServices();
  }

  static _getDefaultMessagingServices() {
    return {
      phone: {
        name: 'Phone',
        icon: 'phone',
        link: 'tel:PHONE_NUMBER',
      },
      whatsapp: {
        name: 'WhatsApp',
        icon: 'whatsapp',
        link: 'https://wa.me/PHONE_NUMBER_NO_PLUS',
      },
      viber: {
        name: 'Viber',
        icon: 'viber',
        link: 'viber://chat?number=PHONE_NUMBER',
      },
      signal: {
        name: 'Signal',
        icon: 'signal',
        link: 'sgnl://signal.me/#p/PHONE_NUMBER',
      },
      telegram: {
        name: 'Telegram',
        icon: 'telegram',
        link: 'https://t.me/PHONE_NUMBER_NO_PLUS',
      },
    };
  }

  static _getSvgIcon(iconName) {
    const icons = {
      phone: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
        </svg>
      `,
      whatsapp: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z" />
        </svg>
      `,
      viber: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.4 0C9.6.1 5.4.7 3.6 4.4C2.6 6.4 2.6 8.8 2.6 11.4C2.6 14 2.6 16.4 3.6 18.4C5.4 22.1 9.6 22.7 11.4 22.8H11.5C13.3 22.7 17.5 22.1 19.3 18.4C20.3 16.4 20.3 14 20.3 11.4C20.3 8.8 20.3 6.4 19.3 4.4C17.5.7 13.3.1 11.5 0H11.4M11.5 1.8C13 1.9 16.7 2.4 18.1 5.5C18.9 7.2 18.9 9.3 18.9 11.4S18.9 15.6 18.1 17.3C16.7 20.4 13 20.9 11.5 21C10 20.9 6.3 20.4 4.9 17.3C4.1 15.6 4.1 13.5 4.1 11.4S4.1 7.2 4.9 5.5C6.3 2.4 10 1.9 11.5 1.8M8.3 6.7C8.1 6.7 7.8 6.8 7.6 7C7.4 7.2 6.9 7.7 6.9 8.6C6.9 9.5 7.6 10.3 7.7 10.5C7.8 10.6 9.1 12.6 11.1 13.5C11.5 13.7 11.8 13.8 12.1 13.9C12.5 14 12.9 14 13.2 13.9C13.6 13.8 14.3 13.4 14.5 13S14.5 12.4 14.4 12.3C14.4 12.2 14.2 12.1 14 12C13.7 11.9 12.9 11.5 12.7 11.4C12.5 11.3 12.4 11.3 12.2 11.5C12 11.7 11.7 12.1 11.6 12.2C11.4 12.4 11.3 12.4 11.1 12.3C10.8 12.2 10.2 12 9.5 11.4C9 10.9 8.7 10.3 8.6 10.1C8.5 9.9 8.6 9.8 8.7 9.7C8.8 9.6 8.9 9.5 9 9.4C9.1 9.3 9.1 9.2 9.2 9.1C9.2 9 9.2 8.9 9.1 8.8C9.1 8.7 8.7 7.9 8.5 7.5C8.4 7.1 8.2 7.1 8.1 7.1C8 7.1 7.9 7.1 7.8 7.1L8.3 6.7M9.8 8.5C9.9 8.5 10 8.6 10 8.8S9.9 9.1 9.8 9.1 9.6 9 9.6 8.8 9.7 8.5 9.8 8.5M10.6 8.5C10.7 8.5 10.8 8.6 10.8 8.8S10.7 9.1 10.6 9.1 10.4 9 10.4 8.8 10.5 8.5 10.6 8.5M11.4 8.5C11.5 8.5 11.6 8.6 11.6 8.8S11.5 9.1 11.4 9.1 11.2 9 11.2 8.8 11.3 8.5 11.4 8.5Z" />
        </svg>
      `,
      signal: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
        </svg>
      `,
      telegram: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
        </svg>
      `,
      imessage: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12C2,13.11 2.13,14.19 2.36,15.23L2.42,15.5C2.67,16.74 3.18,17.86 3.82,18.9C4.74,20.36 5.91,21.58 7.5,22.47C8.73,23.13 10.11,23.72 11.64,23.97C11.74,24 11.87,24 12,24C12.13,24 12.26,24 12.36,23.97C13.89,23.72 15.27,23.13 16.5,22.47C18.09,21.58 19.26,20.36 20.18,18.9C20.82,17.86 21.33,16.74 21.58,15.5L21.64,15.23C21.87,14.19 22,13.11 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,12.86 19.9,13.69 19.71,14.5C19.5,15.44 19.08,16.32 18.5,17.13C17.68,18.33 16.69,19.33 15.5,20.07C14.56,20.68 13.5,21.15 12.36,21.34C12.25,21.36 12.13,21.36 12,21.36C11.87,21.36 11.75,21.36 11.64,21.34C10.5,21.15 9.44,20.68 8.5,20.07C7.31,19.33 6.32,18.33 5.5,17.13C4.92,16.32 4.5,15.44 4.29,14.5C4.1,13.69 4,12.86 4,12A8,8 0 0,1 12,4M7,9V11H9V9H7M11,9V11H13V9H11M15,9V11H17V9H15Z" />
        </svg>
      `,
    };
    return icons[iconName] || html`<div style="width: 24px; height: 24px;"></div>`;
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

  static _createServiceLink(service, phoneNumber) {
    // Clean phone number - remove all non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    // For PHONE_NUMBER_NO_PLUS, remove the leading 1 if it's a US/CA number
    const cleanNumberNoPlus = cleanNumber.startsWith('1')
      ? cleanNumber.substring(1)
      : cleanNumber;

    return service.link
      .replace(/PHONE_NUMBER_NO_PLUS/g, cleanNumberNoPlus)
      .replace(/PHONE_NUMBER/g, phoneNumber);
  }

  _renderMessagingService(serviceKey, service) {
    const link = DtPhoneModal._createServiceLink(service, this.phoneNumber);

    return html`
      <a
        href="${link}"
        class="messaging-service"
        target="_blank"
        rel="noopener noreferrer"
        @click=${this.close}
      >
        <div class="service-icon" title="${service.name} icon">
          ${DtPhoneModal._getSvgIcon(service.icon)}
        </div>
        <div class="service-text">
          ${msg('Open')}
          <span class="phone-number">${this.phoneNumber}</span> ${msg('with')}
          <span class="service-name">${service.name}</span>
        </div>
      </a>
    `;
  }

  _renderMessagingServices() {
    // Add iMessage for Apple devices
    const services = { ...this.messagingServices };

    // Check if user is on Apple device
    const isApple =
      /Mac|iPhone|iPad|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isApple) {
      services.imessage = {
        name: 'iMessage',
        icon: 'imessage',
        link: 'imessage:PHONE_NUMBER',
      };
    }

    return Object.entries(services).map(([key, service]) =>
      this._renderMessagingService(key, service),
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

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
        display: block;
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
      line: {
        name: 'LINE',
        icon: 'line',
        link: 'line://ti/p/~PHONE_NUMBER',
      },
    };
  }

  static _getSvgIcon(iconName) {
    const icons = {
      phone: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"
          />
        </svg>
      `,
      whatsapp: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z"
          />
        </svg>
      `,
      viber: html`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          viewBox="0 0 52.511 52.511"
        >
          <path
            d="M31.256 0H21.254C10.778 0 2.255 8.521 2.255 18.995v9.01c0 7.8 4.793 14.81 12 17.665v5.841a.999.999 0 0 0 1.671.741L21.725 47h9.531c10.476 0 18.999-8.521 18.999-18.995v-9.01C50.255 8.521 41.732 0 31.256 0zm16.999 28.005C48.255 37.376 40.63 45 31.256 45h-9.917a.998.998 0 0 0-.671.259l-4.413 3.997v-4.279a.997.997 0 0 0-.667-.942 17.03 17.03 0 0 1-11.333-16.03v-9.01C4.255 9.624 11.881 2 21.254 2h10.002c9.374 0 16.999 7.624 16.999 16.995v9.01z"
          />
          <path
            d="m39.471 30.493-6.146-3.992a2.994 2.994 0 0 0-4.15.88l-.289.444c-2.66-.879-5.593-2.002-7.349-7.085l.727-.632a3.005 3.005 0 0 0 .294-4.233l-4.808-5.531a1.001 1.001 0 0 0-1.411-.099l-3.019 2.624c-2.648 2.302-1.411 5.707-1.004 6.826.018.05.04.098.066.145.105.188 2.612 4.662 6.661 8.786 4.065 4.141 11.404 7.965 11.629 8.076a5.006 5.006 0 0 0 6.916-1.47l2.178-3.354c.3-.465.168-1.084-.295-1.385zm-3.561 3.649c-.901 1.388-2.763 1.782-4.233.834-.073-.038-7.364-3.835-11.207-7.75-3.592-3.659-5.977-7.724-6.302-8.291-.792-2.221-.652-3.586.464-4.556l2.265-1.968 4.152 4.776a.99.99 0 0 1-.096 1.411l-1.227 1.066a.999.999 0 0 0-.3 1.049c2.092 6.798 6.16 8.133 9.13 9.108l.433.143a.996.996 0 0 0 1.155-.403l.709-1.092a.988.988 0 0 1 .63-.434.99.99 0 0 1 .753.143l5.308 3.447-1.634 2.517zM28.538 16.247a1 1 0 1 0-.548 1.923 4.524 4.524 0 0 1 3.097 3.104 1 1 0 0 0 1.925-.542 6.538 6.538 0 0 0-4.474-4.485z"
          />
          <path
            d="M36.148 22.219a1 1 0 0 0 .963-1.271c-1.18-4.183-4.509-7.519-8.689-8.709a1 1 0 0 0-.547 1.924c3.517 1 6.318 3.809 7.311 7.328a1 1 0 0 0 .962.728z"
          />
          <path
            d="M27.991 7.582a1 1 0 1 0-.548 1.924c5.959 1.695 10.706 6.453 12.388 12.416a1 1 0 0 0 1.925-.542c-1.869-6.627-7.143-11.913-13.765-13.798z"
          />
        </svg>
      `,
      signal: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #000;
                stroke-linejoin: round;
                stroke-width: 1.9px;
              }
            </style>
          </defs>
          <path
            d="M27.32 45.25a23.08 23.08 0 0 1-3.32.25 22.26 22.26 0 0 1-3.26-.25m14.44-2.88a21 21 0 0 1-6.08 2.51m12.26-8.18a21.63 21.63 0 0 1-4.66 4.65m5.65-6.16 2.54-6.08a21.25 21.25 0 0 1-2.52 6.07m2.88-14.42A23.33 23.33 0 0 1 45.5 24a22.43 22.43 0 0 1-.25 3.28m-42.46 0A22.46 22.46 0 0 1 2.5 24a22.43 22.43 0 0 1 .25-3.28m39.63-7.89a21.7 21.7 0 0 1 2.51 6.08m-41.69 0a21.19 21.19 0 0 1 2.52-6.06m31-6.2a21.19 21.19 0 0 1 4.66 4.65m-34.71 0a21.63 21.63 0 0 1 4.63-4.66M29.09 3.1a21.57 21.57 0 0 1 6.07 2.53m-22.33 0a21.07 21.07 0 0 1 6.09-2.51m1.84-.37A21.88 21.88 0 0 1 24 2.5a22.29 22.29 0 0 1 3.27.25M18.87 44.87a20.92 20.92 0 0 1-5-1.95l-2.24.51M4.61 36.38l.51-2.2a21.7 21.7 0 0 1-2-5M10 43.85l-4.08 1a2.19 2.19 0 0 1-2.66-1.56 2.27 2.27 0 0 1 0-1.1l1-4.08M24 6.41a17.59 17.59 0 0 0-14.83 27l-1.65 7.1 7.16-1.64A17.59 17.59 0 1 0 24 6.41Z"
            class="cls-1"
          />
        </svg>
      `,
      telegram: html`
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"
          />
        </svg>
      `,
      imessage: html`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          style="enable-background:new 0 0 100 100"
          version="1.1"
          viewBox="0 0 100 88"
        >
          <path
            d="M40.499 80.726c3.061.433 6.119.723 9.325.723 26.509 0 48.067-17.798 48.067-39.647S76.48 2.299 49.968 2.299C23.458 2.299 1.9 20.098 1.9 41.946c0 14.325 9.176 26.769 22.869 33.715v1.447c0 4.197-6.993 9.694-6.557 9.694 6.993 0 11.947-4.34 15.297-5.353 2.767-.723 4.369-.87 6.99-.723Z"
            style="fill:#000;stroke-width:1"
          />
        </svg>
      `,
      line: html`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.5 0 32 32">
          <path
            d="M 10.485 0.144 C 19.29 0.144 26.379 6.192 26.379 13.704 C 26.379 17.363 24.664 20.582 21.977 23.118 C 17.62 27.653 10.113 32.24 9.326 31.898 C 8.03 31.361 10.3 28.434 9.372 27.166 C 9.233 26.973 8.724 27.02 7.796 26.874 C 0.151 25.8 -5.317 20.483 -5.317 13.656 C -5.317 6.142 1.725 0.144 10.484 0.144 L 10.485 0.144 Z M 1.451 18.191 L 4.139 18.191 C 4.602 18.191 4.879 17.8 4.879 17.311 C 4.879 16.97 4.65 16.532 4.043 16.532 L 1.868 16.532 C 1.681 16.532 1.681 16.336 1.681 15.652 L 1.681 10.726 C 1.681 10.288 1.402 9.848 0.895 9.848 C 0.431 9.848 0.107 10.238 0.107 10.726 L 0.107 16.678 C 0.107 17.995 0.71 18.191 1.451 18.191 Z M 7.519 17.509 L 7.519 10.728 C 7.521 10.242 7.146 9.847 6.685 9.85 C 6.268 9.85 5.897 10.239 5.897 10.728 L 5.897 17.509 C 5.897 17.947 6.221 18.288 6.732 18.288 C 7.149 18.288 7.519 17.947 7.519 17.509 Z M 15.119 16.581 L 15.119 10.631 C 15.119 10.191 14.795 9.85 14.283 9.85 C 13.913 9.85 13.497 10.093 13.497 10.631 L 13.497 14.923 L 10.808 10.972 C 10.437 10.288 9.974 9.85 9.416 9.85 C 8.723 9.85 8.675 10.434 8.675 11.263 L 8.675 17.508 C 8.675 17.945 9.001 18.287 9.463 18.287 C 9.88 18.287 10.251 17.994 10.251 17.508 L 10.251 13.067 L 12.939 17.018 C 13.541 17.848 13.681 18.287 14.421 18.287 C 14.932 18.287 15.118 17.799 15.118 16.579 L 15.119 16.581 Z M 20.308 13.216 L 17.945 13.216 L 17.945 11.802 C 17.945 11.655 17.992 11.46 18.223 11.46 L 20.308 11.46 C 20.819 11.46 21.144 11.167 21.144 10.632 C 21.144 9.997 20.678 9.801 20.262 9.801 L 17.574 9.801 C 16.739 9.801 16.323 10.389 16.323 11.168 L 16.323 16.679 C 16.323 17.655 16.694 18.192 17.574 18.192 L 20.308 18.192 C 20.911 18.192 21.144 17.802 21.144 17.313 C 21.144 16.679 20.678 16.484 20.308 16.484 L 18.269 16.484 C 18.084 16.484 17.945 16.337 17.945 16.191 L 17.945 14.825 L 20.4 14.825 C 21.001 14.825 21.095 14.337 21.095 13.997 C 21.095 13.508 20.724 13.216 20.308 13.216 Z"
            style=""
          />
        </svg>
      `,
    };
    return (
      icons[iconName] || html`<div style="width: 24px; height: 24px;"></div>`
    );
  }

  open(phoneNumber) {
    this.phoneNumber = phoneNumber;
    this.isOpen = true;
    this.setAttribute('open', '');

    // Open the modal
    this.updateComplete.then(() => {
      const modal = this.shadowRoot.querySelector('dt-modal');
      if (modal) {
        modal.dispatchEvent(new CustomEvent('open'));
      }
    });
  }

  close() {
    if (!this.isOpen) {
      return; // Already closed, prevent infinite loop
    }

    this.isOpen = false;
    this.removeAttribute('open');

    // Close the modal without triggering another close event
    const modal = this.shadowRoot.querySelector('dt-modal');
    if (modal) {
      modal._closeModal(); // Call internal close method directly
    }
  }

  _handleModalClose() {
    // Don't call close() to avoid infinite loop
    // Just update our state
    this.isOpen = false;
    this.removeAttribute('open');
  }

  static _createServiceLink(service, phoneNumber) {
    // Remove hidden Unicode characters (e.g., LRM, RLM, etc.) and clean phone number
    const sanitized = phoneNumber.replace(
      /[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g,
      '',
    );
    // Clean phone number - remove all non-digit characters
    const cleanNumber = sanitized.replace(/\D/g, '');
    // For PHONE_NUMBER_NO_PLUS, remove the leading 1 if it's a US/CA number
    const cleanNumberNoPlus = cleanNumber.startsWith('1')
      ? cleanNumber.substring(1)
      : cleanNumber;

    let resultLink = service.link;
    // For Viber, encode + as %2B
    if (service.icon === 'viber') {
      // Use sanitized number, but encode + if present
      const viberNumber = sanitized.startsWith('+')
        ? `%2B${sanitized.substring(1)}`
        : sanitized;
      resultLink = resultLink.replace(/PHONE_NUMBER/g, viberNumber);
    } else {
      resultLink = resultLink
        .replace(/PHONE_NUMBER_NO_PLUS/g, cleanNumberNoPlus)
        .replace(/PHONE_NUMBER/g, sanitized);
    }
    return resultLink;
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
        .hideButton=${true}
        .closeButton=${true}
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

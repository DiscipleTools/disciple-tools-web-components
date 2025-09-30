import { css, LitElement } from 'lit';

export class DtSpinner extends LitElement {
  static get styles() {
    return css`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
      :host::before {
        content: '';
        animation: spin 1s linear infinite;
        border: var(--dt-spinner-thickness, 0.25rem) solid
          var(--dt-spinner-color-1, #919191);
        border-radius: 50%;
        border-top-color: var(--dt-spinner-color-2, #000);
        display: inline-block;
        height: var(--dt-spinner-size, 1rem);
        width: var(--dt-spinner-size, 1rem);
      }
    `;
  }
}

window.customElements.define('dt-spinner', DtSpinner);

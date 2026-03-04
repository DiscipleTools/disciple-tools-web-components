import { css, LitElement } from 'lit';

export class DtCheckmark extends LitElement {
  static get styles() {
    return css`
      :host {
        margin-top: -0.25rem;
        width: 2rem;
      }
      :host::before {
        content: '';
        transform: rotate(45deg);
        height: 1rem;
        width: 0.5rem;
        color: inherit;
        border-bottom: var(--dt-checkmark-width, 3px) solid currentcolor;
        border-right: var(--dt-checkmark-width, 3px) solid currentcolor;
      }
    `;
  }
}

window.customElements.define('dt-checkmark', DtCheckmark);

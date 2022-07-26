import { html, css, LitElement } from 'lit';

import '../../styles/light.css' assert { type: 'css' }; // eslint-disable-line

export class DtTextField extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--color-text, #000);
      }
    `;
  }

  static get properties() {
    return {
      id: { type: String },
      name: { type: String },
      value: { type: String },
      disabled: { type: Boolean },
      icon: { type: String },
      loading: { type: Boolean },
      saved: { type: Boolean },
      onchange: { type: String },
    };
  }

  constructor() {
    super();
    this.id = 'name';
    this.name = 'Name';
    this.value = 'John Doe';
    this.icon = 'images/icons/user.svg';
  }

  onChange(e) {
    this.value = e.target.value;

    console.log('updated');

    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }
  render() {
    return html`
      <div class="section-subheader">
          <img class="dt-icon" src="${this.icon}" alt="${this.name} icon">
          ${this.name}
          ${this.loading
        ? html`<div class="icon-overlay loading-spinner"></div>`
        : null}
          <!-- location add -->
      </div>
      <input
      id="${this.id}"
      aria-label="${this.name}"
      type="text"
      ?disabled=${this.disabled}
      class="text-input"
      value="${this.value}"
      @change=${this.onChange}
      />
    `;
  }
}

window.customElements.define('dt-text', DtTextField);

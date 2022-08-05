import { html, LitElement } from 'lit';
import './dt-label/dt-label.js';

export default class DtFormBase extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      icon: { type: String },
      private: { type: Boolean },
      privateLabel: { type: String },
    };
  }

  labelTemplate() {
    return html`
      <dt-label
        ?private=${this.private}
        privateLabel="${this.privateLabel}"
        icon="${this.icon}"
      >
        ${!this.icon ? html`<slot name="icon-start" slot="icon-start"></slot>` : null}
        ${this.label}
      </dt-label>
    `;
  }

  render() {
    return html`
      ${this.labelTemplate()}
      <slot></slot>
    `;
  }
}

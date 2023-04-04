import { css, html } from 'lit';
import DtBase from '../dt-base.js';
import 'iconify-icon';

export class DtIcon extends DtBase {
  static get styles() {
    return css`
      :root {
        font-size: inherit;
        color: inherit;
        display: inline-flex;
        width: fit-content;
        height: fit-content;
      }
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      icon: { type: String },
    };
  }

  render() {
    return html` <iconify-icon icon=${this.icon}></iconify-icon> `;
  }
}

window.customElements.define('dt-icon', DtIcon);

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
        position: relative;
      }
      .tooltip {
        position: absolute;
        right: 0px;
        top: 100%;
        min-width: 150px;
        border: solid 1px currentcolor;
        background-color: #ffffff99;
        padding: 5px;
        border-radius: 5px;
        text-align: right;
        z-index: 1;
        display:none;
      }
      .tooltip:before {
        position: absolute;
        right: 10px;
        top: -10px;
        content: " ";
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent currentcolor transparent;
      }
      iconify-icon:hover + .tooltip {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      icon: { type: String },
      tooltip: { type: String },
      size: { type: String },
    };
  }

  render() {
    const tooltip = this.tooltip ? html`<div class="tooltip">${this.tooltip}</div>` : null;
    return html`
      <iconify-icon icon=${this.icon} width="${this.size}"></iconify-icon>
      ${tooltip}
    `;
  }
}

window.customElements.define('dt-icon', DtIcon);

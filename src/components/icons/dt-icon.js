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
        text-align: end;
        z-index: 1;
        display:block;
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
      .tooltip[hidden] {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      icon: { type: String },
      tooltip: { type: String },
      tooltip_open: { type: Boolean },
      size: { type: String },
    };
  }

  _showTooltip() {
    if (this.tooltip_open){
      this.tooltip_open = false;
    } else {
      this.tooltip_open = true;
    }
  }

  render() {
    const tooltip = this.tooltip ? html`<div class="tooltip" ?hidden=${this.tooltip_open}>${this.tooltip}</div>` : null;
    return html`
      <iconify-icon icon=${this.icon} width="${this.size}" @click=${this._showTooltip}></iconify-icon>
      ${tooltip}
    `;
  }
}

window.customElements.define('dt-icon', DtIcon);

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
        right: 20px;
        top: -50%;
        min-width: max-content;
        border: solid 1px currentcolor;
        background-color: var(--dt-form-background-color, var(--surface-1));
        padding: .25rem;
        border-radius: .25rem;
        text-align: end;
        z-index: 1;
        display:block;
      }
      .tooltip:before {
        position: absolute;
        right: .7rem;
        top: 1.45rem;
        content: " ";
        border-width: .25rem;
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

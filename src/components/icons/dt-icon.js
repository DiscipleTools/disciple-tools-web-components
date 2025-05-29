import { css, html } from 'lit';
import DtBase from '../dt-base.js';
import 'iconify-icon';

export class DtIcon extends DtBase {
  static get styles() {
    return css`
      :root, .icon-container {
        font-size: inherit;
        color: inherit;
        display: inline-flex;
        width: fit-content;
        height: fit-content;
        position: relative;
        font-family: var(--font-family);
      }
      .tooltip {
        --tt-padding: 0.25rem;
        position: absolute;
        right: 0px;
        top: calc(-1lh - var(--tt-padding) - var(--tt-padding) - 4px);
        min-width: max-content;
        border: solid 1px currentcolor;
        background-color: var(--dt-form-background-color, var(--surface-1));
        padding: var(--tt-padding);
        border-radius: .25rem;
        text-align: end;
        z-index: 1;
        display:block;
      }
      .tooltip:before {
        position: absolute;
        right: .7rem;
        top: calc(1lh + var(--tt-padding) + var(--tt-padding) + 1px);
        content: " ";
        border-width: .25rem;
        border-style: solid;
        border-color: currentcolor transparent transparent transparent;
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
      <div class="icon-container">
      <iconify-icon icon=${this.icon} width="${this.size}" @click=${this._showTooltip}></iconify-icon>
      ${tooltip}
      </div>
    `;
  }
}

window.customElements.define('dt-icon', DtIcon);

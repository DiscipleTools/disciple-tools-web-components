import { css, html } from 'lit';
import DtBase from '../dt-base.js';
import 'iconify-icon';
import { classMap } from 'lit/directives/class-map.js';

export class DtIcon extends DtBase {
  static get styles() {
    return css`
      :root,
      .icon-container {
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
        border-radius: 0.25rem;
        text-align: end;
        z-index: 1;
        display: block;
      }
      .tooltip:before {
        position: absolute;
        right: 0.7rem;
        top: calc(1lh + var(--tt-padding) + var(--tt-padding) + 1px);
        content: ' ';
        border-width: 0.25rem;
        border-style: solid;
        border-color: currentcolor transparent transparent transparent;
      }
      .tooltip[hidden] {
        display: none;
      }

      .tooltip.slotted .attr-msg {
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
      slotted: { type: Boolean, attribute: false },
    };
  }

  firstUpdated() {
    // handle img or svg content that may be bigger than the space allotted
    const slot = this.shadowRoot.querySelector('slot[name=tooltip]');
    slot.addEventListener('slotchange', event => {
      const changedSlot = event.target;
      const nodes = changedSlot.assignedNodes();
      let value = false;
      // dt-icon has a nested slot that comes from the form-base and is passed along,
      // so we need to check if slot is a slot and then check if that has assignedNodes.
      if (nodes.length > 0) {
        if (nodes[0].tagName === 'SLOT') {
          value = nodes[0].assignedNodes().length > 0;
        } else {
          value = true;
        }
      } else {
        console.log('Slot content changed and is now empty. ' + nodes.length);
      }
      this.slotted = value;
    });
  }

  _showTooltip() {
    if (this.tooltip_open) {
      this.tooltip_open = false;
    } else {
      this.tooltip_open = true;
    }
  }

  tooltipClasses() {
    return {
      tooltip: true,
      slotted: this.slotted,
    };
  }

  render() {
    const tooltip = this.tooltip
      ? html`<div
          class="${classMap(this.tooltipClasses())}"
          ?hidden=${this.tooltip_open}
        >
          <slot name="tooltip"></slot>
          <span class="attr-msg">${this.tooltip}</span>
        </div>`
      : null;
    return html`
      <div class="icon-container">
        <iconify-icon
          icon=${this.icon}
          width="${this.size}"
          @click=${this._showTooltip}
        ></iconify-icon>
        ${tooltip}
      </div>
    `;
  }
}

window.customElements.define('dt-icon', DtIcon);

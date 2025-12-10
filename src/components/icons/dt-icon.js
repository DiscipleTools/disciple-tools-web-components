import { css, html } from 'lit';
import DtBase from '../dt-base.js';
import 'iconify-icon';
import { classMap } from 'lit/directives/class-map.js';

export class DtIcon extends DtBase {
  static get styles() {
    return css`
      :root {
        pointer-events: none;
      }
      :root,
      .icon-container {
        font-size: inherit;
        color: inherit;
        display: inline-flex;
        width: fit-content;
        height: fit-content;
        position: relative;
        font-family: var(--font-family);
        pointer-events: auto;
      }
      .tooltip {
        --tt-padding: 0.25rem;
        position: absolute;
        right: 0px;
        top: calc(-1lh - var(--tt-padding) - var(--tt-padding) - 4px);
        min-width: max-content;
        border: solid 1px currentcolor;
        background-color: color(
          from var(--dt-form-background-color, var(--surface-1)) srgb 1 1 1 /
            0.7
        );
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

      .tooltip:hover {
        opacity: 0.25;
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
    // Check if tooltip slot has any content to add CSS class and
    // hide standard tooltip content
    const slot = this.shadowRoot.querySelector('slot[name=tooltip]');
    if (slot) {
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
        }
        this.slotted = value;
      });
    }
  }

  _toggleTooltip() {
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
          @click="${this._toggleTooltip}"
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
          @click=${this._toggleTooltip}
        ></iconify-icon>
        ${tooltip}
      </div>
    `;
  }
}

window.customElements.define('dt-icon', DtIcon);

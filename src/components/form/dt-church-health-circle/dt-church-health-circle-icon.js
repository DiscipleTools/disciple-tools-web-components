import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';

class DtChurchHealthIcon extends DtBase {
  static get styles() {
    return css`
      root {
        display: block;
      }
      .health-item img {
        width: var(--d);
        height: var(--d);
        filter: grayscale(1) opacity(0.75);
      }
      .health-item--active img {
        filter: none !important;
      }
    `;
  }

  static get properties() {
    return {
      /* Key of metric to toggle */
      key: { type: String },
      /* Boolean if metric is active */
      active: { type: Boolean, reflect: true },
      /* Override icon if metric icon is missing */
      missingIcon: { type: String },
    };
  }

  render() {
    const {
      metric,
      active,
      missingIcon = `${window.wpApiShare.template_dir}/dt-assets/images/groups/missing.svg`,
    } = this;

    return html`<div
      class=${classMap({
        'health-item': true,
        'health-item--active': active,
      })}
      title="${metric.description}"
      @click="${this._handleClick}"
    >
      <img src="${metric.icon ? metric.icon : missingIcon}" />
    </div>`;
  }

  async _handleClick(e) {
    const active = !this.active;
    this.active = active;

    const event = new CustomEvent('change', {
      detail: {
        key: this.key,
        active,
      },
    });

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);
  }
}

window.customElements.define('dt-church-health-icon', DtChurchHealthIcon);

import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';

class DtChurchHealthIcon extends DtBase {
  static get styles() {
    return css`
      root {
        display: block;
      }
      .health-item {
        padding: 0.5rem;

        img,
        dt-icon {
          width: 100%;
          height: 100%;
        }

        img {
          /* remove color from images and then semi-transparent */
          filter: grayscale(1) opacity(0.75);
        }
        dt-icon {
          /* lesser opacity than images because they start as solid black */
          filter: opacity(0.2);
        }

        &.health-item--active {
          img,
          dt-icon {
            filter: none !important;
          }
        }
      }
    `;
  }

  static get properties() {
    return {
      /* Key of metric to toggle */
      key: { type: String },
      /* Metric object */
      metric: { type: Object },
      /* Boolean if metric is active */
      active: { type: Boolean, reflect: true },
      /* Boolean if metric is disabled */
      disabled: { type: Boolean },
      /* Override icon if metric icon is missing */
      missingIcon: { type: String },
    };
  }

  renderIcon() {
    const templateDir = window?.wpApiShare?.template_dir;
    const {
      metric,
      missingIcon = `${templateDir}/dt-assets/images/groups/missing.svg`,
    } = this;
    if (metric['font-icon']) {
      const iconKey = metric['font-icon'].replace('mdi mdi-', 'mdi:');
      return html`<dt-icon icon="${iconKey}" size="unset"></dt-icon>`;
    }
    return html`<img
      src="${metric.icon ? metric.icon : missingIcon}"
      alt="${metric}"
    />`;
  }

  render() {
    const { metric, active, disabled } = this;

    return html`<div
      class=${classMap({
        'health-item': true,
        'health-item--active': active,
        'health-item--disabled': disabled,
      })}
      title="${metric.description}"
      @click="${this._handleClick}"
    >
      ${this.renderIcon()}
    </div>`;
  }

  async _handleClick(e) {
    if (this.disabled) {
      return;
    }

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

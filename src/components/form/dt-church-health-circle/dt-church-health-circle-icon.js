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
        height: 50px;
        width: 50px;
        filter: grayscale(1) opacity(0.75);
      }
      .health-item--active img {
        filter: none !important;
      }
    `;
  }

  static get properties() {
    return {
      key: { type: String },
      metric: { type: Object },
      group: { type: Object },
      active: { type: Boolean, reflect: true },
      missingIcon: { type: String },
      handleSave: { type: Function },
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

  async _handleClick() {
    if (!this.handleSave) {
      return;
    }

    const active = !this.active;
    this.active = active;
    const payload = {
      health_metrics: {
        values: [
          {
            value: this.key,
            delete: !active,
          },
        ],
      },
    };

    try {
      await this.handleSave(this.group.ID, payload);
    } catch (err) {
      console.error(err);
      return;
    }

    if (active) {
      this.group.health_metrics.push(this.key);
    } else {
      this.group.health_metrics.pop(this.key);
    }
  }
}

window.customElements.define('dt-church-health-icon', DtChurchHealthIcon);

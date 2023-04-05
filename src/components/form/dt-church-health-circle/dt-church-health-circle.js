import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';
import './dt-church-health-circle-icon.js';

export class DtChurchHealthCircle extends DtBase {
  static get styles() {
    return css`
      .health-circle__container {
        --d: 50px; /* image size */
        --rel: 0.5; /* how much extra space we want between images, 1 = one image size */
        --r: calc(1 * var(--d) / var(--tan)); /* circle radius */
        --s: calc(3 * var(--r));

        margin: 1rem auto;
        display: flex;
        justify-content: center;
        align-items: baseline;

        @supports (aspect-ratio) {
          aspect-ratio: 1/1;
        }
        @supports not (aspect-ratio) {
          padding-top: 100%;
          height: 0;
          position: relative;
          overflow: visible;
        }
      }

      .health-circle {
        display: block;
        height: auto;
        border-radius: 100%;
        border: 3px darkgray dashed;
        max-width: 100%;

        @supports not (aspect-ratio) {
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          width: calc(100% - 8px);
          height: auto;
        }
      }

      .health-circle__grid {
        display: inline-block;
        position: relative;
        height: 100%;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        width: var(--s);
        max-width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
      }

      @media (max-width: 519px) {
        .health-circle {
          max-width: 300px;
          min-width: 300px;
        }

        .health-circle__container {
          --r: calc(0.8 * var(--d) / var(--tan)); /* circle radius */
        }
      }

      @media (min-width: 520px) {
        .health-circle__container {
          --r: calc(1.1 * var(--d) / var(--tan)); /* circle radius */
        }
      }

      .health-circle--committed {
        border: 3px #4caf50 solid !important;
      }

      dt-church-health-icon {
        margin: auto;
        position: absolute;
        height: 50px;
        width: 50px;
        border-radius: 100%;
        font-size: 16px;
        color: black;
        text-align: center;
        font-style: italic;
        cursor: pointer;

        position: absolute;
        top: 50%;
        left: 50%;
        margin: calc(-0.5 * var(--d));
        width: var(--d);
        height: var(--d);
        --az: calc(var(--i) * 1turn / var(--m));
        transform: rotate(var(--az)) translate(var(--r))
          rotate(calc(-1 * var(--az)));
      }
    `;
  }

  static get properties() {
    return {
      groupId: { type: Number },
      group: { type: Object, reflect: false },
      settings: { type: Object, reflect: false },
      errorMessage: { type: String, attribute: false },
      missingIcon: { type: String },
      handleSave: { type: Function },
    };
  }

  /**
   * Map fields settings as an array and filter out church commitment
   */
  get metrics() {
    const settings = this.settings || [];

    if (!Object.values(settings).length) {
      return [];
    }

    const entries = Object.entries(settings);

    //We don't want to show church commitment in the circle
    return entries.filter(([key, value]) => key !== 'church_commitment');
  }

  get isCommited() {
    if (!this.group) {
      return false;
    }

    if (!this.group.health_metrics) {
      return false;
    }

    return this.group.health_metrics.includes('church_commitment');
  }

  /**
   * Fetch group data on component load if it's not provided as a property
   */
  connectedCallback() {
    super.connectedCallback();
    this.fetch();
  }

  adoptedCallback() {
    this.distributeItems();
  }

  /**
   * Position the items after the component is rendered
   */
  updated() {
    this.distributeItems();
  }

  /**
   * Fetch the group and settings data if not provided by the server
   */
  async fetch() {
    try {
      const promises = [this.fetchSettings(), this.fetchGroup()];
      let [settings, group] = await Promise.all(promises);
      this.settings = settings;
      this.post = group;
      if (!settings) {
        this.errorMessage = 'Error loading settings';
      }
      if (!group) {
        this.errorMessage = 'Error loading group';
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Fetch the group data if it's not already set
   * @returns
   */
  fetchGroup() {
    if (this.group) {
      return Promise.resolve(this.group);
    }
    fetch(`/wp-json/dt-posts/v2/groups/${this.groupId}`).then(response =>
      response.json()
    );
  }

  /**
   * Fetch the settings data if not already set
   * @returns
   */
  fetchSettings() {
    if (this.settings) {
      return Promise.resolve(this.settings);
    }
    return fetch('/wp-json/dt-posts/v2/groups/settings').then(response =>
      response.json()
    );
  }

  /**
   * Find a metric by key
   * @param {*} key
   * @returns
   */
  findMetric(key) {
    const metric = this.metrics.find(item => item.key === key);
    return metric ? metric.value : null;
  }

  /**
   * Render the component
   * @returns
   */
  render() {
    // Show the spinner if we don't have data
    if (!this.group || !this.metrics.length) {
      return html`<dt-spinner></dt-spinner>`;
    }

    // Setup data
    const practicedItems = this.group.health_metrics || [];

    // Show the error message if we have one
    if (this.errorMessage) {
      html`<dt-alert type="error">${this.errorMessage}</dt-alert>`;
    }

    // Render the group circle
    return html`
      <div class="health-circle__wrapper">
        <div class="health-circle__container">
          <div
            class=${classMap({
              'health-circle': true,
              'health-circle--committed': this.isCommited,
            })}
          >
            <div class="health-circle__grid">
              ${this.metrics.map(
                ([key, metric], index) =>
                  html`<dt-church-health-icon
                    key="${key}"
                    .group="${this.group}"
                    .metric=${metric}
                    .active=${practicedItems.indexOf(key) !== -1}
                    .style="--i: ${index + 1}"
                    .missingIcon="${this.missingIcon}"
                    .handleSave="${this.handleSave}"
                  >
                  </dt-church-health-icon>`
              )}
            </div>
          </div>
        </div>

        <dt-toggle
          name="church-commitment"
          label="${this.settings.church_commitment.label}"
          requiredmessage=""
          icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
          iconalttext="Icon Alt Text"
          privatelabel=""
          @click="${this.toggleClick}"
          ?checked=${this.isCommited}
        >
        </dt-toggle>
      </div>
    `;
  }

  /**
   * Dynamically distribute items in Church Health Circle
   * according to amount of health metric elements
   */
  distributeItems() {
    const container = this.renderRoot.querySelector(
      '.health-circle__container'
    );
    const items = container.querySelectorAll('dt-church-health-icon');

    let n_items = items.length;
    let m = n_items; /* how many are ON the circle */
    let tan = Math.tan(Math.PI / m); /* tangent of half the base angle */

    container.style.setProperty('--m', m);
    container.style.setProperty('--tan', +tan.toFixed(2));
  }

  async toggleClick(e) {
    const { handleSave } = this;

    if (!handleSave) {
      return;
    }

    let toggle = this.renderRoot.querySelector('dt-toggle');
    let church_commitment = toggle.toggleAttribute('checked');
    if (!this.group.health_metrics) {
      this.group.health_metrics = [];
    }

    const payload = {
      health_metrics: {
        values: [
          {
            value: 'church_commitment',
            delete: !church_commitment,
          },
        ],
      },
    };

    try {
      await handleSave(this.group.ID, payload);
    } catch (err) {
      toggle.toggleAttribute('checked', !church_commitment);
      console.error(err);
      return;
    }

    if (church_commitment) {
      this.group.health_metrics.push('church_commitment');
    } else {
      this.group.health_metrics.pop('church_commitment');
    }

    this.requestUpdate();
  }

  _isChecked() {
    if (Object.hasOwn(this.group, 'health_metrics')) {
      if (this.group.health_metrics.includes('church_commitment')) {
        return (this.isChurch = true);
      }
      return (this.isChurch = false);
    }
    return (this.isChurch = false);
  }
}

window.customElements.define('dt-church-health-circle', DtChurchHealthCircle);

import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';
import { DtMultiSelect } from '../dt-multi-select/dt-multi-select.js';
import './dt-church-health-circle-icon.js';
import '../dt-toggle/dt-toggle.js';

export class DtChurchHealthCircle extends DtMultiSelect {
  static get styles() {
    return [
      ...super.styles,
      css`
        .health-circle__container {
          --icon-count: 9;
          /* Updated circle size based on dynamic width */
          --circle-size: var(--container-width, 250px);
          /* Dynamically calculate icon size based on circle size. Max: 125px */
          --icon-size: min(calc(var(--circle-size) / 5), 125px);
          --circle-padding: max(
            0.5rem,
            calc(var(--circle-size) / 250px * 0.5rem)
          );
          --radius: calc(
            0.5 * var(--circle-size) - 0.5 *
              var(--icon-size) - var(--circle-padding)
          ); /* radius from center to icon center, accounting for inner padding */

          margin: 1rem auto;
          display: flex;
          justify-content: center;
          align-items: center;
          width: var(--circle-size);
          height: var(--circle-size);
          position: relative;
          overflow: visible;
        }

        .health-circle {
          display: block;
          border-radius: 100%;
          border: 3px darkgray dashed;
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }

        .health-circle__grid {
          display: inline-block;
          position: relative;
          height: 100%;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .health-circle--committed {
          border: 3px #4caf50 solid !important;
        }
        .health-circle--disabled dt-church-health-icon {
          cursor: not-allowed;
        }

        dt-church-health-icon {
          position: absolute;
          border-radius: 100%;
          font-size: 16px;
          color: black;
          text-align: center;
          font-style: italic;
          cursor: pointer;
          top: 50%;
          left: 50%;
          margin: calc(-0.5 * var(--icon-size));
          width: var(--icon-size);
          height: var(--icon-size);
          --az: calc(var(--i) * 1turn / var(--icon-count));
          transform: rotate(var(--az)) translate(var(--radius))
            rotate(calc(-1 * var(--az)));
        }
      `,
      css`
        dt-toggle::part(root) {
          display: flex;
          align-items: center;
        }
        dt-toggle::part(toggle) {
          padding-top: 0;
        }
        dt-toggle::part(label-container) {
          font-weight: 300;
        }
      `,
      css`
        .icon-overlay {
          inset-inline-end: 0;
        }
        .error-container {
          margin-block-start: 0.5rem;
        }
      `,
    ];
  }

  static get properties() {
    const props = {
      ...super.properties,
      settings: { type: Object, reflect: false },
      missingIcon: { type: String },
    };
    delete props.placeholder;
    delete props.containerHeight;
    return props;
  }

  _filterOptions() {
    const settings = this.options || [];

    if (!Object.values(settings).length) {
      return [];
    }

    const entries = Object.entries(settings);

    // We don't want to show church commitment in the circle
    this.filteredOptions = entries.filter(
      ([key, value]) => key !== 'church_commitment',
    );

    return this.filteredOptions;
  }

  willUpdate(props) {
    super.willUpdate(props);

    if (props) {
      const valueChanged = props.has('value');
      const optionsChanged = props.has('options');

      // if value, query, or options change, trigger filter
      if (valueChanged || optionsChanged) {
        this._filterOptions();
      }
    }
  }

  get isCommited() {
    if (!this.value) {
      return false;
    }

    return this.value.includes('church_commitment');
  }

  /**
   * Render the component
   * @returns
   */
  render() {
    return html`
      <div class="health-circle__wrapper input-group">
        <div
          class="health-circle__container"
          style="--icon-count: ${this.filteredOptions.length}"
        >
          <div
            class=${classMap({
              'health-circle': true,
              'health-circle--committed': this.isCommited,
              'health-circle--disabled': this.disabled,
            })}
          >
            <div class="health-circle__grid">
              ${this.filteredOptions.map(
                ([key, metric], index) =>
                  html`<dt-church-health-icon
                    key="${key}"
                    .metric=${metric}
                    .active=${(this.value || []).indexOf(key) !== -1}
                    .style="--i: ${index + 1}"
                    .missingIcon="${this.missingIcon}"
                    ?disabled=${this.disabled}
                    data-value="${key}"
                    @change="${this.handleIconClick}"
                  >
                  </dt-church-health-icon>`,
              )}
            </div>
            ${this.renderIconLoading()} ${this.renderIconSaved()}
          </div>
        </div>

        <dt-toggle
          name="church_commitment"
          label="${this.options.church_commitment.label}"
          @change="${this.handleToggleChange}"
          ?disabled=${this.disabled}
          ?checked=${this.isCommited}
          data-value="church_commitment"
        >
        </dt-toggle>
        ${this.renderError()}
      </div>
    `;
  }

  handleIconClick(evt) {
    const { key, active } = evt.detail;

    if (active) {
      this._select(key);
    } else {
      this._remove(evt);
    }
  }

  async handleToggleChange(e) {
    const { field, newValue } = e.detail;

    if (newValue) {
      this._select(field);
    } else {
      this._remove(e);
    }
  }
}

window.customElements.define('dt-church-health-circle', DtChurchHealthCircle);

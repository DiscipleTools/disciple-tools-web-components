import { html, css, LitElement } from 'lit';

export class DtSingleSelect extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        --borderWidth: 3px;
        --borderColor: #78b13f;
      }

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fefefe;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>");
        background-origin: content-box;
        background-position: right -1.0666666667rem center;
        background-repeat: no-repeat;
        background-size: 9px 6px;
        border: 1px solid var(--dt-component-border-color, #cacaca);
        border-radius: 0;
        color: #0a0a0a;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 1rem;
        font-weight: 300;
        height: 2.5rem;
        line-height: 1.5;
        margin: 0 0 1.0666666667rem;
        padding: 0.5333333333rem 1.6rem 0.5333333333rem 0.5333333333rem;
        -webkit-transition: border-color 0.25s ease-in-out,
          -webkit-box-shadow 0.5s;
        transition: border-color 0.25s ease-in-out, -webkit-box-shadow 0.5s;
        transition: box-shadow 0.5s, border-color 0.25s ease-in-out;
        transition: box-shadow 0.5s, border-color 0.25s ease-in-out,
          -webkit-box-shadow 0.5s;

        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        text-transform: none;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
      .loading-spinner::before {
        content: '';
        -webkit-animation: spin 1s linear infinite;
        animation: spin 1s linear infinite;
        border: 0.25rem solid #919191;
        border-radius: 50%;
        border-top-color: #000;
        display: inline-block;
        height: 1rem;
        width: 1rem;
      }
      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .checkmark {
        margin-top: -0.25rem;
      }
      .checkmark::before {
        content: '';
        transform: rotate(45deg);
        height: 1rem;
        width: 0.5rem;
        opacity: 0;
        border-bottom: var(--borderWidth) solid var(--borderColor);
        border-right: var(--borderWidth) solid var(--borderColor);
        animation: fadeOut 4s;
      }
      .icon-overlay {
        position: absolute;
        right: 2rem;
        top: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      placeholderLabel: { type: String },
      options: { type: Array },
      value: {
        type: String,
        reflect: true,
      },
      color: {
        type: String,
        state: true,
      },
      textColor: {
        type: String,
        state: true,
      },
      loading: { type: Boolean },
      saved: { type: Boolean },
      onchange: { type: String },
    };
  }

  // constructor() {
  //   super();
  // }

  /**
   * Find the color for the currently selected value
   */
  updateColor() {
    if (this.value && this.options) {
      const options = this.options.filter(opt => opt.id === this.value);
      if (options && options.length) {
        this.color = options[0].color;
      }
    }

    if (this.color) {
      if (DtSingleSelect.isColorLight(this.color)) {
        this.textColor = '#000000';
      } else {
        this.textColor = '#FFFFFF';
      }
    }
  }

  /**
   * Test if a color is considered light or dark
   * https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
   * @param color
   */
  static isColorLight(color) {
    const c = color.substring(1); // strip #
    const rgb = parseInt(c, 16); // convert rrggbb to decimal
    /* eslint-disable no-bitwise */
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue
    /* eslint-enable no-bitwise */

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma > 40;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('value')) {
      this.updateColor();
    }
  }

  _change(e) {
    // Create custom event with new/old values to pass to onchange function
    const event = new CustomEvent('change', {
      detail: {
        oldValue: this.value,
        newValue: e.target.value,
      },
    });

    // update value in this component
    this.value = e.target.value;

    // dispatch event for use with addEventListener from javascript
    this.dispatchEvent(event);

    // check for `onchange` html attribute to trigger event from attribute
    // todo: test across browsers, `dispatchEvent` seems to work for html `onchange` in Chrome on MacOS
    // if (this.onchange) {
    //   // eslint-disable-next-line no-new-func
    //   const fn = new Function('event', this.onchange);
    //   // eval(this.onchange + '()');
    //   fn(event);
    // }
  }

  render() {
    return html`
      <select
        name="${this.name}"
        @change="${this._change}"
        style="background-color: ${this.color}; color: ${this.textColor};"
        ?disabled="${this.loading}"
      >
        <option>${this.placeholderLabel}</option>

        ${this.options &&
        this.options.map(
          i => html`
            <option value="${i.id}" ?selected="${i.id === this.value}">
              ${i.label}
            </option>
          `
        )}
      </select>
      ${this.loading
        ? html`<div class="icon-overlay loading-spinner"></div>`
        : null}
      ${this.saved ? html`<div class="icon-overlay checkmark"></div>` : null}
    `;
  }
}

window.customElements.define('dt-single-select', DtSingleSelect);

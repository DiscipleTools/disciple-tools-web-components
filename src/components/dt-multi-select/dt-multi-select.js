import { html, css, LitElement } from 'lit';

export class DtMultiSelect extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        --borderWidth: 3px;
        --borderColor: #78b13f;
        color: var(--dt-multi-select-text-color, #555);
        position: relative;
        font-family: Helvetica, Arial, sans-serif;
      }

      .field-container {
        background-color: #fefefe;
        border: 1px solid var(--dt-component-border-color, #cacaca);
        border-radius: 0;
        color: #0a0a0a;
        font-size: 1rem;
        font-weight: 300;
        min-height: 2.5rem;
        line-height: 1.5;
        margin: 0 0 1.0666666667rem;
        padding: 0.5333333333rem 1.6rem 0.5333333333rem 0.5333333333rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        text-transform: none;
        display: flex;
        flex-wrap: wrap;
      }

      .selected-option {
        border: 1px solid var(--dt-multi-select-tag-border-color, #c2e0ff);
        background-color: var(--dt-multi-select-tag-bkrd-color, #ecf5fc);

        display: flex;
        font-size: 0.875rem;
        position: relative;
        padding-left: 4px;
        border-radius: 2px;
        margin-right: 4px;
        margin-bottom: 0.375rem;
      }
      .selected-option * {
        align-self: center;
      }
      .selected-option button {
        background: transparent;
        outline: 0;
        border: 0;
        border-left: 1px solid var(--dt-multi-select-tag-border-color, #c2e0ff);
        margin-left: 4px;
      }
      .selected-option button:hover {
        cursor: pointer;
      }

      .field-container input {
        flex-grow: 1;
        min-width: 50px;
        border: 0;
      }
      .field-container input:focus,
      .field-container input:focus-visible,
      .field-container input:active {
        border: 0;
        outline: 0;
      }

      /* === Options List === */
      .option-list {
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid var(--dt-component-border-color, #cacaca);
        z-index: 10;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        box-shadow: 0px 5px 10px 0px;
        max-height: 150px;
        overflow-y: scroll;
      }
      .option-list li {
        border-top: 1px solid var(--dt-component-border-color, #cacaca);
        outline: 0;
      }
      .option-list li div,
      .option-list li button {
        padding: 0.5rem 0.75rem;
        color: #333;
        font-weight: 100;
        font-size: 1rem;
        text-decoration: none;
        text-align: inherit;
      }
      .option-list li button {
        display: block;
        width: 100%;
        border: 0;
        background: transparent;
      }
      .option-list li button:hover,
      .option-list li button.active {
        cursor: pointer;
        background: var(--dt-multi-select-option-hover-bkrd, #f5f5f5);
      }

      /* === Inline Icons === */
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
      filteredOptions: { type: Array, state: true },
      allowAdd: { type: Boolean },
      value: {
        type: Array,
        reflect: true,
      },
      open: {
        type: Boolean,
        state: true,
      },
      searchValue: {
        type: String,
        state: true,
      },
      activeIndex: {
        type: Number,
        state: true,
      },
      containerHeight: {
        type: Number,
        state: true,
      },
      saveData: { type: String },
      isLoading: { type: Boolean, attribute: false },
      isSaved: { type: Boolean, attribute: false },
    };
  }

  constructor() {
    super();
    this.activeIndex = -1;
  }

  firstUpdated() {
    this._filterOptions();
  }

  updated() {
    if (this.shadowRoot.children && this.shadowRoot.children.length) {
      this.containerHeight = this.shadowRoot.children[0].offsetHeight;
    }
    this._scrollOptionListToActive();
  }

  _change(e) {
    this.value = e.target.value;

    // if (this.saveData && window[this.saveData]) {
    //   this.isLoading = true;
    //   this.isSaved = false;
    //   window[this.saveData](this.name, this.value, () => {
    //     this.isLoading = false;
    //     this.isSaved = true;
    //     console.log('success');
    //   }, (err) => {
    //     this.isLoading = false;
    //     console.log('error');
    //   })
    // }
  }

  /**
   * When navigating via keyboard, keep active element within visible area of option list
   * @private
   */
  _scrollOptionListToActive() {
    const optionList = this.shadowRoot.querySelector('.option-list');
    const activeEl = this.shadowRoot.querySelector('button.active');
    if (optionList && activeEl) {
      const elTop = activeEl.offsetTop;
      const elBottom = activeEl.offsetTop + activeEl.clientHeight;
      const listTop = optionList.scrollTop;
      const listBottom = optionList.scrollTop + optionList.clientHeight;
      if (elBottom > listBottom) {
        // active element below visible area. scroll down
        optionList.scrollTo({
          top: elBottom - optionList.clientHeight,
          behavior: 'smooth',
        });
      } else if (elTop < listTop) {
        // active element above visible area. scroll up
        optionList.scrollTo({ top: elTop, behavior: 'smooth' });
      }
    }
  }

  _clickOption(e) {
    if (e.target && e.target.value) {
      this._select(e.target.value);
    }
  }

  _select(value) {
    if (this.value && this.value.length) {
      this.value = [...this.value, value];
    } else {
      this.value = [value];
    }
    this.open = false;
    this.activeIndex = -1;
  }

  _clickAddNew(e) {
    e.preventDefault();
    this.open = true;
  }

  _remove(e) {
    if (e.target && e.target.dataset && e.target.dataset.value) {
      this.value = (this.value || []).filter(i => i !== e.target.dataset.value);
    }
  }

  static _focusInput(e) {
    if (e.target !== e.currentTarget) return;

    e.target.getElementsByTagName('input')[0].focus();
  }

  _inputFocusIn() {
    this.open = true;
    this.activeIndex = -1;
  }

  _inputFocusOut(e) {
    // allow clicks on option list button to not close the option list
    if (!e.relatedTarget || e.relatedTarget.nodeName !== 'BUTTON') {
      this.open = false;
    }
  }

  _inputKeyDown(e) {
    const keycode = e.keyCode || e.which;

    switch (keycode) {
      case 8: // backspace
        if (e.target.value === '') {
          this.value = this.value.slice(0, -1);
        }
        break;
      case 38: // arrow up
        this.open = true;
        this.activeIndex = Math.max(0, this.activeIndex - 1);
        break;
      case 40: // arrow down
        this.open = true;
        this.activeIndex = Math.min(
          this.filteredOptions.length - 1,
          this.activeIndex + 1
        );
        break;
      case 13: // tab
      case 9: // enter
        if (this.activeIndex > -1) {
          this._select(this.filteredOptions[this.activeIndex].id);
        }
        break;
      case 27: // escape
        this.open = false;
        this.activeIndex = -1;
        break;
      default:
        break;
    }
  }

  _inputKeyUp(e) {
    this.query = e.target.value;
    this.filteredOptions = (this.options || []).filter(
      opt =>
        (this.value || []).indexOf(opt.id) < 0 &&
        (!this.query ||
          opt.label
            .toLocaleLowerCase()
            .includes(this.query.toLocaleLowerCase()))
    );
  }

  /**
   * Filter to options that:
   *   1: are not selected
   *   2: match the search query
   * @private
   */
  _filterOptions() {
    this.filteredOptions = (this.options || []).filter(
      opt =>
        (this.value || []).indexOf(opt.id) < 0 &&
        (!this.query ||
          opt.label
            .toLocaleLowerCase()
            .includes(this.query.toLocaleLowerCase()))
    );
    return this.filteredOptions;
  }

  render() {
    // Filter out options that:
    //  1: are already selected
    //  2: match the searcy query
    const filteredOptions = this._filterOptions();
    return html`
      <div
        class="field-container"
        @click="${this._focusInput}"
        @keydown="${this._focusInput}"
      >
        ${this.options &&
        this.options
          .filter(opt => this.value && this.value.indexOf(opt.id) > -1)
          .map(
            opt => html`
              <div class="selected-option">
                <span>${opt.label}</span>
                <button @click="${this._remove}" data-value="${opt.id}">
                  x
                </button>
              </div>
            `
          )}
        <input
          type="text"
          placeholder="${this.placeholderLabel}"
          @focusin="${this._inputFocusIn}"
          @focusout="${this._inputFocusOut}"
          @keydown="${this._inputKeyDown}"
          @keyup="${this._inputKeyUp}"
        />
      </div>
      <ul
        class="option-list"
        style="display:${this.open ? 'block' : 'none'};top:${this
          .containerHeight}px;"
      >
        ${this.filteredOptions.map(
          (opt, idx) => html`
            <li>
              <button
                value="${opt.id}"
                @click="${this._clickOption}"
                class="${this.activeIndex > -1 && this.activeIndex === idx
                  ? 'active'
                  : null}"
              >
                ${opt.label}
              </button>
            </li>
          `
        )}
        ${!filteredOptions.length
          ? html`<li><div>No options available</div></li>`
          : null}
        ${this.allowAdd && this.query
          ? html`<li>
              <button @click="${this._clickAddNew}">Add "${this.query}"</button>
            </li>`
          : null}
      </ul>
      ${this.isLoading
        ? html`<div class="icon-overlay loading-spinner"></div>`
        : null}
      ${this.isSaved ? html`<div class="icon-overlay checkmark"></div>` : null}
    `;
  }
}

window.customElements.define('dt-multi-select', DtMultiSelect);

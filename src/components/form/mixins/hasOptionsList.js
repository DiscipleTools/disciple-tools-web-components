import { html } from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import { msg } from '@lit/localize';

export const HasOptionsList = (superClass) => class extends superClass {
  constructor() {
    super();
    this.activeIndex = -1;
    this.filteredOptions = [];
    this.detectTap = false;
  }

  static get properties() {
    return {
      ...super.properties,
      /** Selected value(s) in the list * */
      value: {
        type: Array,
        reflect: true,
      },
      /** Search query as typed in input area */
      query: {
        type: String,
        state: true,
      },
      /** All available options for selection */
      options: { type: Array },
      /** Available options filtered by search input */
      filteredOptions: { type: Array, state: true },
      /** Indicates if option list is open */
      open: {
        type: Boolean,
        state: true,
      },
      /** Indicates if list of available options can be updated */
      canUpdate:{
        type:Boolean,
        state: true
      },
      /** Index of currently selected value */
      activeIndex: {
        type: Number,
        state: true,
      },
      /** Override container height */
      containerHeight: {
        type: Number,
        state: true,
      },
      /** Indicates if loading indicator is displayed */
      loading: { type: Boolean },
    };
  }

  willUpdate(props) {
    super.willUpdate(props);

    if (props) {
      // Set the containerHeight for dropdown positioning if it hasn't been set yet
      if (
        !this.containerHeight &&
        this.shadowRoot.children &&
        this.shadowRoot.children.length
      ) {
        const inputGroup = this.shadowRoot.querySelector('.input-group');
        if (inputGroup) {
          this.containerHeight = inputGroup.offsetHeight;
        }
      }
    }
  }

  updated() {
    this._scrollOptionListToActive();

    // set variable with width of container for truncating selected options via CSS
    const container = this.shadowRoot.querySelector('.input-group');
    const currentValue = container.style.getPropertyValue('--container-width');
    if (!currentValue && container.clientWidth > 0) {
      container.style.setProperty(
        '--container-width',
        `${container.clientWidth}px`
      );
    }
  }

  _select() { // eslint-disable-line class-methods-use-this
    console.error("Must implement `_select(value)` function");
    this._clearSearch();
  }

  /* Search Input Field Events */
  static _focusInput(e) {
    if (e.target !== e.currentTarget) return;

    e.target.getElementsByTagName('input')[0].focus();
  }

  _inputFocusIn(e) {
    if (
      !e.relatedTarget ||
      !['BUTTON', 'LI'].includes(e.relatedTarget.nodeName)
    ) {
      this.open = true;
      this.activeIndex = -1;
    }
  }

  _inputFocusOut(e) {
    // allow clicks on option list button to not close the option list
    // Safari actually passes the parent <li> as the relatedTarget
    if (
      !e.relatedTarget ||
      !['BUTTON', 'LI'].includes(e.relatedTarget.nodeName)
    ) {
      this.open = false;
      this.canUpdate = true;
    }
  }

  _inputKeyDown(e) {

  }

  _inputKeyUp(e) {
    const keycode = e.keyCode || e.which;

    switch (keycode) {
      case 38: // arrow up
        this.open = true;
        this._listHighlightPrevious();
        break;
      case 40: // arrow down
        this.open = true;
        this._listHighlightNext();
        break;
      case 9: // tab
        if (this.activeIndex < 0) {
          // if pressing tab while no option is selected,
          // close the list so you can go to next field
          this.open = false;
        } else {
          e.preventDefault();
        }
        this._keyboardSelectOption();
        break;
      case 13: // enter
        this._keyboardSelectOption();
        break;
      case 27: // escape
        this.open = false;
        this.activeIndex = -1;
        break;
      default:
        this.open = true;
        this.query = e.target.value;
        break;
    }
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

  /* Option List Events */
  _touchStart(e) {
    if (e.target) {
      this.detectTap = false;
    }
  }

  _touchMove(e) {
    if (e.target) {
      this.detectTap = true;
    }
  }

  _touchEnd(e) {
    if (!this.detectTap) {
      if (e.target && e.target.value) {
        this._clickOption(e);
      }
      this.detectTap = false;
    }
  }

  _keyboardSelectOption() {
    if (this.activeIndex > -1) {
      if (this.activeIndex + 1 > this.filteredOptions.length) {
        this._select(this.query);
      } else {
        this._select(this.filteredOptions[this.activeIndex].id);
      }
    }
  }

  _clickOption(e) {
    if (e.target && e.target.value) {
      this._select(e.target.value);
    }
  }

  _clickAddNew(e) {
    if (e.target) {
      this._select(e.target.dataset?.label);
      // clear search field if clicked with mouse, since field will lose focus
    }
  }

  _clearSearch()  {
    const input = this.shadowRoot.querySelector('input');
      if (input) {
        input.value = '';
      }
  }

  /* Option List Navigation */
  _listHighlightNext() {
    if (this.allowAdd) {
      this.activeIndex = Math.min(
        this.filteredOptions.length, // allow 1 more than the list length
        this.activeIndex + 1
      );
    } else {
      this.activeIndex = Math.min(
        this.filteredOptions.length - 1,
        this.activeIndex + 1
      );
    }
  }

  _listHighlightPrevious() {
    this.activeIndex = Math.max(0, this.activeIndex - 1);
  }

  /* Rendering */
  _renderOption(opt, idx) {
    return html`
      <li tabindex="-1">
        <button
          value="${opt.id}"
          type="button"
          data-label="${opt.label}"
          @click="${this._clickOption}"
          @touchstart="${this._touchStart}"
          @touchmove="${this._touchMove}"
          @touchend="${this._touchEnd}"
          tabindex="-1"
          class="${this.activeIndex > -1 && this.activeIndex === idx
      ? 'active'
      : ''}"
        >
          ${opt.label}
        </button>
      </li>
    `;
  }

  _baseRenderOptions() {
    if (!this.filteredOptions.length) {
      if (this.loading) {
        return html`<li><div>${msg('Loading options...')}</div></li>`;
      }
      return html`<li><div>${msg('No Data Available')}</div></li>`;
    }
    return repeat(this.filteredOptions, (opt) => opt.id, (opt, idx) => this._renderOption(opt, idx));
  }

  _renderOptions() {
    let optionsMarkup = this._baseRenderOptions();
    if (this.allowAdd && this.query) {
      if (!Array.isArray(optionsMarkup)) {
        optionsMarkup = [optionsMarkup];
      }
      optionsMarkup.push(html`<li tabindex="-1">
        <button
          data-label="${this.query}"
          @click="${this._clickAddNew}"
          @touchstart="${this._touchStart}"
          @touchmove="${this._touchMove}"
          @touchend="${this._touchEnd}"
          class="${this.activeIndex > -1 &&
      this.activeIndex >= this.filteredOptions.length
        ? 'active'
        : ''}"
        >
          ${msg('Add')} "${this.query}"
        </button>
      </li>`);
    }
    return optionsMarkup;
  }
}

import { LitElement } from 'lit';
import { updateWhenLocaleChanges } from '@lit/localize';
import { setLocale } from '../i18n/localization.js';
import ApiService from '../services/apiService.js';

import 'element-internals-polyfill'; // eslint-disable-line import/no-extraneous-dependencies

/**
 * Core base class that extends LitElement. It provides basic functionality for localization.
 * @extends LitElement
 */
export default class DtBase extends LitElement {
  static get properties() {
    return {
      /**
       * Sets the text direction used for localization. If it is not set,
       * it will read the `dir` attribute of the nearest parent,
       * defaulting to the root `<html>` element if no others are found.
       */
      RTL: { type: Boolean },
      /**
       * Defines the locale to be used for localization of the component.
       * If it is not set, it will read the `lang` attribute of the nearest parent,
       * defaulting to the root `<html>` element if no others are found.
       */
      locale: { type: String },
      /**
       * _Feature migrated to ApiService_
       * @deprecated
       */
      apiRoot: { type: String, reflect: false },
      /**
       * _Feature migrated to ApiService_
       * @deprecated
       */
      postType: { type: String, reflect: false },
      /**
       * _Feature migrated to ApiService_
       * @deprecated
       */
      postID: { type: String, reflect: false },
    };
  }

  /**
   * Used to set which element of the shadow DOM should receive focus when the component itself
   * receives focus. This will use the `_focusTarget`, so that getter should be changed instead
   * of this function.
   *
   * By default, it will find the first child in the shadow DOM and focus that element
   */
  get _focusTarget() {
    return this.shadowRoot.children[0] instanceof Element
      ? this.shadowRoot.children[0]
      : null;
  }

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.addEventListener('focus', this._proxyFocus.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();

    this.apiRoot = this.apiRoot ? `${this.apiRoot}/`.replace('//', '/') : '/'; // ensure it ends with /
    this.api = new ApiService(this.nonce, this.apiRoot);
  }

  willUpdate(props) {
    // get RTL from closest parent with [dir] attribute
    if (this.RTL === undefined) {
      const dirEl = this.closest('[dir]');
      if (dirEl) {
        const dir = dirEl.getAttribute('dir');
        if (dir) {
          this.RTL = dir.toLowerCase() === 'rtl';
        }
      }
    }

    // get locale from closest parent with [lang] attribute
    if (!this.locale) {
      const langEl = this.closest('[lang]');
      if (langEl) {
        const lang = langEl.getAttribute('lang');
        if (lang) {
          this.locale = lang;
        }
      }
    }

    // if locale is changing, update lit-localize
    if (props && props.has('locale') && this.locale) {
      try {
        setLocale(this.locale);
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Used to transfer focus to the shadow DOM when the component itself receives focus.
   * This will use the `_focusTarget` to determine which shadow DOM element to focus,
   * so that getter should be changed instead of this function when the shadow DOM is non-standard.
   * @returns
   */
  _proxyFocus() {
    if (!this._focusTarget) {
      return;
    }

    this._focusTarget.focus();
  }
}

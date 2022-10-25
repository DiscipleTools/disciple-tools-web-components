import { LitElement } from 'lit';
import {updateWhenLocaleChanges} from '@lit/localize';
import { setLocale } from '../i18n/localization.js';
import 'element-internals-polyfill';

export default class DtBase extends LitElement {
  static get properties() {
    return {
      locale: { type: String },
    };
  }

  constructor() {
    super();
    updateWhenLocaleChanges(this);
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
}

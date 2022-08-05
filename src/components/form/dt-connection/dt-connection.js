import { css, html } from 'lit';
import { DtTags } from '../dt-tags/dt-tags.js';

export class DtConnection extends DtTags {
  static get styles() {
    return css`
      ${super.styles}
      
      li button * {
        pointer-events: none;
      }
      
      li button svg {
        width: 20px;
        height: auto;
        margin-bottom: -4px
      }
      li button svg use {
        fill: var(--primary-color, #3f729b);
      }
    `;
  }

  _renderOption(opt, idx) {
    const svg = html`<svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>circle-08 2</title><desc>Created using Figma</desc><g id="Canvas" transform="translate(1457 4940)"><g id="circle-08 2"><g id="Group"><g id="Vector"><use xlink:href="#path0_fill" transform="translate(-1457 -4940)" fill="#000000"/></g></g></g></g><defs><path id="path0_fill" d="M 12 0C 5.383 0 0 5.383 0 12C 0 18.617 5.383 24 12 24C 18.617 24 24 18.617 24 12C 24 5.383 18.617 0 12 0ZM 8 10C 8 7.791 9.844 6 12 6C 14.156 6 16 7.791 16 10L 16 11C 16 13.209 14.156 15 12 15C 9.844 15 8 13.209 8 11L 8 10ZM 12 22C 9.567 22 7.335 21.124 5.599 19.674C 6.438 18.091 8.083 17 10 17L 14 17C 15.917 17 17.562 18.091 18.401 19.674C 16.665 21.124 14.433 22 12 22Z"/></defs></svg>`
    return html`
        <li tabindex="-1">
          <button
            value="${opt.id}"
            type="button"
            data-label="${opt.label}"
            @click="${this._clickOption}"
            @touchstart="${this._clickOption}"
            tabindex="-1"
            class="${this.activeIndex > -1 && this.activeIndex === idx
      ? 'active'
      : null}"
          >
            ${opt.user ? svg : null }
          
            ${opt.label} <span class="connection-id">(#${opt.id})</span>
          </button>
        </li>
    `;
  }

  // _renderOptions() {
  //   let optionsMarkup = super._renderOptions();
  //
  //   if (this.allowAdd && this.query) {
  //     if (!Array.isArray(optionsMarkup)) {
  //       optionsMarkup = [optionsMarkup];
  //     }
  //     optionsMarkup.push(html`<li>
  //       <button
  //         data-label="${this.query}"
  //         @click="${this._clickAddNew}"
  //         class="${this.activeIndex > -1 &&
  //         this.activeIndex >= this.filteredOptions.length
  //           ? 'active'
  //           : null}"
  //       >
  //         Add "${this.query}"
  //       </button>
  //     </li>`);
  //   }
  //   return optionsMarkup;
  // }

  // _renderSelectedOptions() {
  //   return (this.value || []).map(
  //     opt => html`
  //       <div class="selected-option">
  //         <span>${opt.label}</span>
  //         <button @click="${this._remove}" data-value="${opt.id}">x</button>
  //       </div>
  //     `
  //   );
  // }
}

window.customElements.define('dt-connection', DtConnection);

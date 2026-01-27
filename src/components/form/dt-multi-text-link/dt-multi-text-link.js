import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { DtMultiText } from '../dt-multi-text/dt-multi-text.js';
import '../../icons/dt-icon.js';

/**
 * Field to edit multiple text values with ability to add/remove values.
 * Used primarily for lists of communication channels (e.g. phone, email, social links, etc.)
 */
export class DtMultiTextLink extends DtMultiText {
  static get styles() {
    return [
      ...super.styles,
      css`
        .icon-btn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          height: 0.9em;
          padding: 0;
          color: var(--success-color, #cc4b37);
          transform: scale(1.5);
        }
          
        .option-list {
          display: block;
          position: absolute;
          left: auto; 
          right: 0;
          list-style: none;
          margin: 0;
          padding: 0;
          border: 1px solid var(--dt-form-border-color, #CACACA);
          background: var(--dt-form-background-color, #FEFEFE);
          z-index: 10;
          box-shadow: var(--shadow-1);
          max-height: 150px;
          overflow-y: scroll;
        }

        .option-list li {
          border-block-start: 1px solid var(--dt-form-border-color, #CACACA);
          outline: 0;
        }
        .option-list li div,
        .option-list li button {
          padding: 0.5rem 0.75rem;
          color: var(--dt-multi-select-text-color, #0A0A0A);
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
          background: var(--dt-multi-select-option-hover-background, #F5F5F5);
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      value: {
        type: Array,
        reflect: true,
      },
      groups: { type: Array },
      open: {
        type: Boolean,
        state: true,
      },
      activeIndex: {
        type: Number,
        state: true,
      },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.activeIndex = -1;
  }

  _addItem(group) {
    const newValue = {
      verified: false,
      value: '',
      tempKey: Date.now().toString(),
      group: group.id
    };
    this.value = [...this.value, newValue];
    this.open = false;
    this.activeIndex = -1;

    // Focus the newly created input in the correct group
    this.updateComplete.then(() => {
      const inputs = this.renderRoot.querySelectorAll('input');
      const newInput = Array.from(inputs).find(
        input => input.getAttribute('data-key') === newValue.tempKey
      );
      newInput?.focus();
    });
  }

  handleClick() {
    this.open = !this.open;
    this.activeIndex = -1;
    const firstButton = this.renderRoot.querySelector('.option-list button');
    firstButton?.focus();
  }

  _inputKeyDown(e) {
    const keycode = e.keyCode || e.which;

    switch (keycode) {
      case 38: // arrow up
        e.preventDefault();
        this.open = true;
        this._listHighlightPrevious();
        break;
      case 40: // arrow down
        e.preventDefault();
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
        e.preventDefault();
        if (this.open) {
          this._keyboardSelectOption();
        } else {
          this.open = true;
        }
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

  _keyboardSelectOption() {
    if (this.activeIndex > -1) {
      if (this.activeIndex + 1 > this.groups.length) {
        this._addItem(this.query);
      } else {
        this._addItem(this.groups[this.activeIndex]);
      }
    }
  }

  /* Option List Navigation */
  _listHighlightNext() {
    if (this.allowAdd) {
      this.activeIndex = Math.min(
        this.groups.length, // allow 1 more than the list length
        this.activeIndex + 1
      );
    } else {
      this.activeIndex = Math.min(
        this.groups.length - 1,
        this.activeIndex + 1
      );
    }
  }

  _listHighlightPrevious() {
    this.activeIndex = Math.max(0, this.activeIndex - 1);
  }

  _inputFieldTemplate(item, itemCount) {
    return html`
      <div class="field-container">
        <input
          data-key="${item.key ?? item.tempKey}"
          tabindex="1"
          name="${this.name}"
          aria-label="${this.label}"
          type="${this.type || 'text'}"
          placeholder="${this.placeholder}"
          ?disabled=${this.disabled}
          ?required=${this.required}
          class="${classMap(this.classes)}"
          .value="${item.value || ''}"
          @change=${this._change}
          novalidate
        />

        ${when(
          itemCount > 1 || item.key || item.value,
          () => html`
            <button
              class="input-addon btn-remove"
              tabindex="1"
              @click=${this._removeItem}
              data-key="${item.key ?? item.tempKey}"
              ?disabled=${this.disabled}
            >
              <dt-icon icon="mdi:close"></dt-icon>
            </button>
          `,
          () => html``,
        )}
      </div>
    `;
  }

  _renderGroup(group, idx) {
    return html`
      <li tabindex="-1">
        <button
          value="${group.id}"
          type="button"
          data-label="${group.label}"
          @click="${() => this._addItem(group)}"
          @touchstart="${this._touchStart}"
          @touchmove="${this._touchMove}"
          @touchend="${this._touchEnd}"
          tabindex="-1"
          class="${this.activeIndex > -1 && this.activeIndex === idx ? 'active' : ''}"
        >
          ${group.label}
        </button>
      </li>
    `;
  }

  _renderInputFields() {
    if (!this.value || !this.value.length) {
      this.value = [
        {
          verified: false,
          value: '',
          tempKey: Date.now().toString(),
        },
      ];
    }
    
    if (this.groups) {
      return this.groups.map(group => html`
        <h3>${group.label}</h3>
        ${repeat(
          (this.value ?? []).filter(x => !x.delete && x.group === group.id),
          x => x.id,
          x => this._inputFieldTemplate(x, this.value.length),
        )}
      `);
    }

    return html`
      ${repeat(
        (this.value ?? []).filter(x => !x.delete),
        x => x.id,
        x => this._inputFieldTemplate(x, this.value.length),
      )}
    `;
  }

  get classes() {
    const classes = {
      'text-input': true,
      invalid: this.touched && this.invalid,
    };
    return classes;
  }

  labelTemplate() {
    if (!this.label) {
      return '';
    }

    return html`
      <dt-label
        ?private=${this.private}
        privateLabel="${this.privateLabel}"
        iconAltText="${this.iconAltText}"
        icon="${this.icon}"
        exportparts="label: label-container"
      >
        ${!this.icon
          ? html`<slot name="icon-start" slot="icon-start"></slot>`
          : null}
        ${this.label}
        <slot name="icon-end" slot="icon-end">
          <button
            @click="${this.handleClick}"
            @keydown="${this._inputKeyDown}"
            @focusin="${() => { this.open = true; this.activeIndex = -1; }}"
            class="icon-btn"
            id="add-item"
            type="button"
            tabindex="1"
          >
            <dt-icon icon="mdi:plus-thick"></dt-icon>
          </button>
          ${this.open ? html`
          <div class="options-list">
            <ul id="myDropdown" class="option-list">
              ${repeat(this.groups, group => group.id, (group, idx) => this._renderGroup(group, idx))}
            </ul>
          </div>
          ` : ''}
        </slot>
      </dt-label>
    `;
  }
}

window.customElements.define('dt-multi-text-link', DtMultiTextLink);
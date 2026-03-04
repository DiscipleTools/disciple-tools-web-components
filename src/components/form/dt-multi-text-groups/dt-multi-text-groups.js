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
export class DtMultiTextGroups extends DtMultiText {
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

        .groups-list {
        position: relative;
        }
          
        .option-list {
          display: block;
          position: absolute;
          inset-inline-start: auto;
          inset-inline-end: 0;
          list-style: none;
          margin-top: 0;
          padding: 0;
          border: 1px solid var(--dt-form-border-color, #CACACA);
          background: var(--dt-form-background-color, #FEFEFE);
          z-index: 10;
          box-shadow: var(--shadow-1);
          max-height: 150px;
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
        .link-button {
        background: none;
        border: none;
        padding-left: 0.5rem;
        margin: 0;
        color: #0000ee; /* Default blue link color (adjust as needed) */
        text-decoration: underline;
        cursor: pointer;
        }
        .groups-no-value {
          display: flex;
          align-items: center;
          min-height: 2.5rem;
        }
        .icon-overlay {
          inset-inline-end: 0.5rem;
          height: 100%;
        }
        .field-container:has(.btn-remove) ~ .icon-overlay {
          inset-inline-end: 3rem;
        }
        .heading {
          margin-top: .5rem;
          margin-bottom: 0;
          font-family: var(--font-family);
          font-size: var(--dt-label-font-size, 14px);
          font-weight: var(--dt-label-font-weight, 700);
          color: var(--dt-label-color, #000);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      groups: { type: Array },
      open: {
        type: Boolean,
        state: true,
      },
      activeIndex: {
        type: Number,
        state: true,
      },
      activeGroup: {
        type: String,
        state: true,
      },
      isDeleting: {
        type: Boolean,
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
      type: group.id,
    };
    if (this.value[0]?.type) {
      this.value = [...this.value, newValue];
      
    } else {
      this.value = [newValue];
    }
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

  _removeItem(e) {
    const keyToRemove = e.currentTarget.dataset.key;
    if (keyToRemove) {
      const event = new CustomEvent('change', {
        bubbles: true,
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // remove item from value
      const newValue = this.value
        // if removed item hasn't been saved, just remove from list
        .filter(x => x.tempKey !== keyToRemove)
        // if remove item was saved (has `key`), mark as `delete`
        .map(x => {
          const item = { ...x };
          // add `delete` prop to clicked item
          if (x.meta_id === keyToRemove || x.tempKey === keyToRemove) {
            item.delete = true;
            this.activeGroup = item.type;
          }
          return item;
        });

      this.value = newValue;

      event.detail.newValue = this.value;

      this.dispatchEvent(event);
      this._setFormValue(this.value);
    }
  }



  _change(e) {
    const key = e?.currentTarget?.dataset?.key;
    if (key) {
      const event = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.value,
        },
      });

      // update this item's value in the list
      this.value = this.value.map(x => {
        if (x.meta_id === key || x.tempKey === key) {
          this.activeGroup = x.type;

          return {
            ...x,
            value: e.target?.value,
          };
        }
        
        return x;
      });
      event.detail.newValue = this.value;

      this._setFormValue(this.value);
      this.dispatchEvent(event);
    }
  }

  handleClick() {
    this.renderRoot.querySelector('.icon-btn').focus();
    if (this.groups) {
      this.open = !this.open;
      this.activeIndex = -1;
      const firstButton = this.renderRoot.querySelector('.option-list');
      // focus on the list
      firstButton?.focus();
    } else {
      const newValue = {
        verified: false,
        value: '',
        tempKey: Date.now().toString(),
      };
      this.value = [...this.value, newValue];
    }
  }

  _handleButtonBlur(e) {
    if (
      !e.relatedTarget?.id.includes(`group-`)
    ) {
      this.open = false;
    }
  }

  _inputKeyDown(e) {
    const keycode = e.keyCode || e.which;

    if (this.groups) {
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
          data-key="${item.meta_id ?? item.tempKey}"
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
          (this.value[0]?.type) || (!this.groups && itemCount > 1),
          () => html`
            <button
              class="input-addon btn-remove"
              tabindex="1"
              @click=${this._removeItem}
              data-key="${item.meta_id ?? item.tempKey}"
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
          id="group-${group.id}"
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

  renderIcons() {
    // check which group index the item belongs to
    const groupIndex = this.groups.findIndex(group => group.id === this.activeGroup);
    // for any groups with higher index we don't add padding

    // calculate if we're deleting an item
    if (this.loading) {
      this.isDeleting = false;
    }
    for (const [i, item] of (this.value || []).entries()) {
      if (item.delete && !this.isDeleting) {
        this.isDeleting = true;
        this.activeGroup = item.type;
      }
    }
    const remainingItemsPerGroup = this.groups.map(group => (this.value || []).filter(item => item.type === group.id && !item.delete).length);
    let itemsAbove = 0;
    let itemsBelow = 0;
    for (let i = remainingItemsPerGroup.length-1; i > groupIndex; i-=1) {
      if (remainingItemsPerGroup[i] > 0) {
        itemsBelow += remainingItemsPerGroup[i];
        break;
      }
    }
    for (let i = 0; i < groupIndex; i+=1) {
      if (remainingItemsPerGroup[i] > 0) {
        itemsAbove += remainingItemsPerGroup[i];
        break;
      }
    }

    let pad = 0;
    let titleCount = 0;
    // loop through groups
    for (let i = this.groups.length-1; i >= 0; i-=1) {
      const group = this.groups[i];
      let itemCount = 0;
      if (i > groupIndex) {
        // add padding for each item, every item if we are deleting (icon shows at top element)
        itemCount = (this.value || []).filter(item => item.type === group.id && !item.delete).length;

        // if at least 1 item in group, we add for the group title as well, only if it's below our group
        if (itemCount > 0) {
          titleCount += 1;
        }
      } else if (i === groupIndex) {
        itemCount = (this.value || []).filter(item => item.type === group.id && !item.delete).length-1;
        if (this.isDeleting && itemCount === 0){
          if (itemsAbove > 0) {
            itemCount = itemsAbove-1;
          } else if (itemsBelow > 0) {
            titleCount -= 1;
          }
        } else {
          itemCount = (this.value || []).filter(item => item.type === group.id && !item.delete).length-1;
        }
      }
      pad += itemCount;
    }
    if (pad !== 0) {
      pad *= 3;
      pad += titleCount * 2.5;
    }
    pad += 0.5;
    console.log(pad);
    
    const styleStr = `padding-block-end: ${pad.toString()}rem`;
    return html`
      ${this.renderIconInvalid()} ${this.renderError()}
      ${this.renderIconLoading(styleStr)} ${this.renderIconSaved(styleStr)}
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

    const firstIndex = this.value[0];
    if (this.groups && (firstIndex && firstIndex.type)) {
      return this.groups.map(group => {
        const groupItems = (this.value ?? []).filter(
          x => !x.delete && x.type === group.id
        );

        if (groupItems.length > 0) {
          return html`
          <h3 class="heading">${group.label}</h3>
          ${repeat(
            groupItems,
            x => x.id,
            x => this._inputFieldTemplate(x, this.value.length),
          )}
        `;
        }
      });
    }

    if (!this.groups) {
      return html`
      ${repeat(
        (this.value ?? []).filter(x => !x.delete),
        x => x.id,
        x => this._inputFieldTemplate(x, this.value.length),
      )}
    `;
    }

    return html`
      <div class="groups-no-value">
        No items to show.<button class="link-button" @click=${this.handleClick}>Add items</button>
      </div>
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
            @blur="${this._handleButtonBlur}"
            class="icon-btn"
            id="add-item"
            type="button"
            tabindex="1"
          >
            <dt-icon icon="mdi:plus-thick"></dt-icon>
          </button>
          ${this.open ? html`
          <div class="groups-list">
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

window.customElements.define('dt-multi-text-groups', DtMultiTextGroups);
import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';


export class DtMultiSelectButtonGroup extends DtFormBase {
  static get styles() {
    return css`
   :host {
        margin-bottom: 5px;
      }
      span .icon {
        vertical-align: middle;
        padding: 0 2px;
      }
      .icon img {
        width: 15px !important;
        height: 15px !important;
        margin-right: 1px !important;
        vertical-align: sub;
      }
      .button-group {
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
  `
  };

  static get properties() {
    return {
      buttons: { type: Array },
      selectedButtons: { type: Array },
      value: { type: Array, reflect: true },
      icon: { type: String },
      isModal: { type: Array },
    };
  }

  get classes() {
    const classes = {
      'dt-button': true,
      'dt-button--outline': this.outline,
      'dt-button--rounded': this.rounded,
    };
    const contextClass = `dt-button--${this.context}`;
    classes[contextClass] = true;
    return classes;
  }

  constructor() {
    super();
    this.buttons = [];
    this.selectedButtons = [];
    this.value = [];
    this.custom = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.selectedButtons = this.value ? this.value.map(button => ({ value: button })) : [];
  }


  _handleButtonClick(event, label) {
    const buttonValue = event.target.value;
    if (buttonValue === "milestone_baptized" && this.isModal && this.isModal.includes(label) && !this.value?.includes("milestone_baptized")) {
      const modal = document.querySelector(`#baptized-modal`);
      modal.shadowRoot.querySelector('dialog').showModal();
      document.querySelector('body').style.overflow = "hidden"
    }
    const index = this.selectedButtons.findIndex(
      button => button.value === buttonValue
    );
    if (index > -1) {
      this.selectedButtons.splice(index, 1);
      this.selectedButtons.push({ value: `-${buttonValue}` });
    } else {
      this.selectedButtons.push({ value: buttonValue});
    }
    this.value = this.selectedButtons.filter(button => !button.value.startsWith('-')).map(button => button.value);

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        field: this.name,
        oldValue: this.value,
        newValue: this.selectedButtons,
      },
    }));
    this._setFormValue(this.value);
    this.requestUpdate();
  }

  _inputKeyDown(e) {
    const keycode = e.keyCode || e.which;
    switch (keycode) {
      case 13: // enter
        this._handleButtonClick(e);
        break;
      default:
        // handle other keycodes here
        break;
    }
  }


  render() {
    return html`
       ${this.labelTemplate()}
       ${this.loading
        ? html`<dt-spinner class="icon-overlay"></dt-spinner>`
        : null}
        ${this.saved
        ? html`<dt-checkmark class="icon-overlay success"></dt-checkmark>`
        : null}
       <div class="button-group">
        ${this.buttons.map(buttonSet => {
          const items = Object.keys(buttonSet);
          return items.map(item => {
            const isSelected = this.selectedButtons.some(
              selected => selected.value === item && !selected.delete
            )
            const context = isSelected ? 'success' : 'disabled';

            return html`
            <dt-button
            custom
              id=${item}
              type="success"
              context=${context}
              .value=${item || this.value}
              @click="${(e) => this._handleButtonClick(e, buttonSet[item].label)}"
              @keydown="${this._inputKeyDown}"
              role="button"
              >
               <span class="icon">
                ${buttonSet[item].icon
                ? html`<img src="${buttonSet[item].icon}" alt="${this.iconAltText}" />`
                : null}
            </span>
             ${buttonSet[item].label}</dt-button>
          `;
          });
        })}
        </div>
    `;
  }
}

window.customElements.define(
  'dt-multiselect-buttons-group',
  DtMultiSelectButtonGroup
);

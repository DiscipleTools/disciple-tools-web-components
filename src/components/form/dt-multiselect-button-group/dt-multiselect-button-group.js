import { html, css } from 'lit';
import DtFormBase from '../dt-form-base.js';


export class DtMultiSelectButtonGroup extends DtFormBase {
  static get styles() {
  return css`
  :host {
      margin-bottom: 5px;
    }
    .icon img {
      width: 15px !important;
      height: 15px !important;
      display: inline;
    }
  `
   };

  static get properties() {
    return {
      buttons: { type: Array },
      selectedButtons: { type: Array },
      value: { type: Array, reflect: true },
      icon: { type: String }
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
    this.buttons= [
      {
          "Button 1": {
              "label": "Button 1",
              "description": "",
              "icon": "http://localhost/nextdttheme/wp-content/themes/disciple-tools-theme/dt-assets/images/bible.svg?v=2"
          },
          "Button 2": {
              "label": "Button 2",
              "description": "",
              "icon": "http://localhost/nextdttheme/wp-content/themes/disciple-tools-theme/dt-assets/images/reading.svg?v=2"
          },
          "Button 3": {
              "label": "Button 3",
              "description": "",
              "icon": "http://localhost/nextdttheme/wp-content/themes/disciple-tools-theme/dt-assets/images/speak.svg?v=2"
          },
          "Button 4": {
              "label": "Button 4",
              "description": "",
              "icon": "http://localhost/nextdttheme/wp-content/themes/disciple-tools-theme/dt-assets/images/hand-heart.svg?v=2"
          },
          "Button 5": {
              "label": "Button 5",
              "description": "",
              "icon": "http://localhost/nextdttheme/wp-content/themes/disciple-tools-theme/dt-assets/images/account-voice.svg?v=2"
          },
      }
  ]
    this.selectedButtons = [];
    this.value = [];
  }


  _handleButtonClick(event) {
    const buttonValue = event.target.value;
    const index = this.selectedButtons.findIndex(
      button => button.value === buttonValue
    );
    if (index > -1) {
      this.selectedButtons.splice(index, 1);
    } else {
      this.selectedButtons.push({ value: buttonValue });
    }
    this.value = this.selectedButtons.map(button => button.value);
    this._setFormValue(this.value);

    this.dispatchEvent(new CustomEvent('selection-changed', {
      detail: { selectedButtons: this.value }
    }));
    this.requestUpdate();
  }

  render() {
    return html`
       ${this.labelTemplate()}
       <div>
        ${this.buttons.map(buttonSet => {
          const items = Object.keys(buttonSet);
          return items.map(item => {
            const isSelected = this.selectedButtons.some(
              selected => selected.value === item
            );
            const context = isSelected ? 'success' : 'disabled';
            return html`
            <dt-button
              id=${item}
              type="success"
              context=${context}
              .value=${item}
              @click="${this._handleButtonClick}"
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

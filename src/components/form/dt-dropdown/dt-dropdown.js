import { html, css, LitElement } from 'lit';
import '../dt-button/dt-button.js';
import '../../layout/dt-modal/dt-modal.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';


export class DtDropdown extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      dt-button {
        background-color: var(--button-color, #3498db);
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
      }
      
      slot {
        display: none;
        min-width: 200px;
        position: absolute;
        top: calc(100% + 0px); /* Position below the button */
        left: 0;
        z-index: 1000; /* Set the z-index high to appear above other elements */
        border: 1px solid gray;
        padding: 10px;
        background-color: white;
      }
      button:hover + slot {
        display: block;
      }
      .btnn {
        display: inline-block;
        position: relative;
      }
      .btnn:hover slot {
        display: block;
      }
      .dropdown-icon {
        margin-left: 5px; /* Adjust the margin as needed */
      }

      .dropdown {
        position: relative;
        display: inline-block;
      }
      button.dt-dropdown{
        padding:8px;
        border:none;
        background-color:#00897B;
        color:white !important;
        border-radius:4px;
        }
        

      .dropdown ul {
        position: absolute;
        z-index: 999;
        min-width:200px;
        display: none;
        // left: -100vw;
        // top: calc(1.5em + 14px);
        border: 0.5px solid #3f729b;
        background: #fff;
        padding: 6px 0;
        margin: 0;
        list-style: none;
        width: 100%;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
      }

      .dropdown ul button {
        display: block;
        padding: 6px 15px;
        text-decoration: none;
        color: #3f729b;
        font-size: 1rem;
        border-radius: 0.25em;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        text-decoration: none;
        background: node;
        border: none;
      }

      .dropdown ul a:focus {
        background-color: var(--button-hover-color, #2980b9);
      }

      .list-style {
        color: #3f729b;
        padding: 5px 15px 5px 15px;
        font-size: 1rem;
      }

      .list-style:hover {
        background-color: var(--button-hover-color, #3f729b);
      }

      :hover {
        color: var(--hover-color) !important;
      }
      .list-style:hover {
        background-color: var(--button-hover-color, #2980b9);
      }

      .help-icon {
        -webkit-filter: invert(69%) sepia(1%) saturate(0) hue-rotate(239deg) brightness(94%) contrast(86%);
        filter: invert(69%) sepia(1%) saturate(0) hue-rotate(239deg) brightness(94%) contrast(86%);
        height: 15px;
      }
    `;
  }

  static get properties() {
    return {
      options: { type: Array },
      label: { type: String },
      isModal: { type: Boolean },
      buttonStyle: { type: Object },
      default: { type : Boolean },
      context:{ type: String },
    };
  }

  get classes() {
    const classes = {
      'dt-dropdown': true,
    };
    const contextClass = `dt-dropdown--${this.context}`;
    classes[contextClass] = true;
    return classes;
  }

  render() {
    return html`
    <div class="dropdown">
    <button
    class=${classMap(this.classes)}
    style=${styleMap(this.buttonStyle || {})}
    @mouseover=${this._handleHover}
    @mouseleave=${this._handleMouseLeave}
    @focus=${this._handleHover}
    >

    ${this.label} \u25BC

    </button>
    <ul
    class="abc"
    @mouseover=${this._handleHover}
    @mouseleave=${this._handleMouseLeave}
    @focus=${this._handleHover}
    >

    ${this.options ? this.options.map(
      option => html`
        ${option.isModal
          ? html`
              <li>
               
                <button 
                style="color:#3f729b; background:none; font-size:12px; text-align:left; border:none; --hover-color:white" 
                @click="${()=>this._openDialog(option.label)}" 
                class="list-style dt-modal"
                >
                ${option.icon
               ? html`<img
                   src="${option.icon}"
                   alt="${option.label} icon"
                   class="help-icon"
                 />`
               : ''}
                ${option.label} 
                </button>
              </li>
            `
          : html`
              <li class="list-style">
                <button
                  style=" background : none ; border : none; --hover-color:white; font-size:12px;text-align:left"
                  @click="${() => this._redirectToHref(option.href)}"
                >
                  <img
                    src=${option.icon}
                    style="width: 15px; height: 15px"
                    alt=${option.label}
                  />
                  ${option.label.replace(/-/g, ' ')}
                </button>
              </li>
            `}
      `
    ):''}
    </ul>


    </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _redirectToHref(href) {
    let newHref = href;
    if (!/^https?:\/\//i.test(newHref)) {
      newHref = `http://${newHref}`;
    }
    window.open(newHref, '_blank');
  }

  _openDialog(label) {
    const id=label.replace(/\s/g, '-').toLowerCase();
    const modal= document.querySelector(`#${id}`);
    modal.shadowRoot.querySelector('dialog').showModal();
    document.querySelector('body').style.overflow = "hidden"
  }

  _handleHover() {
    const ulElement = this.shadowRoot.querySelector('ul');
    ulElement.style.display = 'block';
  }

  _handleMouseLeave() {
    const ulElement = this.shadowRoot.querySelector('ul');
    ulElement.style.display = 'none';
  }
}

window.customElements.define('dt-dropdown', DtDropdown);

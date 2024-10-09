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

      .dropdown {
        position: relative;
        display: inline-block;
      }
      button.dt-dropdown{
        padding:.5em;
        border:none;
        background-color: var(--dropdown-button-color, #00897B);
        color: var(--dropdown-button-text-color, #ffffff);
        border-radius:4px;
        }


      .dropdown ul {
        position: absolute;
        z-index: 999;
        min-width: 15rem;
        display: none;
        border: 0.5px solid var(--primary-color,#3f729b);
        background: #fff;
        padding: .4rem 0;
        margin: 0;
        list-style: none;
        width: 100%;
        border-radius: 3px;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
      }

      .dropdown ul button {
        display: block;
        padding: .4rem 1em;
        text-decoration: none;
        color: var(--primary-color,#3f729b);
        font-size: 1rem;
        border-radius: 0.25em;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        text-decoration: none;
        background: none;
        border: none;
      }

      .dropdown ul a:focus {
        background-color: var(--button-hover-color, #2980b9);
      }

      .list-style {
        color: var(--primary-color,#3f729b);
        font-size: 1rem;
      }

      .list-style:hover {
        background-color: var(--button-hover-color, #3f729b);
      }

      .icon {
        height: 1em;
      }
      .pre-list-item {
        padding: .7rem 1rem;
      }
      .dropdown ul .pre-list-item button {
        padding: 0;
        font-size: .8em
      }
        .pre-list-item:hover {
          background-color: var(--primary-color,#3f729b);
        }
        .pre-list-item:hover button {
          color: var(--surface-1, #ffffff);
        }
        .pre-list-item:hover button img {
          width: 1em;
          height: 1em;
          -webkit-filter: invert(100%) sepia(100%) saturate(6%) hue-rotate(105deg) brightness(102%) contrast(102%);
          filter: invert(100%) sepia(100%) saturate(6%) hue-rotate(105deg) brightness(102%) contrast(102%);
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
    class="dt-dropdown-list"
    @mouseover=${this._handleHover}
    @mouseleave=${this._handleMouseLeave}
    @focus=${this._handleHover}
    >

    ${this.options ? this.options.map(
      option => html`
        ${option.isModal
          ? html`
              <li
                class="pre-list-item"
                @click="${()=>this._openDialog(option.label)}"
                @keydown="${()=>this._openDialog(option.label)}"
              >

                <button
                style=""
                @click="${()=>this._openDialog(option.label)}"
                class="list-style dt-modal"
                >
                ${option.icon
               ? html`<img
                   src="${option.icon}"
                   alt="${option.label} icon"
                   class="icon"
                 />`
               : ''}
                ${option.label}
                </button>
              </li>
            `
          : html`
              <li
                class="list-style pre-list-item"
                @click="${() => this._redirectToHref(option.href)}"
                @keydown="${() => this._redirectToHref(option.href)}"
              >

                <button
                  style=""
                  @click="${() => this._redirectToHref(option.href)}"
                >
                  <img
                    src=${option.icon}
                    alt=${option.label}
                    class="icon"
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

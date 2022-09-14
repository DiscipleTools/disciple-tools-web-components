import { html, css, LitElement } from 'lit';

export class DtModal extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host:has(dialog[open]) {
        overflow: hidden;
      }

      .dt-modal {
        display: grid;
        background: var(--dt-modal-background-color, #fff);
        color: var(--dt-modal-color, #000);
        max-inline-size: min(90vw, 100%);
        max-block-size: min(80vh, 100%);
        max-block-size: min(80dvb, 100%);
        margin: auto;
        padding: 0;
        position: fixed;
        inset: 0;
        border-radius: 5%;
        box-shadow: var(--shadow-6);
        z-index: 1000;
        overflow: hidden;
        transition: opacity .1s ease-in-out
      }

      dialog:not([open]) {
        pointer-events: none;
        opacity: 0;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      context: { type: String },
      isHelp: { type: Boolean },
      isOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.context = 'default';
  }

  _openModal() {
    this.shadowRoot.querySelector('dialog').showModal();
  }

  _dismiss() {
    this.open = false;
  }

  render() {
    return html`
      <dialog id="" class="dt-modal">
          <form method="dialog">
              <header>
                  <h1 id="modal-field-title">
                      ${this.title}
                  </h1>
                  <button @click="${this._dismiss}" class='toggle'>
                    <svg viewPort="0 0 12 12" version="1.1" width='12' height='12'>
                        xmlns="http://www.w3.org/2000/svg">
                      <line x1="1" y1="11"
                            x2="11" y2="1"
                            stroke="currentColor"
                            stroke-width="2"/>
                      <line x1="1" y1="1"
                            x2="11" y2="11"
                            stroke="currentColor"
                            stroke-width="2"/>
                    </svg>
                  </button>
              </header>
              <article>
                <slot name="content"></slot>
              </article>
              <footer>
                  <button class="button small" data-close="" aria-label="Close reveal" type="button" onclick="this.closest('dialog').close('close')">
                    <slot name="close-button">Close</slot>
                  </button>
                  ${
                    this.isHelp? html`
                      <div class="help-more">
                          <h5>Need more help?</h5>
                          <a class="button small" id="docslink" href="https://disciple.tools/user-docs" target="_blank">Read the documentation</a>
                      </div>
                    `: null
                  }
              </footer>
          </form>
      </dialog>

      <button class="button small" data-open="" aria-label="Open reveal" type="button" @click="${this._openModal}"><slot name="openButton">Open Dialogue</slot></button>
      `;
  }
}

window.customElements.define('dt-modal', DtModal);

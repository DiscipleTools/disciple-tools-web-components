import { html, css, LitElement } from 'lit';

export class DtTextArea extends LitElement {
  static get styles() {
    return css`
      textarea {
        color: var(--color-text, #000);
        appearance: none;
        background-color: var(--background-color, pink);
        border: 1px solid var(--color-gray, pink);
        border-radius: 3px;
        -webkit-box-shadow: inset 0 1px 2px hsl(0deg 0% 4% / 10%);
        box-shadow: inset 0 1px 2px hsl(0deg 0% 4% / 10%);
        box-sizing: border-box;
        display: block;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 300;
        height: 10rem;
        line-height: 1.5;
        margin: 0 0 1.0666666667rem;
        padding: 0.5333333333rem;
        transition: box-shadow .5s,border-color .25s ease-in-out,-webkit-box-shadow .5s;
        width: 100%;
        overflow: hidden;
        position: relative;
        outline: 0;
        resize: none;
      }
      input:disabled, input[readonly], textarea:disabled, textarea[readonly] {
        background-color: #e6e6e6;
        cursor: not-allowed;
      }
    `;
  }

  static get properties() {
    return {
      id: { type: String },
      fieldName: { type: String },
      value: { type: String },
      icon: { type: String },
      disabled: { type: Boolean },
      privateField: { type: Boolean },
      privateLabel: { type: String },
      loading: { type: Boolean },
      saved: { type: Boolean },
      onchange: { type: String },
    };
  }

  constructor() {
    super();
    this.id = '';
    this.fieldName = '';
    this.value = '';
    this.icon = '';

    this.disabled = false;
    this.privateField = false;
    this.privateLabel = "Private Field: Only I can see it's content";
  }

  onChange(e) {
    this.value = e.target.value;

    console.log(this.value);

    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  labelTemplate() {
    return html`
      <dt-label
        ?private="${this.privateField}"
      >
        ${this.fieldName}
      </dt-label>
    `;
  }

  render() {
    return html`
      ${this.labelTemplate()}

      <textarea
      id="${this.id}"
      aria-label="${this.fieldName}"
      type="text"
      ?disabled=${this.disabled}
      class="text-input"
      @change=${this.onChange}
      .value="${this.value}"
      ></textarea>
    `;
  }
}

window.customElements.define('dt-textarea', DtTextArea);

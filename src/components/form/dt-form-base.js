import { css, html } from 'lit';
import DtBase from '../dt-base.js';
import 'element-internals-polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import './dt-label/dt-label.js';
import '../icons/dt-spinner.js';
import '../icons/dt-icon.js';
import '../icons/dt-checkmark.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Extends `DtBase` to add features specific to form components, including base styles
 * and integration with HTML forms.
 *
 * This also adds a label above the form input.
 *
 * @extends DtBase
 */
export default class DtFormBase extends DtBase {
  static get formAssociated() {
    return true;
  }

  static get styles() {
    return [
      css`
        .input-group {
          position: relative;
        }
        .input-group.disabled {
          background-color: var(--disabled-color);
        }

        /* === Inline Icons === */
        .icon-overlay {
          position: absolute;
          inset-inline-end: 0.5rem;
          top: 0;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding-block: 0.5rem;
          box-sizing: border-box;
          pointer-events: none;
        }

        .icon-overlay.alert {
          color: var(--alert-color);
          cursor: pointer;
        }
        .icon-overlay.success {
          color: var(--success-color);
          width: 1.4rem;
        }
      `,
      css`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .icon-overlay.fade-out {
          opacity: 0;
          animation: fadeOut 4s;
        }
      `,
      css`
        .error-container {
          display: flex;
          align-items: center;
          font-family: var(--font-family);
          font-size: 0.875rem;
          font-weight: 300;
          padding: 3px 0.5rem;
          gap: 0.5rem;

          border: solid 1px var(--color-alert);
          background-color: var(--color-alert-container);
          color: var(--color-on-alert-container);

          &.slotted .attr-msg {
            display: none;
          }
        }
        .invalid ~ .error-container {
          border-top: none;
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      /**
       * The name attribute used to identify an input within a form.
       * This will be submitted with the form as the field's key.
       */
      name: { type: String },
      /**
       * Text to be displayed in the label above the form field.
       * <br/><br/>
       * Leave this empty to not display a label.
       */
      label: { type: String },
      /**
       * Icon to be used beside the label. This should be a URL to an image file.
       * <br/><br/>
       * To use an embedded SVG as the icon, see the `icon` slot.
       */
      icon: { type: String },
      /** Alt text to be added to icon image */
      iconAltText: { type: String },
      /** Indicates if field is marked with a lock icon to indicate private fields. */
      private: { type: Boolean },
      /** Tooltip text to be added to private icon. */
      privateLabel: { type: String },
      /** Disables field. */
      disabled: { type: Boolean },
      /** Validates that field is not empty when form is submitted and displays error if not. */
      required: { type: Boolean },
      /** Error message to be displayed for required field validation. */
      requiredMessage: { type: String },
      /**
       * _Internal state value not available via HTML attribute._
       * <br/><br/>
       * Indicates that the form field has been changed to use when validating form.
       */
      touched: {
        type: Boolean,
        state: true,
      },
      /**
       * _Internal state value not available via HTML attribute._
       * <br/><br/>
       * Indicates that the form field is not valid to use when validating form.
       */
      invalid: {
        type: Boolean,
        state: true,
      },
      /** Enables error state with error icon. This error message will be displayed. */
      error: { type: String },
      /** Enables display of loading indicator. */
      loading: { type: Boolean },
      /** Enables display of saved indicator. */
      saved: { type: Boolean },

      errorSlotted: { type: Boolean, attribute: false },
    };
  }

  /**
   * Identifies the form element to receive focus when the component receives focus.
   */
  get _field() {
    return this.shadowRoot.querySelector('input, textarea, select');
  }

  /**
   * Sets the focus target to `_field`.
   */
  get _focusTarget() {
    return this._field;
  }

  constructor() {
    super();
    this.touched = false;
    this.invalid = false;
    this.internals = this.attachInternals();

    // catch oninvalid event (when validation is triggered from form submit)
    // and set touched=true so that styles are shown
    this.addEventListener('invalid', e => {
      if (e) {
        // hide default html validation pop-up messages, since we are using our own
        e.preventDefault();
      }
      this.touched = true;
      this._validateRequired();
    });
  }

  firstUpdated(...args) {
    super.firstUpdated(...args);

    // Check if tooltip slot has any content to add CSS class and
    // hide standard tooltip content
    const slot = this.shadowRoot.querySelector('slot[name=error]');
    if (slot) {
      slot.addEventListener('slotchange', event => {
        const changedSlot = event.target;
        const nodes = changedSlot.assignedNodes();
        let value = false;
        // dt-icon has a nested slot that comes from the form-base and is passed along,
        // so we need to check if slot is a slot and then check if that has assignedNodes.
        if (nodes.length > 0) {
          if (nodes[0].tagName === 'SLOT') {
            value = nodes[0].assignedNodes().length > 0;
          } else {
            value = true;
          }
        }
        this.errorSlotted = value;
      });
    }

    // set initial form value
    const formdata = DtFormBase._jsonToFormData(this.value, this.name);
    this.internals.setFormValue(formdata);
    this._validateRequired();
  }

  /**
   * Recursively create FormData from JSON data
   * @param formData
   * @param data
   * @param parentKey
   * @private
   */
  static _buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach(key => {
        this._buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key,
        );
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }

  /**
   * Convert JSON to FormData object
   * @param data
   * @param parentKey - prefix for all values. Should be the field name
   * @returns {FormData}
   * @private
   */
  static _jsonToFormData(data, parentKey) {
    const formData = new FormData();
    DtFormBase._buildFormData(formData, data, parentKey);
    return formData;
  }

  /**
   * Interacts with the form internals to set the form value that will be submitted with a standard
   * HTML form.
   * @param value
   * @protected
   */
  _setFormValue(value) {
    // handle complex types like arrays and objects by converting to FormData
    const formdata = DtFormBase._jsonToFormData(value, this.name);
    this.internals.setFormValue(formdata, value);
    this._validateRequired();
    this.touched = true;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * Not implemented by default.
   *
   * Can/should be overriden by each component to implement logic for checking if a value is entered/selected
   * @private
   */
  _validateRequired() {
    // const { value } = this;
    // const input = this.shadowRoot.querySelector('input');
    // if (value === '' && this.required) {
    //   this.invalid = true;
    //   this.internals.setValidity({
    //     valueMissing: true
    //   }, this.requiredMessage || 'This field is required', input);
    // } else {
    //   this.invalid = false;
    //   this.internals.setValidity({});
    // }
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Renders the `<dt-label>` element. Should be used in each component to place the label in
   * the appropriate location.
   * @returns {TemplateResult<1>|string}
   */
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
      >
        ${!this.icon
          ? html`<slot name="icon-start" slot="icon-start"></slot>`
          : null}
        ${this.label}
      </dt-label>
    `;
  }

  _errorClasses() {
    return {
      'error-container': true,
      slotted: this.errorSlotted,
    };
  }
  renderIcons() {
    return html`
      ${this.touched && this.invalid
        ? html`<div class="${classMap(this._errorClasses())}">
            <dt-icon
              icon="mdi:alert-circle"
              class="alert"
              size="1.4rem"
            ></dt-icon>
            <span class="error-text">
              ${this.internals.validationMessage}
            </span>
          </div> `
        : null}
      ${this.error
        ? html`<div class="${classMap(this._errorClasses())}">
            <dt-icon
              icon="mdi:alert-circle"
              class="alert"
              size="1rem"
            ></dt-icon>
            <span class="error-text">
              <slot name="error"></slot>
              <span class="attr-msg">${this.error}</span>
            </span>
          </div>`
        : null}
      ${this.loading
        ? html`<dt-spinner class="icon-overlay"></dt-spinner>`
        : null}
      ${this.saved
        ? html`<dt-checkmark
            class="icon-overlay success fade-out"
          ></dt-checkmark>`
        : null}
    `;
  }

  /**
   * Renders the component. This should be overridden by each component.
   * @returns {TemplateResult<1>}
   */
  render() {
    return html`
      ${this.labelTemplate()}
      <slot></slot>
    `;
  }

  reset() {
    if (this._field?.reset) {
      this._field.reset();
    }
    this.value = '';
    this._setFormValue('');
  }
}

import ApiService from './apiService.js';

export default class ComponentService {
  constructor(postType, postId, nonce, apiRoot = '') {
    this.postType = postType;
    this.postId = postId;
    this.nonce = nonce;
    this.apiRoot = `${apiRoot.trimEnd('/')}/`; // ensure it ends with /

    this.api = new ApiService(this.nonce, this.apiRoot);

    this.autoSaveComponents = [
      'dt-connection',
      'dt-date',
      'dt-location',
      'dt-multi-select',
      'dt-number',
      'dt-single-select',
      'dt-tags',
      'dt-text',
      'dt-textarea',
      'dt-toggle',
    ];
  }

  /**
   * Enable auto-save feature for all components on the current page
   */
  enableAutoSave() {
    const allElements = document.querySelectorAll(this.autoSaveComponents.join(','));
    if (allElements) {
      allElements.forEach(el => el.addEventListener('change', this.handleChangeEvent));
    }
  }

  handleChangeEvent(event) {
    const details = event.detail;
    if (details) {
      const { field, newValue } = details;
      const component = event.target.tagName.toLowerCase();
      const apiValue = ComponentService.convertValue(component, newValue);

      // Update post via API
      this.api.updatePost(this.postType, this.postId, {
        [field]: apiValue,
      })
    }
  }

  /**
   * Convert value returned from a component into what is expected by DT API
   * @param {string} component Tag name of component. E.g. dt-text
   * @param {mixed} value
   * @returns {mixed}
   */
  static convertValue(component, value) {
    // todo: write tests for this
    let returnValue = value;

    // Convert component value format into what the API expects
    switch (component) {
      case 'dt-tags':
        returnValue = {
          values: value.map(item => {
            const ret = {
              value: item.id,
            }
            if (item.delete) {
              ret.delete = item.delete;
            }
            return item;
          }),
          force_values: false,
        }
        break;

      // todo: other fields
      default:
        break;
    }

    return returnValue;
  }
}

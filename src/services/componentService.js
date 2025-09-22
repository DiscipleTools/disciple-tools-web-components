/* eslint-disable no-unused-vars */
import ApiService from './apiService.js';

export default class ComponentService {
  /**
   * Instance of ApiService created in `initialize` method
   * @returns {ApiService}
   */
  get api() {
    return this._api;
  }

  /**
   * Initialize ComponentService
   * @param postType - D.T Post Type (e.g. contacts, groups, etc.)
   * @param postId - ID of current post
   * @param nonce - WordPress nonce for authentication
   * @param apiRoot - Root of API (default: wp-json) (i.e. the part before dt/v1/ or dt-posts/v2/)
   */
  constructor(postType, postId, nonce, apiRoot = 'wp-json') {
    this.postType = postType;
    this.postId = postId;
    this.nonce = nonce;

    this._api = new ApiService(this.nonce, apiRoot);
    this.apiRoot = this._api.apiRoot;

    this.autoSaveComponents = [
      'dt-connection',
      'dt-date',
      'dt-datetime',
      'dt-location',
      'dt-multi-select',
      'dt-number',
      'dt-single-select',
      'dt-tags',
      'dt-text',
      'dt-textarea',
      'dt-toggle',
      'dt-multi-text',
      'dt-multi-select-button-group',
      'dt-list',
      'dt-button'
    ];

    this.dynamicLoadComponents = [
      'dt-connection',
      'dt-tags',
      'dt-modal',
      'dt-list',
      'dt-button',
      'dt-location'
    ]
    
    this.debouncedSearch = ComponentService.debounce(ComponentService.changeEvent, 1000);
  }

  /**
   * Initialize components on the page with necessary event listeners
   */
  initialize() {
    if (this.postId) {
      this.enableAutoSave();
    }

    this.attachLoadEvents();
  }

  /**
   * Attach onload events to components that load their options
   * dynamically via API
   * @param {string} [selector] (Optional) Override default selector
   */
  async attachLoadEvents(selector) {
    const elements = document.querySelectorAll(
      selector || this.dynamicLoadComponents.join(',')
    );

    // // check if there is dt-modal and duplicate-detected class with it on DOM.
    // const filteredElements = Array.from(elements).filter(
    //   element =>
    //     element.tagName.toLowerCase() === 'dt-modal' &&
    //     element.classList.contains('duplicate-detected')
    // );
    // // calling the function to check duplicates
    // if (filteredElements.length > 0) {
    //   this.checkDuplicates(elements, filteredElements);
    // }

    if (elements) {
      elements.forEach(el => {
        // prevent multiple event attachments if this is called multiple times
        if (!el.dataset['eventDtGetData']) {
          el.addEventListener('dt:get-data', this.handleGetDataEvent.bind(this));
          el.dataset['eventDtGetData'] = true;
        }
      });
    }
  }

  async checkDuplicates(elements, filteredElements) {
    const dtModal = document.querySelector('dt-modal.duplicate-detected');
    if (dtModal) {
      const button = dtModal.shadowRoot.querySelector(
        '.duplicates-detected-button'
      );
      if (button) {
        button.style.display = 'none';
      }
      const duplicates = await this._api.checkDuplicateUsers(
        this.postType,
        this.postId
      );
      // showing the button to show duplicates
      if (filteredElements && duplicates.ids.length > 0) {
        if (button) {
          button.style.display = 'block';
        }
      }
    }
  }

  /**
   * Enable auto-save feature for all components on the current page
   * @param {string} [selector] (Optional) Override default selector
   */
  enableAutoSave(selector) {
    const allElements = document.querySelectorAll(
      selector || this.autoSaveComponents.join(',')
    );
    if (allElements) {
      allElements.forEach(el =>{
        el.addEventListener('change', this.handleChangeEvent.bind(this))
      });
    }
  }

  /**
   * Event listener for load events.
   * Will attempt to load data from API and call success/error callback
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async handleGetDataEvent(event) {
    const details = event.detail;
    if (details) {
      const { field, query, onSuccess, onError } = details;
      try {
        const component = event.target.tagName.toLowerCase();
        let values = [];
        switch (component) {
          case 'dt-button': {
            const contactApiData = await this._api.getContactInfo(
              this.postType,
              this.postId
            );
            values = contactApiData;
          };
            break;
          case 'dt-list': {
            const listResponse = await this._api.fetchPostsList(this.postType, query)
            values = listResponse.posts
          }
          break;
          case 'dt-connection': {
            const postType = details.postType || this.postType;
            const connectionResponse = await this._api.listPostsCompact(
              postType,
              query
            );
            // for filtering the user itself from the response.
            const filteredConnectionResponse = {
              ...connectionResponse,
              posts: connectionResponse.posts.filter(
                post => post.ID !== parseInt(this.postId, 10)
              ),
            };

            if (filteredConnectionResponse?.posts) {
              values = ComponentService.convertApiValue('dt-connection', filteredConnectionResponse?.posts);
            }
            break;
          }
          case 'dt-location': {
            values = await this._api.getLocations(
              this.postType,
              field,
              query
            );
            values = values.location_grid.map(value => ({
              id: value.ID,
              label: value.name,
            }));
            break;
          }
          case 'dt-tags':
          default:
            values = await this._api.getMultiSelectValues(
              this.postType,
              field,
              query
            );
            values = values.map(value => ({
              id: value,
              label: value,
            }));
            break;
        }
        onSuccess(values);
      } catch (ex) {
        onError(ex);
      }
    }
  }

  /**
   * Event listener for change events.
   * Will set loading property, attempt to save value via API,
   * and then set saved/invalid attribute based on success
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async handleChangeEvent(event) {
    const details = event.detail;
    if (details) {
      const { field, newValue, oldValue, remove } = details;
      const component = event.target.tagName.toLowerCase();
      const apiValue = ComponentService.convertValue(
        component,
        newValue,
        oldValue
      );

      event.target.setAttribute('loading', true);

      // Update post via API
      try {
        let apiResponse;
        switch(component) {
          case 'dt-users-connection': {
            // todo: this doesn't look like it will actually edit the field itself. And this logic should not be done inside this service. Move to theme.
            if (remove === true) {
              apiResponse = await this._api.removePostShare(this.postType, this.postId, apiValue);
              break;
            }
            apiResponse = await this._api.addPostShare(this.postType, this.postId, apiValue)
            break;
          }
          case 'dt-number': {
            this.debouncedSearch(field, apiValue, component, this._api, this.postType, this.postId);
            break;
          }
          default: {
            apiResponse = await this._api.updatePost(this.postType, this.postId, {
              [field]: apiValue,
            });

            document.dispatchEvent(new CustomEvent('dt:post:update', {
              detail: {
                'response': apiResponse,
                'field': field,
                'value': apiValue,
                'component': component,
              },
            }));
            break;
          }
        }

        event.target.removeAttribute('loading');
        event.target.setAttribute('error', '');
        event.target.setAttribute('saved', true);
      } catch (error) {
        console.error(error);
        event.target.removeAttribute('loading');
        event.target.setAttribute('invalid', true); // this isn't hooked up yet
        event.target.setAttribute('error', error.message || error.toString());
      }
    }
  }

  static debounce(callback, delay) {
    let timeoutId; // This variable holds the timer ID

    return (...args) => {
      // Clear any existing timer
      clearTimeout(timeoutId);

      // Set a new timer
      timeoutId = setTimeout(() => {
        // Execute the callback function with the provided arguments
        callback(...args);
      }, delay);
    };
  }

  static async changeEvent(field, apiValue, component, thisApi, postType, postId) {
    const apiResponse = await thisApi.updatePost(postType, postId, {
              [field]: apiValue,
            });

    document.dispatchEvent(new CustomEvent('dt:post:update', {
      detail: {
        'response': apiResponse,
        'field': field,
        'value': apiValue,
        'component': component,
      },
    }));
  }

  /**
   * Convert value returned from API into what is expected by each component
   * @param {string} component Tag name of component. E.g. dt-text
   * @param {mixed} value
   * @returns {mixed}
   */
  static convertApiValue(component, value) {
    let returnValue = value;
    switch (component) {
      case 'dt-connection':
        returnValue = value.map(post => ({
          id: post.ID,
          label: post.name ?? post.post_title,
          link: post.permalink,
          status: post.status,
        }));
        break;
      default:
        break;
    }
    return returnValue;
  }

  /**
   * Convert value returned from a component into what is expected by DT API
   * @param {string} component Tag name of component. E.g. dt-text
   * @param {mixed} value
   * @returns {mixed}
   */
  static convertValue(component, value, oldValue) {
    let returnValue = value;

    // Convert component value format into what the API expects
    if (value) {
      switch (component.toLowerCase()) {
        case 'dt-toggle':
          if (typeof value === 'string') {
            returnValue = value.toLowerCase() === 'true';
          }
          break;
        case 'dt-multi-select':
        case 'dt-multi-select-button-group':
        case 'dt-tags':
          if (typeof value === 'string') {
            returnValue = [value];
          }
          returnValue = {
            values: returnValue.map(item => {
              if (typeof item === 'string') {
                const ret = {
                  value: item,
                };
                if (item.startsWith('-')) {
                  ret.delete = true;
                  ret.value = item.substring(1);
                }
                return ret;
              }
              const ret = {
                value: item.id,
              };
              if (item.delete) {
                ret.delete = item.delete;
              }
              return ret;

            }),
            force_values: false,
          };
          break;
        case 'dt-users-connection': {
           // Initialize an empty array to hold the differences found.
            const userDataDifferences=[];
            // Create a Map from oldValue for quick lookups by ID.
            const oldUsersMap = new Map(oldValue.map(user => [user.id,user]));

            for (const newUserObj of returnValue) {
            // Retrieve the corresponding old object from the map using the ID.
              const oldUserObj = oldUsersMap.get(newUserObj.id);
              const diff = { id: newUserObj.id, changes: {} };

            // Check if the old object exists (i.e., the current new object may be new).
              if (!oldUserObj) {
                  // New object added
                  diff.changes = { ...newUserObj }; // Store all properties of the new object as changes.
                  userDataDifferences.push(diff);
                  break;
              } else {

                // Existing object found; we need to compare their properties.
                  let hasDiff = false;
                  const allKeys = new Set([...Object.keys(oldUserObj), ...Object.keys(newUserObj)]);

                  // Iterate through all keys to compare values.
                  for (const key of allKeys) {
                      if (newUserObj[key] !== oldUserObj[key]) {
                          diff.changes[key] = Object.prototype.hasOwnProperty.call(newUserObj, key) ? newUserObj[key] : undefined;
                          // Set the hasDiff flag to true as a difference was found.
                          hasDiff = true;
                      }
                  }
                  if (hasDiff){ userDataDifferences.push(diff);
                  break;
                }
              }
          }

          returnValue = userDataDifferences[0].id;
          break;
        }
        case 'dt-connection':
        case 'dt-location':
              if (typeof value === 'string') {
                returnValue = [
                  {
                    id: value,
                  },
                ];
              }
              returnValue = {
                values: returnValue.map(item => {
                  const ret = {
                    value: item.id,
                  };
                  if (item.delete) {
                    ret.delete = item.delete;
                  }
                  return ret;
                }),
                force_values: false,
              };
          break;
        case 'dt-multi-text':
          if (Array.isArray(value)) {
            returnValue = value.map(x => {
              const ret = {
                ...x,
              };
              delete ret.tempKey;
              return ret;
            });
          } else if (typeof value === 'string') {
            returnValue = [{
              value,
            }];
          }
          break;
        default:
          break;
      }
    }

    return returnValue;
  }
}

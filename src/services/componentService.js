/* eslint-disable no-unused-vars */
import ApiService from './apiService.js';

export default class ComponentService {
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
    this.apiRoot = `${apiRoot}/`.replace('//', '/'); // ensure it ends with /

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
      'dt-comm-channel',
      'dt-multiselect-buttons-group',
      'dt-list',
      'dt-button'
    ];

    this.dynamicLoadComponents = [
      'dt-connection',
      'dt-tags',
      'dt-modal',
      'dt-list',
      'dt-button',
      'dt-list-filters'
    ]
  }

  /**
   * Initialize components on the page with necessary event listeners
   */
  initialize() {
    if (this.postId) {
      this.enableAutoSave();
    }
    /*
    This is explicitly created to handle custom event send by "Create New Contact form - Save Button" with empty postId
    as "enableautoSave" is to only work On Edit page(where there is some postId).
    */
    const createPostButton = document.querySelector(
      'dt-button#create-post-button'
    );
    if (createPostButton) {
      createPostButton.addEventListener(
        'send-data',
        this.processFormSubmission.bind(this)
      );
    }

    // Handling click event of dt-button (favorite-button) which is inside DT-List
    const dtListComponent = document.querySelector('dt-list');
    if (dtListComponent) {
      if (dtListComponent.tagName.toLowerCase() === 'dt-list') {
        dtListComponent.addEventListener(
          'customClick',
          this.handleCustomClickEvent.bind(this)
        );
      }
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

    // check if there is dt-modal and duplicate-detected class with it on DOM.
    const filteredElements = Array.from(elements).filter(
      element =>
        element.tagName.toLowerCase() === 'dt-modal' &&
        element.classList.contains('duplicate-detected')
    );
    // calling the function to check duplicates
    if (filteredElements.length > 0) {
      this.checkDuplicates(elements, filteredElements);
    }

    if (elements) {
      elements.forEach(el =>
        el.addEventListener('dt:get-data', this.handleGetDataEvent.bind(this))
      );
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
      const duplicates = await this.api.checkDuplicateUsers(
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
        if (el.tagName.toLowerCase() === 'dt-button') {
          el.addEventListener('customClick', this.handleCustomClickEvent.bind(this));
        }
        el.addEventListener('change', this.handleChangeEvent.bind(this))
      });
    }
  }

  async handleCustomClickEvent(event) {
    const details = event.detail;
    if (details) {
      const { field, toggleState } = details;
      event.target.setAttribute('loading', true);
      let apiValue;
      if (field.startsWith('favorite-button')) {
        apiValue = { favorite: toggleState };
        if (/\d$/.test(field)) {
          this.postId = field.split('-').pop()
        }
      } else if (field.startsWith('following-button') || field.startsWith('follow-button')) {
        apiValue = {
          follow: { values: [{ value: '1', delete: toggleState }] },
          unfollow: { values: [{ value: '1', delete: !toggleState }] }
        };
      } else {
        // Add other conditions for field starts with
        console.log('No match found for the field');
      }

      // Update post via API
      try {
        const apiResponse = await this.api.updatePost(
          this.postType,
          this.postId ,
          apiValue
        );
      } catch (error) {
        console.error(error);
        event.target.removeAttribute('loading');
        event.target.setAttribute('invalid', true); // this isn't hooked up yet
        event.target.setAttribute('error', error.message || error.toString());
      }
    }
  }

  /**
    * Handle Post creation on new contact form
    *
    */
  async processFormSubmission(event){
    // const createPostButton = document.querySelector('dt-button#create-post-button');
    const details = event.detail;
    const { newValue } = details;

    try {
      const apiResponse = await this.api.createPost(
        this.postType, newValue.el
      );
      if (apiResponse) {
        window.location = apiResponse.permalink;
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
            const contactApiData = await this.api.getContactInfo(
              this.postType,
              this.postId
            );
            values = contactApiData;
          };
            break;
          case 'dt-list-filters': {
            const listResponse = await this.api.fetchSplitByPosts(this.postType, query);
            values = listResponse;

          }
            break;
          case 'dt-list': {
            const listResponse = await this.api.fetchPostsList(this.postType, query)
            values = listResponse.posts
          }
            break;
          case 'dt-connection': {
            const postType = details.postType || this.postType;
            const connectionResponse = await this.api.listPostsCompact(
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
              values = filteredConnectionResponse?.posts.map(value => ({
                id: value.ID,
                label: value.name,
                link: value.permalink,
                status: value.status,
              }));
            }
            break;
          }
          case 'dt-tags':
          default:
            values = await this.api.getMultiSelectValues(
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
        switch (component) {
          case 'dt-users-connection': {
            if (remove === true) {
              apiResponse = await this.api.removePostShare(this.postType, this.postId, apiValue);
              break;
            }
            apiResponse = await this.api.addPostShare(this.postType, this.postId, apiValue)
            break;
          }
          default: {
            apiResponse = await this.api.updatePost(this.postType, this.postId, {
              [field]: apiValue,
            });

            // Sending response to update value
            if (component === 'dt-comm-channel' && details.onSuccess) {
              details.onSuccess(apiResponse);
            }
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
      switch (component) {
        case 'dt-toggle':
          if (typeof value === 'string') {
            returnValue = value.toLowerCase() === 'true';
          }
          break;

        case 'dt-multi-select':
        case 'dt-tags':
          if (typeof value === 'string') {
            returnValue = [value];
          }
          returnValue = {
            values: returnValue.map(itemId => {
              const ret = {
                value: itemId.replace('-', ''),
              };
              if (itemId.startsWith('-')) {
                ret.delete = true;
              }
              return ret;
            }),
            force_values: false,
          };
          break;

        // seperate case for dt-users-connection
        case 'dt-users-connection': {
          // Initialize an empty array to hold the differences found.
          const userDataDifferences = [];
          // Create a Map from oldValue for quick lookups by ID.
          const oldUsersMap = new Map(oldValue.map(user => [user.id, user]));

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
              if (hasDiff) {
                userDataDifferences.push(diff);
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

        case 'dt-multiselect-buttons-group':
          if (typeof value === 'string') {
            returnValue = [
              {
                id: value,
              },
            ];
          }
          returnValue = {
            values: returnValue.map(item => {
              if (item.value.startsWith('-')) {
                const removedItem = item.value.replace('-', '');
                return {
                  value: removedItem,
                  delete: true,
                };
              }
              return item;
            }),
            force_values: false,
          };
          break;
        case 'dt-comm-channel': {
          const valueLength = value.length;
          // case: Delete
          if (oldValue && oldValue.delete === true) {
            returnValue = [oldValue];
          }
          // case: Add
          else if (
            value[valueLength - 1].key === '' ||
            value[valueLength - 1].key.startsWith('new-contact')
          ) {
            returnValue = [];
            value.forEach(obj => {
              returnValue.push({ value: obj.value });
            });
          }
          // case: Edit
          else {
            returnValue = value;
          }
          break;
        }
        default:
          break;
      }
    }

    return returnValue;
  }
}

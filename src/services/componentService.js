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
    ];

    this.dynamicLoadComponents = [
      'dt-connection',
      'dt-tags',
    ]
  }

  /**
   * Initialize components on the page with necessary event listeners
   */
  initialize() {
    if(this.postId){
      this.enableAutoSave();
    }
    this.attachLoadEvents();
  }

  /**
   * Attach onload events to components that load their options
   * dynamically via API
   * @param {string} [selector] (Optional) Override default selector
   */
  attachLoadEvents(selector) {
    const elements = document.querySelectorAll(
      selector || this.dynamicLoadComponents.join(',')
    );
    if (elements) {
      elements.forEach(el =>
        el.addEventListener('dt:get-data', this.handleGetDataEvent.bind(this))
      )
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
      allElements.forEach(el =>
        el.addEventListener('change', this.handleChangeEvent.bind(this))
      );
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
          case 'dt-connection': {
            const postType = details.postType || this.postType;
            const connectionResponse = await this.api.listPostsCompact(postType, query);
            // for filtering the user itself from the response.
            const filteredConnectionResponse = {
              ...connectionResponse,
              posts: connectionResponse.posts.filter(post => post.ID !== parseInt(this.postId, 10))
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
            values = await this.api.getMultiSelectValues(this.postType, field, query);
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
      const { field, newValue, oldValue} = details;
      const component = event.target.tagName.toLowerCase();
      const apiValue = ComponentService.convertValue(component, newValue, oldValue);

      event.target.setAttribute('loading', true);

      // Update post via API
      try {
      const apiResponse= await this.api.updatePost(this.postType, this.postId, {
          [field]: apiValue,
        });

        //Sending response to update value
        if(component==='dt-comm-channel' && details.onSuccess){
          details.onSuccess(apiResponse);
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
            values: returnValue.map(item => {
              if (typeof item === 'string') {
                const ret = {
                  value: item.replace('-', ''),
                };
                if (item.startsWith('-')) {
                  ret.delete = true;
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
            returnValue = [value];
          }
          returnValue = {
            values: returnValue.map(itemId => {
              const ret = {
                value: itemId,
              }
              return ret;
             }
            ) }
          break;

        case 'dt-comm-channel':
          let valueLength = value.length;
          //case: Delete
           if(oldValue && oldValue.delete===true){
            returnValue=[oldValue];
          }
          //case: Add
           else if(value[valueLength-1].key==='' || value[valueLength-1].key.startsWith('new-contact')){
              returnValue=[]
              value.forEach(obj=>{
                returnValue.push({value : obj.value})
                })
              }
            //case: Edit
              else{
                returnValue=value;

          }
          break;
        default:
          break;
      }
    }

    return returnValue;
  }
}

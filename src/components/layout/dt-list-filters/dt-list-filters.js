import { html, css } from 'lit';
import { msg, str } from '@lit/localize';
import { map } from 'lit/directives/map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';

export class DtListHelpBox extends DtBase {
  static get styles() {
    return css`
      :host {
        --number-of-columns: 7;
        font-family: var(--dt-list-font-family, var(--font-family));
        font-size: var(--dt-list-font-size, 15px);
        font-weight: var(--dt-list-font-weight, 300);
        line-height: var(--dt-list-line-height, 1.5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .section {
        container-type: inline-size;
        background-color: var(--dt-list-background-color, #fefefe);
        border: 1px solid var(--dt-list-border-color, #f1f1f1);
        border-radius: var(--dt-list-border-radius, 10px);
        box-shadow: var(--dt-list-box-shadow, 0 2px 4px rgb(0 0 0 / 25%));
        padding: var(--dt-list-section-padding, 1rem);
      }

      .header {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        gap: var(--dt-list-header-gap, 1.5em);
        flex-wrap: wrap;
      }

      .section-header {
        color: var(--dt-list-header-color, var(--primary-color));
        font-size: 22.5px;
        display: flex;
        justify-content: space-between;
        text-transform: capitalize;
        width: 100%;
      }

      .section-header button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: transparent;
        border: 0;
        border-radius: 0;
        cursor: auto;
        line-height: 1;
        padding: 0;
      }
      .accordion {
        background: #fefefe;
        list-style-type: none;
        margin: 10px 0 15px 0;
        border: 1px solid #e6e6e6;
      }
      .accordion  li {
          margin-bottom: 0;
          border-bottom: 1px solid #e6e6e6;
      }
      .accordion  li:last-child {
          border-bottom: none;
      }
      .accordion  li.active .accordion-title {
          background-color: #3f729b;
          color: #fff;
      }
      .accordion .accordion-title {
          font-weight: 700;
          padding: .5rem 1rem;
          font-size: 15px;
          border-bottom: 0;
          color: #3f729b;
          display: block;
          position: relative;
          text-decoration: none;
      }
      .accordion .accordion-title::before {
          content: "+";
          margin-top: -.5rem;
          position: absolute;
          right: 1rem;
          top: 50%;
      }
      .accordion li.active .accordion-title::before {
          content: "-";
      }
      .accordion .accordion-title:hover,  .accordion .accordion-title:focus {
        background-color: #e6e6e6;
      }
      .accordion .accordion-content {
          background-color: #fefefe;
          border-bottom: 0;
          color: #0a0a0a;
          display: none;
          padding: 1rem;
      }
      .accordion .accordion-content .list-view span {
          font-size: 14px;
      }
      .accordion .accordion-content .list-view:hover span {
          color: #2196f3;
      }
      a {
          color: #3f729b;
          cursor: pointer;
          line-height: inherit;
          text-decoration: none;
      }

      ul {
        margin: 0;
        padding: 0;
      }

      ul li {
        list-style-type: none;
      }

      input[type='checkbox'] {
        margin: 1rem;
      }

      ::slotted(svg) {
        fill: var(--fav-star-not-selected-color, #c7c6c1);
      }

      .icon-star {
        fill: var(--fav-star-not-selected-color, #c7c6c1); /* Default to gray (non-favorite) */
        margin: 0;
      }
      .icon-star.selected {
        fill: var(--fav-star-selected-color, #ffc105); /* Favorite state in yellow */
      }

      @media (min-width: 650px) {
     
        .btn {
        -webkit-appearance: none;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        display: inline-block;
        font-family: inherit;
        font-size: .9rem;
        line-height: 1;
        margin: 0 !important;
        text-align: center;
        -webkit-transition: background-color .25s ease-out, color .25s ease-out;
        transition: background-color .25s ease-out, color .25s ease-out;
        vertical-align: middle;
      }

      .btn.btn-primary {
        background-color: #3f729b;
        color: #fefefe;
        border-radius: 5px;
      }

      .btn.btn-primary:hover, .btn.btn-primary:focus {
        background-color: #366184;
        color: #fefefe;
      }

      .text-center {
        text-align: center;
      }

    .show {
      display: block; /* Show the list when active */
    }

    li {
      margin-bottom: 10px;
    }

    a {
      cursor: pointer;
    }

    .selected-value{
    display: flex
    }

    .accordion-content {
    display: none; /* Initially hide the content */
}

.accordion-content.show {
    display: block; /* Show the content when 'show' class is added */
}

.list-view {
   -webkit-column-gap: .2rem;
    -moz-column-gap: .2rem;
    column-gap: .2rem;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
    .list-view__text{
        text-overflow: ellipsis;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    display: inline-block;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    }

    .list-view__count {
    float: right;
    }

    .current-filter-list{
        background: #ecf5fc;
        border: 1px solid #c2e0ff;
        border-radius: 2px;
        font-size: .875rem;
        margin-bottom: .375rem;
        margin-right: 4px;
        padding: 4px 4px 4px 4px;
        position: relative;
    }

    #split_by_current_filter_select_labels{
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    }

 

      .btn.btn-primary .dt-button {
        margin: 0;
        border-radius: 5px;
      }

      .field-group select{
        background-color: #fefefe;
        border: 1px solid #cacaca;
        border-radius: 0;
        color: #0a0a0a;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 300;
        height: 2.5rem;
        line-height: 1.5;
        margin: 0 0 1.0666666667rem;
        padding: .5333333333rem 1.6rem .5333333333rem .5333333333rem;
        -webkit-transition: border-color .25s ease-in-out, -webkit-box-shadow .5s;
        transition: border-color .25s ease-in-out, -webkit-box-shadow .5s;
        transition: box-shadow .5s, border-color .25s ease-in-out;
        transition: box-shadow .5s, border-color .25s ease-in-out, -webkit-box-shadow .5s;
        width: calc(100% - 68px);
      }
      .field-group select:focus {
        outline: none;
        background-color: #fefefe;
        border: 1px solid #8a8a8a;
        -webkit-box-shadow: 0 0 5px #cacaca;
        box-shadow: 0 0 5px #cacaca;
        outline: none;
        -webkit-transition: border-color .25s ease-in-out, -webkit-box-shadow .5s;
        transition: border-color .25s ease-in-out, -webkit-box-shadow .5s;
        transition: box-shadow .5s, border-color .25s ease-in-out;
        transition: box-shadow .5s, border-color .25s ease-in-out, -webkit-box-shadow .5s;
      }
        
      .field-group .btn {
        margin-left: 12px !important;
      }

      .remove-filter{
      background: #ecf5fc;
      border: 1px solid #c2e0ff;
      border-radius: 2px;
      font-size: .875rem;
      margin-bottom: .375rem;
      margin-right: 4px;
      padding: 4px 4px 4px 4px;
      position: relative;
      margin-left: -4px;
      }
      .btn {
       -webkit-appearance: none;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        display: inline-block;
        font-family: inherit;
        font-size: .9rem;
        line-height: 1;
        margin: 0;
        padding: .85em 1em;
        text-align: center;
        -webkit-transition: background-color .25s ease-out, color .25s ease-out;
        transition: background-color .25s ease-out, color .25s ease-out;
        vertical-align: middle;
      }
      .btn-primary {
        background-color: #3f729b;
        color: #fefefe;
      }
      .btn-primary:hover, .btn-primary:focus {
        background-color: #366184;
        color: #fefefe;
      }

      @media (min-width: 950px) {
        .fieldsList {
          column-count: 3;
        }
      }

      @media (min-width: 1500px) {
        .fieldsList {
          column-count: 4;
        }
      }
    `;
  }

  static get properties() {
    return {
      postType: { type: String },
      postTypeLabel: { type: String },
      posttypesettings: { type: Object, attribute: true },
      posts: { type: Array },
      total: { type: Number },
      columns: { type: Array },
      sortedBy: { type: String },
      loading: { type: Boolean, default: true },
      offset: { type: Number },
      showArchived: { type: Boolean, default: false },
      showFieldsSelector: { type: Boolean, default: false },
      showBulkEditSelector: { type: Boolean, default: false },
      nonce: { type: String },
      payload: { type: Object },
      favorite: { type: Boolean },
      initialLoadPost: { type: Boolean, default: false },
      loadMore: { type: Boolean, default: false },
      headerClick: { type: Boolean, default: false },
      listFiltersTab: { type: Boolean, default: false },
      splitBy: { type: Boolean, default: false },
      selectedValue: { type: Object },
      sectionBodyVisible: { type: Boolean, default: true },
      splitByFields: { type: Array },
      selectedSplitByField: { type: Array },
      selectedField: { type: String },
      query: { type: String, state: true, },
      listItems: { type: Array },
      field: { type: String },
      currentFilterList: { type: Array },
      filterTabs: { type: Array },
      removeCurrentFilterList: { type: Boolean }
    };
  }


  constructor() {
    super();
    this.splitByFields = [];
    this.selectedSplitByField = [];
    this.selectedField = '';
    this.getSplitByFields();
    this.currentFilterList = [];
    this.sectionBodyVisible = true;
    this.removeCurrentFilterList = false;
  }

  getSplitByFields() {
    // Simulate fetching options from an array (can be API call in real scenario)

    if (window.list_settings) {
      for (const key in window.list_settings.post_type_settings.fields) {
        if (window.list_settings.post_type_settings.fields.hasOwnProperty(key)) {
          const field = window.list_settings.post_type_settings.fields[key];

          // Check if the field type is one of the allowed types
          const allowedTypes = ['multi_select', 'key_select', 'tags', 'user_select', 'location', 'boolean', 'connection'];

          if (allowedTypes.includes(field.type)) {
            // Check if the field is not private
            if (!field.private || field.private === false) {
              // Push the field to splitByFields if it meets the criteria
              this.splitByFields.push({
                key: key,
                label: field.name
              });
            }
          }
        }
      }


    }
  }

  firstUpdated() {

    if (window.post_type_fields) {
      this.postTypeSettings = window.post_type_fields;
    }

    //to pre-set the default filters
    this.currentFilterList = window.list_settings.filters.filters.filter(item =>
      item.type === "default" && item.tab === "default" && !item.visible

    ).map(item => item.labels ? item.labels.map(label => label) : item.name);

    // console.log(this.currentFilterList, 'this is current filter list');
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleCurrentFilterList = this._handleCurrentFilterList.bind(this);  // Ensure binding
    document.addEventListener('updated_current_filter_list', this._handleCurrentFilterList);
  }

  _handleCurrentFilterList(event) {
    //to update the current filter list for components like splitby in the DOM.
    this.currentFilterList = [event.detail.list];
    this.requestUpdate();
  }

  handleRadioSelection(item) {

    if (this.removeCurrentFilterList) {
      //here the remove filter functionlity will come..
    } else {
      this.query = this.splitBy ? { [this.selectedField]: [item.value] } : item.query;
      this.currentFilterList = item.labels ? item.labels.map(label => label) : [item];
    }

    if (!this.splitBy) {

      const updateCurrdentFilterList = new CustomEvent('updated_current_filter_list', {
        detail: {
          list: this.currentFilterList,
        },
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(updateCurrdentFilterList);
    }

    //from here the query will be send to dt-list component to update the list values.

    const event = new CustomEvent('query-updated', {
      detail: {
        query: this.query,
        splitBy: this.splitBy,
        onSuccess: result => {
          console.log(result);

        },
      },
      bubbles: true,
      composed: true,
    })

    this.removeCurrentFilterList = false;
    this.dispatchEvent(event);


  }

  toggleList(event) {
    // Prevent the default link behavior
    event.preventDefault();

    const listItem = event.target.closest('li');
    listItem.classList.toggle('active');

    // Find the accordion content to show/hide
    const accordionContent = listItem.querySelector('.accordion-content');

    const allAccordions = this.shadowRoot.querySelectorAll('.accordion-content');
    allAccordions.forEach(accordion => {
      if (accordion !== accordionContent) {
        accordion.classList.remove('show');
        accordion.closest('li').classList.remove('active');
      }
    });

    // Toggle the 'show' class on the accordion-content
    accordionContent.classList.toggle('show');

    // Optionally, change the text of the <a> link based on visibility
    const toggleLink = event.target;
    const isVisible = accordionContent.classList.contains('show');

  }

  toggleSection(event) {
    // Toggle the visibility of the section-body
    event.preventDefault();

    this.sectionBodyVisible = !this.sectionBodyVisible;
  }

  handleSelection(event) {
    this.selectedField = event.target.value;

  }

  openDialog(e, label) {
    e.preventDefault();
    const id = label.replace(/\s/g, '-').toLowerCase();

    //if we want to keep this inside st-list-help-box
    const dtListHelpBox = document.querySelector('dt-list-filters');
    const modalll = dtListHelpBox.shadowRoot.querySelector(`#${id}`)
    modalll.shadowRoot.querySelector('dialog').showModal();
    document.querySelector('body').style.overflow = "hidden"

  }

  _onFilterSubmit() {

    // Add logic to handle filtering based on selectedField


    this.query = { "field_id": this.selectedField, "filters": { "sort": "name", "fields_to_return": ["name", "favorite", "overall_status", "seeker_path", "milestones", "assigned_to", "groups", "last_modified"] } }

    const event = new CustomEvent('dt:get-data', {
      detail: {
        field: this.name,
        postType: this.postType,
        query: this.query,
        onSuccess: result => {
          this.selectedSplitByField = [...result];

        },
        onError: error => {
          console.warn(error);
          self.loading = false;
          this.canUpdate = false;
        },
      },
    })

    this.dispatchEvent(event);
  }

  removeFilter(target, innerArray) {

    // this.removeCurrentFilterList = true;
    const assignedToMeItem = innerArray.find(item => item.name === target);

    //call the handleRadioSelection with the updated query to remove the filter.
    // this.handleRadioSelection(assignedToMeItem);
  }

  render() {
    if (this.posts) {
      this.total = this.posts.length;
    }


    if (window.list_settings) {
      this.filterTabs = window.list_settings.filters.tabs;
      this.listItems = window.list_settings.filters.filters;
    }

    const groupedItems = {};

    this.listItems.forEach(item => {
      if (!groupedItems[item.tab]) {
        groupedItems[item.tab] = [];
      }
      groupedItems[item.tab].push(item);
    });


    const upperArrowSVG = html`<svg fill="#3f729b" 
    height="20px" width="20px" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 330 330" 
    xml:space="preserve"
    >
    <path id="XMLID_224_" 
          d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75
          c-3.979,0-7.794,1.581-10.607,4.394l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213
          c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
          C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394
          C331.464,244.748,331.464,235.251,325.606,229.393z"/>
    </svg>`;

    const downArrowSVG = html`<svg fill="#3f729b" height="20px" width="20px" version="1.1" 
                          id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 330 330" xml:space="preserve">
                  <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                  </svg>`;

    const circlePlusSVG = html`
                  <svg fill="#3f729b" height="17px" width="17px"  viewBox="0 0 14 14" version="1.1" 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                      <path d="M7.011,0.024C10.875,0.024 14.011,3.16 14.011,7.024C14.011,10.887 10.875,14.024 7.011,14.024C3.148,14.024 0.011,10.887 0.011,7.024C0.011,3.16 3.148,0.024 7.011,0.024ZM7.702,6.294L7.702,2.998L6.298,2.998L6.298,6.294L3.002,6.294L3.002,7.681L6.298,7.681L6.298,11.002L7.702,11.002L7.702,7.681L10.998,7.681L10.998,6.294L7.702,6.294Z" style="fill:000000;"/>
                  </svg>`;

    return html`
      <div class="section">
        <div class="header">
          <div class="section-header">
            <span
              class="section-header posts-header"
              style="display: inline-block">
              ${msg(str`${this.postTypeLabel ? this.postTypeLabel : this.postType}`)}
              </span>

                ${this.sectionBodyVisible ? html`
                <button class="upper-arrow" @click=${this.toggleSection}>
                ${upperArrowSVG}
                </button>
                `: html`
                <button class="down-arrow" @click=${this.toggleSection}>
                ${downArrowSVG}
                </button>
                `}
            </div>

            ${this.selectedValue ? html`
            <span class="selected-value">
            <div>List1</div>
            <div>List2</div>
            </span>
            `: ''}


        </div>

        <div class="section-body" style="display: ${this.sectionBodyVisible ? 'block' : 'none'}";>

        

        ${this.listFiltersTab ? html`
        <ul id="list-filter-tabs" class="accordion">

         ${this.filterTabs.map((tab, index) => html`
                <li 
                class="${index === 0 ? 'active'
        : ''}"
                 >
                    <a 
                    class="accordion-title" 
                    href="#" 
                    @click=${this.toggleList}
                    >
                    ${tab.label}${tab.count ? ` (${tab.count})` : ''}
                    </a>
                    <div 
                    class="accordion-content 
                    ${index === 0 ? 'show' : ''}"
                    >
                        ${groupedItems[tab.key] ? groupedItems[tab.key].map(item => html`
                            <div 
                            class="list-view "
                            >
                                <input 
                                ?checked=${item.type === 'default' && (item.visible !== '1' && item.visible !== '')} 
                                type="radio" 
                                value=${item.ID} 
                                name="selectedItem" 
                                @change=${() => this.handleRadioSelection(item)}
                                >
                                <span 
                                class="list-view__text"
                                >
                                ${item.name} 
                                </span>
                                <span 
                                class='list-view__count'
                                >
                                ${item.count}
                                </span>
                            </div>
                        `) : ''}
                       
                    </div>
                </li>
            `)}

        </ul>
        `: ''}

        ${this.splitBy ? html`


        <div id="split_by_current_filter_select_labels" >
        ${this.currentFilterList && this.currentFilterList.length > 0 ?
          this.currentFilterList.map(innerArray =>
            innerArray.map(item => html`
      <div class="current-filter-item">
        <a class="current-filter-list">
        ${item ? item.name : item}
        </a>

        ${item.field ?
                html`<button 
          class="current-filter-item 
          remove-filter" 
          @click=${() => this.removeFilter(item.name, innerArray)}
        >
          x
        </button>` : ''}
        
      </div>
    `)
          ) : ''}

        </div>

      <div 
      class="field-group"
      >
        <select 
        @change=${this.handleSelection} 
        id="split_by_current_filter_select"
        >
          <option 
          value="" 
          disabled 
          selected
          >Select split by field
          </option>
          ${this.splitByFields.map(field => html`
            <option 
            value="${field.key}"
            >${field.label} (${field.key})
            </option>
            `)}
            </select>
            
            <button 
            @click=${this._onFilterSubmit} 
            class="btn btn-primary loader"
            >Go
            </button>
      </div>

      ${this.selectedSplitByField[0] ? html`
      <ul 
      id="list-filter-tabs" 
      class="accordion"
      >
                <li>
                    <a 
                    class="accordion-title" 
                    href="#" 
                    @click=${this.toggleList}
                    >
                    Summary
                    </a>
                    <div 
                    class="accordion-content"
                    >
                        ${this.selectedSplitByField ? this.selectedSplitByField.map(item => html`
                            <div class="list-view ">
                                <input 
                                type="radio" 
                                name="selectedItem" 
                                @change=${() => this.handleRadioSelection(item)}
                                >
                                <span 
                                class="list-view__text"
                                >${item.label} 
                                </span>
                                <span 
                                class='list-view__count'
                                >${item.count}
                                </span>
                            </div>
                        `) : ''}
                       
                    </div>
                </li>
                </ul>
                `: ''}

      <span 
      id="split_by_current_filter_no_results_msg" 
      style="display: none; margin-inline-start: 10px;"
      >
        No results found
      </span>
      
      
          `: ''}


          
${this.listFiltersTab ? html`
        <div 
        class="custom_filter"
        >
        <a 
        @click=${(e) => this.openDialog(e, 'create-custom-filter')} 
        class="custom-filters-link"
        >${circlePlusSVG} Create Custom Filter
        </a>
        </div>

        <div 
        class="custom-filters">
        </div>
         `: ''}

        </div>


       <dt-modal 
       id="create-custom-filter" 
       hidebutton
       >
        <span 
        slot="content"
        >
        Test
        </span>
        </dt-modal>
      </div>
    `;
  }
}

window.customElements.define('dt-list-filters', DtListHelpBox);

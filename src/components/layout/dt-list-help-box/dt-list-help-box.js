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

      .toggleButton {
        color: var(--dt-list-header-color, var(--primary-color));
        font-size: 1rem;
        background: transparent;
        border: var(--dt-list-toggleButton, 0.1em solid rgb(0 0 0 / 0.2));
        border-radius: 0.25em;
        padding: 0.25em 0.5em;
        cursor: pointer;
      }

      .toggleButton svg {
        height: 0.9rem;
        transform: translateY(-2px);
        vertical-align: bottom;
        width: 1rem;
        fill: var(--dt-list-header-color, var(--primary-color));
        stroke: var(--dt-list-header-color, var(--primary-color));
      }

      .list_action_section {
          background-color: var(
          --dt-list-action-section-background-color,
          #ecf5fc
        );
        border-radius: var(--dt-list-border-radius, 10px);
        margin: var(--dt-list-action-section-margin, 30px 0);
        padding: var(--dt-list-action-section-padding, 20px);
      }
      .list_action_section_header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .close-button {
        outline: none;
        font-size: 2.5em;
        line-height: 1;
        color: var(--dt-list-action-close-button, var(--inactive-color));
        background: transparent;
        border: none;
        cursor: pointer;
      }
      .fieldsList {
        list-style-type: none;
        column-count: 1;
      }

      .list-field-picker-item {
        list-style-type: none;
      }

      .list-field-picker-item input {
        margin: 1rem;
      }

      .list-field-picker-item .dt-icon {
        height: var(--dt-list-field-picker-icon-size, 1rem);
        width: var(--dt-list-field-picker-icon-size, 1rem);
      }

      table {
        display: grid;
        border: 1px solid var(--dt-list-border-color, #f1f1f1);
        border-top: 0;
        border-collapse: collapse;
        min-width: 100%;
        grid-template-columns: 1fr;
      }

      /* table.table-contacts {
        display: table !important;
        width: 100%;
        border-collapse: collapse;
        border-radius: 0;
        margin-bottom: 1rem;
      } */

      table td:last-child {
        border-bottom: 1px solid var(--dt-list-border-color, #f1f1f1);
        padding-bottom: 2rem;
      }

      tbody,
      tr {
        display: contents;
      }

      thead {
        display: none;
      }
      /* table.table-contacts thead {
        display: table-header-group;
      }
      table.table-contacts tr {
        display: table-row;
      }
      table.table-contacts tbody {
        display: table-row-group;
      } */
      tr {
        cursor: pointer;
      }

      /* table.table-contacts tr:nth-child(2n + 1) {
        background: #fefefe;
      } */

      tr:nth-child(2n + 1) {
        background: #f1f1f1;
      }

      tr:hover {
        background-color: var(--dt-list-hover-background-color, #ecf5fc);
      }

      tr a {
        color: var(--dt-list-link-color, var(--primary-color));
      }

      .column-name {
        pointer-events: none;
        font-size: 15px;
        font-weight: 700;
      }
      #sort-arrows {
        grid-template-columns: 4fr 1fr;
        display: flex;
        flex-direction: column;
        height: 1em;
        justify-content: space-evenly;
      }
      th.all span.sort-arrow-up {
        border-color: transparent transparent
          var(--dt-list-sort-arrow-color, #dcdcdc) transparent;
        border-style: solid;
        border-width: 0 0.3em 0.3em 0.3em;
      }

      th.all span.sort-arrow-down {
        content: '';
        border-color: var(--dt-list-sort-arrow-color, #dcdcdc) transparent
          transparent;
        border-style: solid;
        border-width: 0.3em 0.3em 0;
      }

      th.all span.sort-arrow-up.sortedBy {
        border-color: transparent transparent
          var(--dt-list-sort-arrow-color-highlight, #41739c) transparent;
      }

      th.all span.sort-arrow-down.sortedBy {
        border-color: var(--dt-list-sort-arrow-color-highlight, #41739c)
          transparent transparent;
      }

      td {
        border: 0;
        grid-column: 1 / span 3;
        padding-inline-start: 1em;
      }

      td::before {
        content: attr(title) ': ';
        padding-inline-end: 1em;
      }

      td.no-title {
        grid-column: 1 / span 3;
      }

      td.line-count {
        padding-block-start: 0.8em;
        padding-inline-start: 1em;
      }

      td.no-title::before {
        content: '';
        padding-inline-end: 0.25em;
      }

      th.bulk_edit_checkbox,
      td.bulk_edit_checkbox {
        grid-column: 1 / auto;
        padding: 0;
        width: 0; /* Initially no width */
      }

      .bulk_edit_checkbox input {
        display: none;
        margin: 0;
      }

      .bulk_editing .bulk_edit_checkbox {
        grid-column: 1 / auto;
        padding: 0;
        width: auto; /* Width when parent has .bulk_editing */
      }
      .bulk_editing .bulk_edit_checkbox input {
        display: initial;
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
      table thead th,
      table tr td {
        padding: 0.5333333333rem 0.6666666667rem 0.6666666667rem;
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
        .fieldsList {
          column-count: 2;
        }
        table {
          grid-template-columns:
            minmax(0px, 0fr)
            minmax(32px, 0.25fr)
            minmax(32px, 0.25fr)
            repeat(var(--number-of-columns, 6), minmax(50px, 1fr));
        }

        table.bulk_editing {
          grid-template-columns:
            minmax(32px, 0.25fr)
            minmax(32px, 0.25fr)
            minmax(32px, 0.25fr)
            repeat(var(--number-of-columns, 6), minmax(50px, 1fr));
        }

        thead {
          display: contents;
        }

        th {
          position: sticky;
          top: 0;
          background: var(
            --dt-list-header-background-color,
            var(--dt-tile-background-color, #fefefe)
          );
          text-align: start;
          justify-self: start;
          font-weight: normal;
          font-size: 1.1rem;
          color: var(--dt-list-header-color, #0a0a0a);
          white-space: pre-wrap;
          display: grid;
          place-items: center;
          grid-template-columns: 2fr 1fr;
        }

        th:last-child {
          border: 0;
        }
        td {
          display: flex;
          align-items: center;
          grid-column: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          padding-inline-start: 0;
          color: var(--text-color-mid);
          border-bottom: 1px solid var(--dt-list-border-color, #f1f1f1);
        }
        td::before {
          content: '';
          display: none;
        }

        td.no-title {
          grid-column: auto;
        }
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

 

      .btn.btn-primary .dt-button {
        margin: 0;
        border-radius: 5px;
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
      selectedValue: { type: Object },
      sectionBodyVisible: { type: Boolean, default: false }
    };
  }


  constructor() {
    super();
  }

  firstUpdated() {
    if (window.post_type_fields) {
      this.postTypeSettings = window.post_type_fields;
    }



  }

  handleRadioSelection(query) {
    //from here the query will be send to dt-list component to update the list values.

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

  openDialog(e, label) {
    e.preventDefault();
    const id = label.replace(/\s/g, '-').toLowerCase();

    //if we want to keep this inside st-list-help-box
    const dtListHelpBox = document.querySelector('dt-list-help-box');
    const modalll = dtListHelpBox.shadowRoot.querySelector(`#${id}`)
    modalll.shadowRoot.querySelector('dialog').showModal();
    document.querySelector('body').style.overflow = "hidden"

    //if we want to keep this inside dt-theme around dt-list-help-box

    // const modal= document.querySelector(`#${id}`);
    // console.log('open dialog', modal);

    // modal.shadowRoot.querySelector('dialog').showModal();
    // document.querySelector('body').style.overflow = "hidden"
  }

  render() {
    if (this.posts) {
      this.total = this.posts.length;
    }
    let filterTabs = [
      {
        "key": "default",
        "label": "Default Filters",
        "order": 7
      },
      {
        "key": "all_dispatch",
        "label": "Follow-Up Contacts",
        "count": 10,
        "order": 10
      },
      {
        "key": "custom",
        "label": "Custom Filters",
        "order": 99
      }

    ];
    let listItems = [

      {
        "ID": "my_subassigned",
        "visible": "1",
        "type": "default",
        "tab": "custom",
        "name": "Subassigned only",
        "query": {
          "subassigned": [
            "me"
          ],
          "sort": "overall_status"
        },
        "labels": [
          {
            "id": "me",
            "name": "Subassigned only",
            "field": "subassigned"
          }
        ]
      },
      {
        "ID": "favorite",
        "tab": "default",
        "name": "Favorite Contacts",
        "query": {
          "fields": {
            "favorite": [
              "1"
            ]
          },
          "sort": "name"
        },
        "labels": [
          {
            "id": "1",
            "name": "Favorite"
          }
        ]
      },
      {
        "ID": "personal",
        "tab": "default",
        "name": "Personal",
        "query": {
          "type": [
            "personal"
          ],
          "sort": "name",
          "overall_status": [
            "-closed"
          ]
        },
        "count": ""
      },
      {
        "ID": "my_coached",
        "visible": "1",
        "type": "default",
        "tab": "default",
        "name": "Coached by me",
        "count": "2",
        "query": {
          "coached_by": [
            "me"
          ],
          "overall_status": [
            "-closed"
          ],
          "sort": "seeker_path"
        },
        "labels": [
          {
            "id": "me",
            "name": "Coached by me",
            "field": "coached_by"
          }
        ]
      },
      {
        "ID": "my_all",
        "tab": "default",
        "name": "My Follow-Up",
        "query": {
          "assigned_to": [
            "me"
          ],
          "subassigned": [
            "me"
          ],
          "combine": [
            "subassigned"
          ],
          "overall_status": [
            "-closed"
          ],
          "type": [
            "access"
          ],
          "sort": "overall_status"
        },
        "labels": [
          {
            "name": "My Follow-Up",
            "field": "combine",
            "id": "subassigned"
          },
          {
            "name": "Assigned to me",
            "field": "assigned_to",
            "id": "me"
          },
          {
            "name": "Sub-assigned to me",
            "field": "subassigned",
            "id": "me"
          }
        ],
        "count": 10
      },
      {
        "ID": "my_new",
        "tab": "default",
        "name": "New Contact",
        "query": {
          "assigned_to": [
            "me"
          ],
          "subassigned": [
            "me"
          ],
          "combine": [
            "subassigned"
          ],
          "type": [
            "access"
          ],
          "overall_status": [
            "new"
          ],
          "sort": "seeker_path"
        },
        "labels": [
          {
            "name": "New Contact"
          },
          {
            "name": "Assigned to me",
            "field": "assigned_to",
            "id": "me"
          },
          {
            "name": "Sub-assigned to me",
            "field": "subassigned",
            "id": "me"
          }
        ],
        "count": 1,
        "subfilter": 1
      },
      {
        "ID": "my_active",
        "tab": "default",
        "name": "Active",
        "query": {
          "assigned_to": [
            "me"
          ],
          "subassigned": [
            "me"
          ],
          "combine": [
            "subassigned"
          ],
          "type": [
            "access"
          ],
          "overall_status": [
            "active"
          ],
          "sort": "seeker_path"
        },
        "labels": [
          {
            "name": "Active"
          },
          {
            "name": "Assigned to me",
            "field": "assigned_to",
            "id": "me"
          },
          {
            "name": "Sub-assigned to me",
            "field": "subassigned",
            "id": "me"
          }
        ],
        "count": 3,
        "subfilter": 1
      },
      {
        "ID": "my_update_needed",
        "tab": "default",
        "name": "Requires Update",
        "query": {
          "assigned_to": [
            "me"
          ],
          "subassigned": [
            "me"
          ],
          "combine": [
            "subassigned"
          ],
          "overall_status": [
            "active"
          ],
          "requires_update": [
            true
          ],
          "type": [
            "access"
          ],
          "sort": "seeker_path"
        },
        "labels": [
          {
            "name": "Requires Update"
          },
          {
            "name": "Assigned to me",
            "field": "assigned_to",
            "id": "me"
          },
          {
            "name": "Sub-assigned to me",
            "field": "subassigned",
            "id": "me"
          }
        ],
        "count": 3,
        "subfilter": 2
      },
      {
        "ID": "my_none",
        "tab": "default",
        "name": "Contact Attempt Needed",
        "query": {
          "assigned_to": [
            "me"
          ],
          "subassigned": [
            "me"
          ],
          "combine": [
            "subassigned"
          ],
          "overall_status": [
            "active"
          ],
          "seeker_path": [
            "none"
          ],
          "type": [
            "access"
          ],
          "sort": "name"
        },
        "labels": [
          {
            "name": "Contact Attempt Needed"
          },
          {
            "name": "Assigned to me",
            "field": "assigned_to",
            "id": "me"
          },
          {
            "name": "Sub-assigned to me",
            "field": "subassigned",
            "id": "me"
          }
        ],
        "count": 3,
        "subfilter": 2
      },
      {
        "ID": "all_new",
        "tab": "all_dispatch",
        "name": "New Contact",
        "query": {
          "overall_status": [
            "new"
          ],
          "type": [
            "access"
          ],
          "sort": "seeker_path"
        },
        "count": 1
      },
      {
        "ID": "all_active",
        "tab": "all_dispatch",
        "name": "Active",
        "query": {
          "overall_status": [
            "active"
          ],
          "type": [
            "access"
          ],
          "sort": "seeker_path"
        },
        "count": 3
      },
    ]

    if (window.list_settings) {
      filterTabs = window.list_settings.filters.tabs;
      listItems = window.list_settings.filters.filters;
    }
    const groupedItems = {};
    listItems.forEach(item => {
      if (!groupedItems[item.tab]) {
        groupedItems[item.tab] = [];
      }
      groupedItems[item.tab].push(item);
    });

    const upperArrowSVG = html`<svg fill="#3f729b" height="20px" width="20px" version="1.1" 
                         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 330 330" xml:space="preserve">
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

         ${filterTabs.map(tab => html`
                <li>
                    <a class="accordion-title" href="#" @click=${this.toggleList}>
                    ${tab.label}${tab.count ? ` (${tab.count})` : ''}
                    </a>
                    <div class="accordion-content">
                        ${groupedItems[tab.key] ? groupedItems[tab.key].map(item => html`
                            <div class="list-view ">
                                <input type="radio" name="selectedItem" @change=${() => this.handleRadioSelection(item.query)}>
                                <span class="list-view__text">${item.name} </span><span class='list-view__count'>${item.count}</span>
                            </div>
                        `) : ''}
                       
                    </div>
                </li>
            `)}

        </ul>
        `: ''}

        <div class="custom_filter">
        <a @click=${(e) => this.openDialog(e, 'create-custom-filter')} class="custom-filters-link">${circlePlusSVG} Create Custom Filter</a>
        </div>

        <div class="custom-filters">
        </div>

        </div>
       <dt-modal id="create-custom-filter" hidebutton>
        <span slot="content">
        Test
        </span>
        </dt-modal>
      </div>
    `;
  }
}

window.customElements.define('dt-list-help-box', DtListHelpBox);

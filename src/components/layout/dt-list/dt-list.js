import { html, css } from 'lit';
import { msg, str } from '@lit/localize';
import { map } from 'lit/directives/map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import DtBase from '../../dt-base.js';

export class DtList extends DtBase {
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
        font-size: 1.5rem;
        display: inline-block;
        text-transform: capitalize;
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

      .btn.btn-primary .dt-button {
        margin: 0;
        border-radius: 5px;
      }

      .resetBtn{
      
    -webkit-appearance: none;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    font-family: inherit;
    font-size: .9rem;
    line-height: 1;
    margin: 0 0 1rem;
    padding: .85em 1em;
    text-align: center;
    -webkit-transition: background-color .25s ease-out, color .25s ease-out;
    transition: background-color .25s ease-out, color .25s ease-out;
    vertical-align: middle;
    background-color: #3f729b;
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
      payload: {type: Object},
      favorite: {type: Boolean},
      initialLoadPost: { type: Boolean, default: false },
      loadMore: { type: Boolean, default: false },
      headerClick: { type: Boolean, default: false },
      sideFilters: { type: Boolean, default: false },
    };
  }


  constructor() {
    super();
    this.sortedBy = 'name';
    this.payload = {
      "sort": this.sortedBy,
      "overall_status": [
        "-closed"
      ],
      "fields_to_return": this.sortedColumns
    }
    this.initalLoadPost = false;
    if (!this.initalLoadPost) {
      this.posts = [];
      this.limit=100;
  }
}

  firstUpdated() {
    this.showArchived = false;
    this.postTypeSettings = window.post_type_fields;
    
    this.sortedColumns = this.columns.includes('favorite')
    
    ? ['favorite', ...this.columns.filter(col => col !== 'favorite')]
    : this.columns;
    
    this.style.setProperty('--number-of-columns', this.columns.length - 1);
    }

  async _getPosts(payload) {
    
    // -- * --- STARTS HERE  -- * ---
    /* "THIS CODE IS COMMENTED FOR NOW, WOULD BE UPDATED WHEN WORKED ON 'LOAD MORE' FUNCTIONALITY."
    this.loading = true;
    this.filteredOptions = [];
    const sort = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    const URLParams = encodeURI(
      `?offset=${offset}&sortBy=${sort}&offset=${offset}${this.columns
        .map(column => `&fields_to_return=${column}`)
        .join('')}`
    );
    const response = await this.api.makeRequestOnPosts(
      'GET',
      `${this.postType}${URLParams}`
    ) */
    // -- * --- ENDS HERE  -- * ---

    const event = await new CustomEvent('dt:get-data', {
      bubbles: true,
      detail: {
        field: this.name,
        postType: this.postType,
        query: payload,
        onSuccess: result => {
          if (this.initalLoadPost && this.loadMore) {
            this.posts = [...this.posts, ...result];

            this.postsLength=this.posts.length;
            this.total = result.length;
            this.loadMore=false;
          }
          if (!this.initalLoadPost) {
            this.posts = [...result];
            this.offset = this.posts.length;
            this.initalLoadPost = true;
            this.total = result.length;
          }
          if(this.sideFilters){
            this.posts = [...result];
            this.offset = this.posts.length;
            this.initalLoadPost = true;
            this.total = result.length;
          }
          if (this.headerClick){
            this.posts = result;

            this.offset = this.posts.length;
            this.headerClick=false;
          }
          this.total = result.length;
        },
        onError: error => {
          console.warn(error);
        },
      },
    });
    this.dispatchEvent(event);
  }

  _rowClick(permalink) {
    window.open(permalink, '_self');
  }

  _headerClick(e) {
    const column = e.target.dataset.id;
    const currentSort = this.sortedBy;
    if (currentSort === column) {
      // If already ascending, switch to descending
      if (column.startsWith('-')) {
        this.sortedBy = column.replace('-', '');
      } else {
        this.sortedBy = `-${column}`;
      }
    } else {
      // If sorting a new column, default to ascending
      this.sortedBy = column;
    }

    this.payload = {
      "sort": this.sortedBy,
       "overall_status": [
        "-closed"
      ],'limit':this.limit,
      "fields_to_return": this.columns
    }
    this.headerClick=true;
    this._getPosts(this.payload)
    // " THIS CODE IS COMMENTED FOR NOW, WOULD BE UPDATED WHEN WORKED ON 'LOAD MORE' FUNCTIONALITY "
    // this._getPosts(this.offset ? this.offset : 0, column).then(response => {
    //   this.posts = response;
    //   this.sortedBy = column;
    // });
  }


  _bulkEdit() {
    this.showBulkEditSelector = !this.showBulkEditSelector;
  }

  _fieldsEdit() {
    this.showFieldsSelector = !this.showFieldsSelector;
  }

  _toggleShowArchived() {
    this.showArchived = !this.showArchived;
    this.headerClick = true;
    if(this.showArchived){
      // eslint-disable-next-line camelcase
      const { overall_status,offset, ...filteredPayload } = this.payload;
      this.payload = filteredPayload; // Assign the new payload without overall_status
    }else{
      this.payload.overall_status = ["-closed"];
    }
    this._getPosts(this.payload);
  }

  _sortArrowsClass(column) {
    return this.sortedBy === column ? 'sortedBy' : '';
  }

  /* The above code appears to be a comment block in JavaScript. It includes a function name
  "_sortArrowsToggle" and a question asking what the code is doing. However, the function
  implementation or any other code logic is not provided within the comment block. */
  _sortArrowsToggle(column) {
    if (this.sortedBy !== `-${column}`) {
      return `-${column}`;
    }
    return column;
  }

  _headerTemplate() {
    if (this.postTypeSettings) {
      return html`
        <thead>
          <tr>
            <th id="bulk_edit_master" class="bulk_edit_checkbox">
              <input
                type="checkbox"
                name="bulk_send_app_id"
                value=""
                id="bulk_edit_master_checkbox"
              />
            </th>
            <th class="no-title line-count"></th>
            ${map(this.sortedColumns, column => {
              const isFavoriteColumn = column === 'favorite';
              return html`<th
                class="all"
                data-id="${this._sortArrowsToggle(column)}"
                @click=${this._headerClick}
              >
                  <span class="column-name"
                     >${isFavoriteColumn
                      ? null
                      : this.postTypeSettings[column].name}</span
                  >
                  ${!isFavoriteColumn
                    ? html`<span id="sort-arrows">
                        <span
                          class="sort-arrow-up ${this._sortArrowsClass(column)}"
                          data-id="${column}"
                        ></span>
                        <span
                          class="sort-arrow-down ${this._sortArrowsClass(
                            `-${column}`
                          )}"
                          data-id="-${column}"
                        ></span>
                      </span>`
                    : ''}
              </th>`;
            })}
          </tr>
        </thead>
      `;
    }
    return null;
  }

    _rowTemplate() {
      if (this.posts && Array.isArray(this.posts)) {
        const rows = this.posts.map((post, i) => {
          if (
            this.showArchived ||
            (!this.showArchived && post.overall_status !== 'closed')
          ) {
            return html`
              <tr class="dnd-moved" data-link="${post.permalink}" @click=${() => this._rowClick(post.permalink)}>
                <td class="bulk_edit_checkbox no-title">
                  <input type="checkbox" name="bulk_edit_id" .value="${post.ID}" />
                </td>
                <td class="no-title line-count">${i + 1}.</td>
                ${this._cellTemplate(post)}
              </tr>
            `;
          }
          return null;
        }).filter(row => row !== null);

        return rows.length > 0 ? rows : html`<p>No contacts available</p>`;
      }
      return null;
    }

  // eslint-disable-next-line class-methods-use-this
  formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  _cellTemplate(post) {
    return map(this.sortedColumns, column => {
      if (
        ['text', 'textarea', 'number'].includes(
          this.postTypeSettings[column].type
        )
      ) {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
          ${post[column]}
        </td>`;
      }
      if (this.postTypeSettings[column].type === 'date') {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
           ${ this.formatDate(post[column].formatted) ?  html`
          ${ifDefined(this.formatDate(post[column].formatted))}
        `:''}</td>`;
      }
      if (
        this.postTypeSettings[column].type === 'user_select' &&
        post[column] &&
        post[column].display
      ) {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
          ${ifDefined(post[column].display)}
        </td>`;
      }
      if (
        this.postTypeSettings[column].type === 'key_select' &&
        post[column] &&
        (post[column].label || post[column].name)
      ) {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
          ${post[column].label || post[column].name}
        </td>`;
      }
      if (
        this.postTypeSettings[column].type === 'multi_select' ||
        (this.postTypeSettings[column].type === 'tags' &&
          post[column] &&
          post[column].length > 0)
      ) {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
          <ul>
            ${map(
              post[column],
              value =>
                html`<li>
                  ${this.postTypeSettings[column].default[value].label}
                </li>`
            )}
          </ul>
        </td>`;
      }
      if (
        this.postTypeSettings[column].type === 'location' ||
        this.postTypeSettings[column].type === 'location_meta'
      ) {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
          ${ifDefined(post[column].label)}
        </td>`;
      }
      if (this.postTypeSettings[column].type === 'communication_channel') {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
          ${ifDefined(post[column])}
        </td>`;
      }
      if (this.postTypeSettings[column].type === 'connection') {
        return html` <td
          dir="auto"
          title="${this.postTypeSettings[column].name}"
        >
          <!-- TODO: look at this, it doesn't match the current theme. -->
          ${ifDefined(post[column].value)}
        </td>`;
      }
      if (this.postTypeSettings[column].type === 'boolean') {
        if (column === 'favorite') {

          return html`<td
            dir="auto"
            title="${this.postTypeSettings[column].name}"
            class=""
          >
            <dt-button
              id="favorite-button-${post.ID}"
              label="favorite"
              title="favorite"
              type="button"
              posttype="contacts"
              context="star"
              .favorited=${post.favorite ? post.favorite : false}
              .listButton=${true}
            >
              <svg
                class="${classMap({
                  'icon-star': true,
                  selected: post.favorite,
                })}"
                height="15"
                viewBox="0 0 32 32"
              >
                <path
                  d="M 31.916 12.092 C 31.706 11.417 31.131 10.937 30.451 10.873 L 21.215 9.996 L 17.564 1.077 C 17.295 0.423 16.681 0 16 0 C 15.318 0 14.706 0.423 14.435 1.079 L 10.784 9.996 L 1.546 10.873 C 0.868 10.937 0.295 11.417 0.084 12.092 C -0.126 12.769 0.068 13.51 0.581 13.978 L 7.563 20.367 L 5.503 29.83 C 5.354 30.524 5.613 31.245 6.165 31.662 C 6.462 31.886 6.811 32 7.161 32 C 7.463 32 7.764 31.915 8.032 31.747 L 16 26.778 L 23.963 31.747 C 24.546 32.113 25.281 32.08 25.834 31.662 C 26.386 31.243 26.645 30.524 26.494 29.83 L 24.436 20.367 L 31.417 13.978 C 31.931 13.51 32.127 12.769 31.916 12.092 Z M 31.916 12.092"
                />
              </svg>
            </dt-button>
          </td>`;
        }
        if (this.postTypeSettings[column] === true) {
          return html`<td
            dir="auto"
            title="${this.postTypeSettings[column].name}"
          >
            ['&check;']
          </td>`;
        }
      }
      return html`<td
        dir="auto"
        title="${this.postTypeSettings[column].name}"
      ></td>`;
    });
  }

  _fieldListIconTemplate(field) {
    if (this.postTypeSettings[field].icon) {
      return html`<img
        class="dt-icon"
        src="${this.postTypeSettings[field].icon}"
        alt="${this.postTypeSettings[field].name}"
      />`;
    }
    return null;
  }

  _fieldsListTemplate() {
    return repeat(
      Object.keys(this.postTypeSettings).sort((a, b) => {
        const nameA = this.postTypeSettings[a].name.toUpperCase(); // ignore upper and lowercase
        const nameB = this.postTypeSettings[b].name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      }),
      field => field,
      field => {
        if (!this.postTypeSettings[field].hidden) {
          return html`<li class="list-field-picker-item">
            <label>
              <input
                type="checkbox"
                id="${field}"
                name="${field}"
                .value="${field}"
                @change=${this._updateFields}
                ?checked=${this.columns.includes(field)}
              />
              ${this._fieldListIconTemplate(field)}
              ${this.postTypeSettings[field].name}</label>
          </li> `;
        }
        return null;
      }
    );
  }

  _fieldsSelectorTemplate() {
    if (this.showFieldsSelector) {
      return html`<div
        id="list_column_picker"
        class="list_field_picker list_action_section"
      >
        <div class="list_action_section_header">
          <p style="font-weight:bold">
            ${msg('Choose which fields to display as columns in the list')}
          </p>
          <button
            class="close-button list-action-close-button"
            data-close="list_column_picker"
            aria-label="Close modal"
            type="button"
            @click=${this._fieldsEdit}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ul class="fieldsList">
          ${this._fieldsListTemplate()}
        </ul>
        <button class="resetBtn" @click=${this.FieldResetToDefault}>Reset to default</button>
      </div>`;
    }
    return null;
  }


  FieldResetToDefault(){
    const defaultVaues = [
      "name",
      "favorite",
      "overall_status",
      "seeker_path",
      "milestones",
      "assigned_to",
      "groups",
      "last_modified",
    ];
    // Remove any fields from this.columns that are not in defaultValues
  this.columns = this.columns.filter(field => defaultVaues.includes(field));

  // Add any missing fields from defaultValues that are not in this.columns
  defaultVaues.forEach(field => {
    if (!this.columns.includes(field)) {
      this.columns.push(field);
    }
  });

  this.columns = [...this.columns];
  this.sortedColumns = [...this.columns];
    
    this.payload = {
      ...this.payload,
      "fields_to_return":this.columns
    }
    
    this.headerClick= true;
    this._getPosts(this.payload);
    this.style.setProperty('--number-of-columns', this.columns.length - 1);
    this.showFieldsSelector=!this.showFieldsSelector;
    this.requestUpdate();
  }

  async _updateFields(e) {
    const field = e.target.value;
    const viewableColumns = this.columns;

    if (!viewableColumns.includes(field)) {
      viewableColumns.push(field);
      
    } else {
      viewableColumns.filter(column => column !== field);
      viewableColumns.splice(viewableColumns.indexOf(field), 1);
    }

    this.columns = viewableColumns;
    this.sortedColumns=[...this.columns]
    this.payload={
      ...this.payload,
      "fields_to_return":this.columns
    };
    this.headerClick= true;
    this._getPosts(this.payload);
    this.style.setProperty('--number-of-columns', this.columns.length - 1);

    this.requestUpdate();
  }

  _bulkSelectorTemplate() {
    if (this.showBulkEditSelector) {
      return html`<div id="bulk_edit_picker" class="list_action_section">
        <div class="list_action_section_header">
          <p style="font-weight:bold">
            ${msg(
              str`Select all the ${this.postType} you want to update from the list, and update them below`
            )}
          </p>
          <button
            class="close-button list-action-close-button"
            aria-label="Close modal"
            type="button"
            @click=${this._bulkEdit}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ul class="fieldsList">
          This is where the bulk edit form will go.
        </ul>
      </div>`;
    }
    return null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleRadioSelection = this._handleRadioSelection.bind(this);  // Ensure binding
    document.addEventListener('query-updated', this._handleRadioSelection);
    this.payload = {
      sort: this.sortedBy,
      overall_status: ['-closed'],
      fields_to_return: this.columns,
    };
    if (this.posts.length===0) {
      this._getPosts(this.payload).then(posts => {
        this.posts = posts;
      });
    }
  }

  _handleLoadMore() {
    this.limit=500;
    this.payload = {
      "sort": this.sortedBy,
      "overall_status": [
        "-closed"
      ],
      "fields_to_return": this.columns,
      "offset": this.offset, "limit": this.limit
    }
    this.loadMore = true;
    this._getPosts(this.payload).then(posts => {
    });
  }

  _handleRadioSelection(event){
    //here will get the query inside event.detail and update the list accordingly
if(event.detail.splitBy){
  this.payload={...this.payload, ...event.detail.query};
  
}else{
  const { fields,dt_recent,type,coached_by,assigned_to,subassigned,combine,seeker_path,faith_status,requires_update,shared_with, ...restFields}= this.payload
  this.payload={...restFields,...event.detail.query};
}
this.sideFilters=true;
this._getPosts(this.payload).then(posts=>{
})
  }

  render() {
    const bulkEditClass = {
      bulk_editing: this.showBulkEditSelector,
      hidden: false,
    };
    if(this.posts){
      this.total = this.posts.length;
    }

    // prettier-ignore
    const bulkEditSvg = html`
      <svg viewBox="0 0 100 100" fill="#000000" style="enable-background:new 0 0 100 100;" xmlns="http://www.w3.org/2000/svg">
        <line style="stroke-linecap: round; paint-order: fill; fill: none; stroke-width: 15px;" x1="7.97" y1="50.199" x2="76.069" y2="50.128" transform="matrix(0.999999, 0.001017, -0.001017, 0.999999, 0.051038, -0.042708)"/>
        <line style="stroke-linecap: round; stroke-width: 15px;" x1="7.97" y1="17.751" x2="92.058" y2="17.751"/>
        <line style="stroke-linecap: round; stroke-width: 15px;" x1="7.97" y1="82.853" x2="42.343" y2="82.853"/>
        <polygon style="stroke-linecap: round; stroke-miterlimit: 1; stroke-linejoin: round; fill: rgb(255, 255, 255); paint-order: stroke; stroke-width: 9px;" points="22.982 64.982 33.592 53.186 50.916 70.608 82.902 21.308 95 30.85 52.256 95"/>
      </svg>
    `;
    // prettier-ignore
    const fieldsSvg = html`<svg height='100px' width='100px'  fill="#000000" xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><g i:extraneous="self"><g><path d="M94.4,63c0-5.7-3.6-10.5-8.6-12.5V7.3c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8v43.2c-5,1.9-8.6,6.8-8.6,12.5     s3.6,10.5,8.6,12.5v17.2c0,2.7,2.2,4.8,4.8,4.8c2.7,0,4.8-2.2,4.8-4.8V75.5C90.9,73.6,94.4,68.7,94.4,63z M81,66.7     c-2,0-3.7-1.7-3.7-3.7c0-2,1.7-3.7,3.7-3.7s3.7,1.7,3.7,3.7C84.7,65.1,83.1,66.7,81,66.7z"></path><path d="M54.8,24.5V7.3c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8v17.2c-5,1.9-8.6,6.8-8.6,12.5s3.6,10.5,8.6,12.5v43.2     c0,2.7,2.2,4.8,4.8,4.8c2.7,0,4.8-2.2,4.8-4.8V49.5c5-1.9,8.6-6.8,8.6-12.5S59.8,26.5,54.8,24.5z M50,40.7c-2,0-3.7-1.7-3.7-3.7     c0-2,1.7-3.7,3.7-3.7c2,0,3.7,1.7,3.7,3.7C53.7,39.1,52,40.7,50,40.7z"></path><path d="M23.8,50.5V7.3c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8v43.2c-5,1.9-8.6,6.8-8.6,12.5s3.6,10.5,8.6,12.5v17.2     c0,2.7,2.2,4.8,4.8,4.8c2.7,0,4.8-2.2,4.8-4.8V75.5c5-1.9,8.6-6.8,8.6-12.5S28.8,52.5,23.8,50.5z M19,66.7c-2,0-3.7-1.7-3.7-3.7     c0-2,1.7-3.7,3.7-3.7c2,0,3.7,1.7,3.7,3.7C22.7,65.1,21,66.7,19,66.7z"></path></g></g></g></svg>`;

    return html`
      <div class="section">
        <div class="header">
          <div class="section-header">
            <span
              class="section-header posts-header"
              style="display: inline-block"
              >${msg(
                str`${
                  this.postTypeLabel ? this.postTypeLabel : this.postType
                } List`
              )}</span
            >
          </div>
          <span class="filter-result-text"
            >${msg(str`Showing ${this.total} of ${this.total}`)}</span
          >

          <button
            class="bulkToggle toggleButton"
            id="bulk_edit_button"
            @click=${this._bulkEdit}
          >
            ${bulkEditSvg} ${msg('Bulk Edit')}
          </button>
          <button
            class="fieldsToggle toggleButton"
            id="fields_edit_button"
            @click=${this._fieldsEdit}
          >
            ${fieldsSvg} ${msg('Fields')}
          </button>

          <dt-toggle
            name="showArchived"
            label=${msg('Show Archived')}
            ?checked=${this.showArchived}
            hideIcons
            onchange=${this._toggleShowArchived}
            @click=${this._toggleShowArchived}
          ></dt-toggle>
        </div>

        ${this._fieldsSelectorTemplate()} ${this._bulkSelectorTemplate()}
        <table class="table-contacts ${classMap(bulkEditClass)}">
          ${this._headerTemplate()}
          ${this.posts ? this._rowTemplate() : msg('Loading')}
        </table>
          ${this.total >= 100 ?
          html`<div class="text-center"><dt-button buttonStyle=${JSON.stringify({"margin":"0"})} class="loadMoreButton btn btn-primary" @click=${this._handleLoadMore}>Load More</dt-button></div>`
          : ''}
      </div>
    `;
  }
}

window.customElements.define('dt-list', DtList);

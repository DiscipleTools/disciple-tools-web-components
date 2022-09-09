import { html, css, LitElement } from 'lit';
import { map } from 'lit/directives/map.js';
import {repeat} from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DtAPI } from '../../../services/dt-api.js';
import '../../icons/dt-star.js';

export class DtList extends LitElement {
  static get styles() {
    return css`
      :host {
        --number-of-columns: 7;
        font-family: var(--font-family);
        font-size: var(--dt-list-font-size, 15px);
        font-weight: var(--dt-list-font-weight, 300);
        line-height: var(--dt-list-line-height, 1.5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .section {
        container-type: inline-size;
        background-color: var(--dt-tile-background-color, #fefefe);
        border: 1px solid var(--dt-list-border-color, #f1f1f1);
        border-radius: 10px;
        box-shadow: var(--dt-tile-box-shadow, 0 2px 4px rgb(0 0 0 / 25%));
        padding: 1rem;
      }

      .header {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        gap: 1.5em;
        flex-wrap: wrap;
      }

      .section-header {
        color: var(--dt-tile-header-color, #3f729b);
        font-size: 1.5rem;
        display: inline-block;
        text-transform: capitalize;
      }

      .list_action_section {
        background-color: var(--dt-list-action-section-background-color, #ecf5fc);
        border-radius: 5px;
        margin: 30px 0;
        padding: 20px;
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
        color: #8a8a8a;
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
        height: 1rem;
        width: 1rem;
      }

      table {
        display: grid;
        border: 1px solid var(--dt-list-border-color, #f1f1f1);
        border-top: 0;
        border-collapse: collapse;
        min-width: 100%;
        grid-template-columns: minmax(32px, 0.1fr) minmax(32px, 0.1fr) minmax(50px, 0.8fr)
      }

      table td:last-child {
        border-bottom: 1px solid var(--dt-list-border-color, #f1f1f1);
        padding-bottom: 2rem;
      }

      thead,
      tbody,
      tr {
        display: contents;
      }

      tr {
        cursor: pointer;
      }

      tr:nth-child(2n+1) {
        background: #f1f1f1;
      }

      tr:hover {
        background-color: var(--dt-list-hover-background-color, #ecf5fc);
      }

      th {
        display: none
      }

      .column-name {
        pointer-events: none;
      }
      #sort-arrows {
        grid-template-columns: 4fr 1fr;
        display: flex;
        flex-direction: column;
        height: 1.5em;
        justify-content: space-evenly;
      }
      th.all span.sort-arrow-up {
        border-color: transparent transparent var(--dt-list-sort-arrow-color, #808080) transparent;
        border-style: solid;
        border-width: 0 .5em .5em .5em;
      }

      th.all span.sort-arrow-down {
        content: "";
        border-color: var(--dt-list-sort-arrow-color, #808080) transparent transparent;
        border-style: solid;
        border-width: .5em .5em 0;
      }

      th.all span.sort-arrow-up.sortedBy {
        border-color: transparent transparent var(--dt-list-sort-arrow-color-highlight, #999999) transparent;
      }

      th.all span.sort-arrow-down.sortedBy {
        border-color: var(--dt-list-sort-arrow-color-highlight, #999999) transparent transparent;
      }

      td {
        border: 0;
        grid-column:  1 / span 3;
        padding-inline-start: 1em;
      }

      td::before {
        content: attr(title)": ";
        padding-inline-end: 1em;
      }

      td.no-title {
        grid-column:  auto
      }

      td.line-count {
        padding-block-start: .8em;
      }

      td.bulk_edit_checkbox {
        grid-column: 1 / auto
      }

      td.no-title::before {
        content: "";
        padding-inline-end: .25em;
      }


      ul {
        margin: 0;
        padding: 0;
      }

      ul li {
        list-style-type: none;
      }

      input[type="checkbox"] {
        margin: 1rem;
      }
      @container (min-width: 650px) {
        .fieldsList {
          column-count: 2;
        }
        table {
          grid-template-columns:
          minmax(32px, .5fr)
          minmax(32px, .5fr)
          minmax(32px, .5fr)
          repeat(var(--number-of-columns, 7), minmax(50px, 1fr))

        }

        th {
          position: sticky;
          top: 0;
          background: var(--dt-list-header-background-color, var(--dt-tile-background-color, #fefefe));
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-top: .5rem;
          padding-bottom: .5rem;
          padding-inline-start: 0;
          color: var(--text-color-mid);
          border-bottom: 1px solid var(--dt-list-border-color, #f1f1f1);
          grid-column: auto;
        }
        td::before {
          content: "";
          display: none;
        }
      }
      @container (min-width: 950px) {
        .fieldsList {
          column-count: 3;
        }
      }
      @container (min-width: 1500px) {
        .fieldsList {
          column-count: 4;
        }
      }
    `;
  }

  static get properties() {
    return {
      postType: { type: String },
      postTypeSettings: { type: Object, attribute: true },
      posts: { type: Array },
      total: { type: Number },
      columns: { type: Array },
      sortedBy: { type: String },
      loading: { type: Boolean, default: true },
      offset: { type: Number },
      showArchived: { type: Boolean, default: false },
      showFieldsSelector: { type: Boolean, default: false },
      nonce: { type: String },
    };
  }

  constructor() {
    super();
    this.sortedBy = "name";
  }

  async _getPosts(offset = 0, sortBy = 'name', sortOrder = "desc") {
      this.loading = true;
      this.filteredOptions = [];
      let URLParams = encodeURI(`?offset=${offset}&sortBy=${sortBy ? sortBy : ''}&offset=${offset}${this.columns.map(column => `&fields_to_return=${column}`).join('')}`);
      const response = await DtAPI.makeRequestOnPosts('GET', `${this.postType}${URLParams}`, {}, '/', this.nonce );

    return response;

  }

  _headerClick(e) {
    const column = e.target.dataset.id;
    this._getPosts(this.offset ? this.offset : 0, column).then(response => {
      this.posts = response;
      this.sortedBy = column;
    })
  }

  _bulkEdit(e) {
    console.log('bulk edit');
  }

  _fieldsEdit() {
    this.showFieldsSelector = !this.showFieldsSelector;
  }

  _toggleShowArchived() {
    this.showArchived = !this.showArchived;
  }

  _sortArrowsClass(column) {
    return this.sortedBy === column ? "sortedBy" : "";
  }

  _sortArrowsToggle(column) {
    if (this.sortedBy !== `-${column}`) {
      return `-${column}`;
    }
    return column;
  }

  _headerTemplate() {
    const classes = {
      sortedBy: this.sortedBy,
    };
    return html`
      <thead>
        <tr>
          <th id="bulk_edit_master" class="bulk_edit_checkbox">
            <input type="checkbox" name="bulk_send_app_id" value="" id="bulk_edit_master_checkbox">
          </th>

          <th>
          </th>

          ${map(this.columns, (column) =>
            html`<th class="all" data-id="${this._sortArrowsToggle(column)}" @click=${this._headerClick}>
            <span class="column-name">${this.postTypeSettings[column].name}</span>
            <span id="sort-arrows">
              <span class="sort-arrow-up ${this._sortArrowsClass(`-${column}`)}" data-id="-${column}"></span>
              <span class="sort-arrow-down ${this._sortArrowsClass(column)}" data-id="${column}"></span>
            </span>
          </th>`)}
        </tr>
      </thead>
      `;
  }

  _rowTemplate() {
    return map(this.posts, (post, i) => {
      if (this.showArchived || !this.showArchived && post.overall_status.key !== 'closed') {
        return html`
        <tr class="dnd-moved" data-link="${this.posts.permalink}">
            <td class="bulk_edit_checkbox no-title"><input type="checkbox" name="bulk_edit_id" .value="${post.ID}"></td>
            <td class="no-title line-count">${i+1}.</td>

            ${this._cellTemplate(post) }
        </tr>
      `
      }
      return null
    });
  }

  _cellTemplate(post) {
    return map(this.columns, (column) => {
      if (['text', 'textarea', 'number'].includes(this.postTypeSettings[column].type)) {
      return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
            <a href="${post[column]}" title="test">${post[column]}</a>
        </td>`
      }
      if (this.postTypeSettings[column].type === 'date') {
        // TODO: format date
        return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
            ${post[column].formatted}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'user_select' && post[column] && post[column].display) {
          return html`
          <td dir="auto" title="${this.postTypeSettings[column].name}">
              ${ifDefined(post[column].display)}
          </td>`
      }
      if (this.postTypeSettings[column].type === 'key_select'  && post[column] && (post[column].label ||  post[column].name)) {
        return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
            ${ post[column].label || post[column].name }
        </td>`
      }
      if (this.postTypeSettings[column].type === 'multi_select' || this.postTypeSettings[column].type === 'tags' && post[column] && post[column].length > 0) {
        return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
          <ul>
            ${map(post[column], (value) => html`<li>${this.postTypeSettings[column].default[value].label}</li>`)}
          </ul>
        </td>`
      }
      if (this.postTypeSettings[column].type === 'location' || this.postTypeSettings[column].type === 'location_meta') {
        return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
            ${ifDefined(post[column].label)}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'communication_channel') {
        return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
            ${ifDefined(post[column].value)}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'connection') {
        return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
          <!-- TODO: look at this, it doesn't match the current theme. -->
            ${ifDefined(post[column].value)}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'boolean') {
        if (column === "favorite") {
          return html`<td dir="auto" title="${this.postTypeSettings[column].name}" class="">

          <dt-star postID=${post.ID} ?selected=${post.favorite}></dt-star>
        </td>`
        }
        if (this.postTypeSettings[column] === true) {
          return html`<td dir="auto" title="${this.postTypeSettings[column].name}">['&check;']</td>`
        }
      }
      return html`<td dir="auto" title="${this.postTypeSettings[column].name}"></td>`;
    });
  }

  _fieldListIconTemplate(field) {
    if (this.postTypeSettings[field].icon) {
      return html`<img class="dt-icon" src="${this.postTypeSettings[field].icon}" alt="${this.postTypeSettings[field].name}">`
    }
    return null;
  }

  _fieldsListTemplate() {
      return repeat(Object.keys(this.postTypeSettings).sort((a, b) => {
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
      })
      ,
      (field) => field,
      (field) => {
        if (!this.postTypeSettings[field].hidden) {
          return html`<li class="list-field-picker-item">
            <label>
              <input type="checkbox" id="${field}" name="${field}" .value="${field}" @change=${this._updateFields} ?checked=${this.columns.includes(field)} >
              ${this._fieldListIconTemplate(field)}
            ${this.postTypeSettings[field].name}</label>
          </li>
        `
        }
        return null
      }
    )
  }

  _fieldsSelectorTemplate() {
    if (this.showFieldsSelector ) {
      return html`<div id="list_column_picker" class="list_field_picker list_action_section">
          <div class="list_action_section_header">
            <p style="font-weight:bold">Choose which fields to display as columns in the list</p>
            <button class="close-button list-action-close-button" data-close="list_column_picker" aria-label="Close modal" type="button" @click=${this._fieldsEdit}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
           <ul class="fieldsList" style="">
              ${this._fieldsListTemplate()}
            </ul>`}
    return null;
  }

  _updateFields(e) {
    const field = e.target.value;
    let viewableColumns = this.columns;

    if (!viewableColumns.includes(field)) {
      viewableColumns.push(field);
    } else {
      viewableColumns.filter((column) => column !== field);
      viewableColumns.splice(viewableColumns.indexOf(field), 1);
    }

    this.columns = viewableColumns;
    this.style.setProperty('--number-of-columns', this.columns.length-1);

    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback()
    if (!this.posts) {
      this._getPosts().then(posts => {
        this.posts = posts
      }
      )
    }
  }

  render() {
    return html`
      <div class="section">
        <div class="header">
          <div class='section-header'>
            <span class="section-header posts-header" style="display: inline-block">${this.postType} List</span>
          </div>
            <span class="filter-result-text">Showing 1 of ${this.total}</span>

            <button class="bulkToggle" id="bulk_edit_button" @click=${this._bulkEdit}>Bulk Edit</button>
            <button class="fieldsToggle" id="fields_edit_button" @click=${this._fieldsEdit}>Fields</button>

            <dt-toggle
              name= "showArchived"
              label="Show Archived"
              ?checked=${this.showArchived}
              hideIcons
              onchange=${this._toggleShowArchived}
              @click=${this._toggleShowArchived}
            ></dt-toggle>
        </div>
        ${this._fieldsSelectorTemplate()}
        <table>
          ${this._headerTemplate()}
          ${this.posts? this._rowTemplate() : 'Loading'}
        </table>
      </div>
      `;
  }
}

window.customElements.define('dt-list', DtList);

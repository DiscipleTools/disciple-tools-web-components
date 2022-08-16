import { html, css, LitElement } from 'lit';
import { map } from 'lit/directives/map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../icons/dt-star.js';

export class DtList extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: var(--font-family);
        font-size: var(--dt-list-font-size, 15px);
        font-weight: var(--dt-list-font-weight, 300);
        line-height: var(--dt-list-line-height, 1.5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .section {
        background-color: var(--dt-tile-background-color, #fefefe);
        border: 1px solid var(--dt-list-border-color, #f1f1f1);
        border-radius: 10px;
        box-shadow: var(--dt-tile-box-shadow, 0 2px 4px rgb(0 0 0 / 25%));
        padding: 1rem;
      }

      .section-header {
        color: var(--dt-tile-header-color, #3f729b);
        font-size: 1.5rem;
        display: inline-block;
      }

      table {
        display: grid;
        border: 1px solid var(--dt-list-border-color, #f1f1f1);
        border-top: 0;
        border-collapse: collapse;
        min-width: 100%;
        grid-template-columns:
          minmax(32px, .5fr)
          minmax(32px, .5fr)
          minmax(32px, .5fr)
          minmax(50px, 1fr)
          minmax(50px, 1fr)
          minmax(50px, 1fr)
          minmax(50px, 1fr)
          minmax(50px, 1fr)
          minmax(50px, 1fr)
          minmax(50px, 1fr)
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
        align-items: center;
        justify-items: center;
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
        color: #808080;
        border-bottom: 1px solid var(--dt-list-border-color, #f1f1f1);
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
      @media (max-width: 636px) {

        table {
        grid-template-columns: minmax(32px, 0.1fr) minmax(32px, 0.1fr) minmax(50px, 0.8fr)
        }

        table td:last-child {
          border-bottom: 1px solid var(--dt-list-border-color, #f1f1f1);
          padding-bottom: 2rem;
        }

        th {
          display: none
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

        td.bulk_edit_checkbox {
          grid-column: 1 / auto
        }

        td.no-title::before {
          content: "";
          padding-inline-end: .25em;
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
      loading: { type: Boolean, default: true },
    };
  }

  _getPosts(offset = 0, sort = null) {
      this.loading = true;
      this.filteredOptions = [];

      // need to fetch data via API request
      const self = this;
      const event = new CustomEvent('load', {
        detail: {
          offset,
          sort,
          onSuccess: result => {
            self.loading = false;
            self.posts = result.posts;
          },
          onError: error => {
            console.warn(error);
            self.loading = false;
          },
        },
      });
      this.dispatchEvent(event);
      return this.posts;
  }

  _headerClick(e) {
    const column = e.target.dataset.id;
    console.log(column);
  }

  _headerTemplate() {
    return html`
      <thead>
        <tr>
          <th id="bulk_edit_master" class="bulk_edit_checkbox">
            <input type="checkbox" name="bulk_send_app_id" value="" id="bulk_edit_master_checkbox">
          </th>

          <th>
          </th>

          ${map(this.columns, (column) =>
            html`<th class="all" data-id="${column}" @click=${this._headerClick}>${this.postTypeSettings[column].name}</th>`)}
        </tr>
      </thead>
      `;
  }

  _rowTemplate() {
    return map(this.posts, (post) => html`
      <tr class="dnd-moved" data-link="${this.posts.permalink}">
          <td class="bulk_edit_checkbox no-title"><input type="checkbox" name="bulk_edit_id" .value="${post.ID}"></td>
          <td class="no-title">1.</td>

          ${this._cellTemplate(post) }
      </tr>
    `);
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
      if (this.postTypeSettings[column].type === 'key_select'  && post[column] && post[column].label) {
        return html`
        <td dir="auto" title="${this.postTypeSettings[column].name}">
            ${ifDefined(post[column].label)}
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
          return html`<td dir="auto" title="★" class="no-title">
          <dt-star postID=${post.ID}></dt-star>
        </td>`
        }
        if (this.postTypeSettings[column] === true) {
          return html`<td dir="auto" title="${this.postTypeSettings[column].name}">['&check;']</td>`
        }
      }
      return html`<td dir="auto" title="${this.postTypeSettings[column].name}"></td>`;
    });
  }

  render() {
    return html`
      <div class="section">
        <div>
          <div class='section-header'>
            <span class="section-header posts-header" style="display: inline-block">${this.postType} List</span>
          </div>
            <span class="filter-result-text">Showing 1 of ${this.total}</span>
        </div>
        <table>
          ${this._headerTemplate()}
          ${this._rowTemplate()}
        </table>
      </div>
      `;
  }
}

window.customElements.define('dt-list', DtList);

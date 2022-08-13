import { html, css, LitElement } from 'lit';
import { map } from 'lit/directives/map.js';
import { ifDefined } from 'lit/directives/if-defined.js';




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
        border: 1px solid var(--dt-tile-border-color, #cecece);
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
        border-collapse: collapse;
        border-radius: 0;
        margin-bottom: 1rem;
        word-wrap: break-word;
        table-layout: fixed;
        width: 100%;
      }
      tr {
        cursor: pointer;
      }
      tr:hover {
        background-color: var(--dt-list-hover-background-color, #ecf5fc);

      td, th, td {
        padding: .5333333333rem .6666666667rem .6666666667rem;
      }

      tr ul {
        margin: 0;
        padding: 0;
      }
      tr ul li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      thead th {
        font-weight: 700;
        text-align: start;
        cursor: pointer;
      }

      th, td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    };
  }

  _headerTemplate() {
    return html`
      <thead>
        <tr>
          <th id="bulk_edit_master" class="bulk_edit_checkbox" style="width:32px; background-image:none; cursor:default" draggable="true">
            <input type="checkbox" name="bulk_send_app_id" value="" id="bulk_edit_master_checkbox">
          </th>

          <th style="width:32px; background-image:none; cursor:default" draggable="true">
          </th>

          ${map(this.columns, (column) =>
            html`<th class="all" data-id="${column}">${this.postTypeSettings[column].name}</th>`)}
        </tr>
      </thead>
      `;
  }

  _rowTemplate() {
    return map(this.posts, (post) => html`
    <tr class="dnd-moved" data-link="${this.posts.permalink}">
          <td class="bulk_edit_checkbox"><input type="checkbox" name="bulk_edit_id" value="${post.ID}"></td>
          <td style="white-space: nowrap">1.</td>

          <td dir="auto" title="★">
            <ul>
              <li><svg class="icon-star" viewBox="0 0 32 32" data-id="${post.ID}"><use xlink:href="https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/star.svg#star"></use></svg></li>
            </ul>
          </td>
            ${this._cellTemplate(post) }
            </tr>
          `);
  }

  _cellTemplate(post) {
    return map(this.columns, (column) => {
      if (['text', 'textarea', 'number'].includes(this.postTypeSettings[column].type)) {
      return html`
        <td dir="auto" title="">
            <a href="${post[column]}" title="test">${post[column]}</a>
        </td>`
      }
      if (this.postTypeSettings[column].type === 'date') {
        // TODO: format date
        return html`
        <td dir="auto" title="">
            ${post[column].formatted}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'user_select' && post[column] && post[column].display) {
          return html`
          <td dir="auto" title="">
              ${ifDefined(post[column].display)}
          </td>`
      }
      if (this.postTypeSettings[column].type === 'key_select'  && post[column] && post[column].label) {
        return html`
        <td dir="auto" title="">
            ${ifDefined(post[column].label)}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'multi_select' || this.postTypeSettings[column].type === 'tags' && post[column] && post[column].length > 0) {
        return html`
        <td dir="auto" title="">
          <ul>
            ${map(post[column], (value) => html`<li>${this.postTypeSettings[column].default[value].label}</li>`)}
          </ul>
        </td>`
      }
      if (this.postTypeSettings[column].type === 'location' || this.postTypeSettings[column].type === 'location_meta') {
        return html`
        <td dir="auto" title="">
            ${ifDefined(post[column].label)}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'communication_channel') {
        return html`
        <td dir="auto" title="">
            ${ifDefined(post[column].value)}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'connection') {
        return html`
        <td dir="auto" title="">
          <!-- TODO: look at this, it doesn't match the current theme. -->
            ${ifDefined(post[column].value)}
        </td>`
      }
      if (this.postTypeSettings[column].type === 'boolean') {
        if (this.postTypeSettings[column] === "favorite") {
          return html`<td><svg class='icon-star${post[column] === true ? ' selected' : ''}' viewBox="0 0 32 32" data-id=${post.ID}><use xlink:href="${window.wpApiShare.template_dir}/dt-assets/images/star.svg#star"></use></svg></td>`
        }
        if (this.postTypeSettings[column] === true) {
          return html`<td dir="auto" title="">['&check;']</td>`
        }
      }
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
        <div>
          <table>
            ${this._headerTemplate()}
            ${this._rowTemplate()}
          </table>
        </div>
      </div>
      `;
  }
}

window.customElements.define('dt-list', DtList);

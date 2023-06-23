import { DtMultiSelect } from '@disciple.tools/web-components';
import $ from 'min-jquery';
//import { $ } from 'min-jquery';

export class DtMultiSelectTypeahead extends DtMultiSelect {

  constructor() {
    super();
  }

  static get properties() {
    return {
      ...super.properties
    };
  }

  firstUpdated() {
    this.addEventListener('keyup', this._handleKeyUp);
  }

  _handleKeyUp(e) {

    // Only trigger after a few characters.
    if (this.query && this.query.length > 3) {
      console.log(this.query);
      this.options = [{
        'id': this.query,
        'label': this.query
      }];
      super._select(this.query);

      // Query specified endpoint.
      /*fetch('http://dtdev.local/wp-json/dt-posts/v2/contacts/settings',{
          method: 'GET',
          //crossDomain: true,
          //credentials: 'include',
          //withCredentials: true,
          headers: {
            'Authorization': 'Bearer 7fc4dc4c792177826776cfdcd0f9b65d205f588891dbfd6696aa13c0d733a7bb',
            'Content-Type': 'application/json'
          }//,
          //referrerPolicy: 'strict-origin-when-cross-origin'
        }).then(response => {
          console.log(response.json());
        });*/

      //const $ = require('min-jquery');

      $.ajax({
        url: 'http://dtdev.local/wp-json/dt-posts/v2/contacts/settings',
        type: 'GET',
        data: JSON.stringify({}),
        dataType: 'json',
        beforeSend: (xhr) => {
          xhr.setRequestHeader('Authorization', 'Bearer 7fc4dc4c792177826776cfdcd0f9b65d205f588891dbfd6696aa13c0d733a7bb');
        }
      }).then(response => {
        console.log(response);
      });

    }
  }

}

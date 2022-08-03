import { html } from 'lit';
import { argTypes, themeCss } from '../stories-theme.js';
import './form/dt-label/dt-label.js';
import './form/dt-text/dt-text.js';
import './form/dt-textarea/dt-textarea.js';
import './form/dt-number/dt-number.js';
import './form/dt-date/dt-date.js';
import './form/dt-multi-select/dt-multi-select.js';
import './form/dt-single-select/dt-single-select.js';
import './form/dt-tags/dt-tags.js';

export default {
  title: 'Kitchen Sink',
  argTypes,
};

const options = [{
  id: 'opt1', label: 'Option 1',
}, {
  id: 'opt2', label: 'Option 2',
}, {
  id: 'opt3', label: 'Option 3',
}, {
  id: 'opt4', label: 'Option 4',
}, {
  id: 'opt5', label: 'Option 5',
}];
const tags = [{
  id: 'personal', label: 'Personal',
}, {
  id: 'web', label: 'Web',
}, {
  id: 'facebook', label: 'Facebook',
}]
function Template(args) {
  return html`
    <style>
      ${themeCss(args)}
    </style>

    <dt-text id='textField' name='textField' value='' label="Text Field"></dt-text>

    <dt-textarea id='textareaField' name='textareaField' value='' label="Textarea Field"></dt-textarea>

    <dt-number id="numberField" name="numberField" label="Number Field"></dt-number>

    <dt-date id="dateField" name="dateField" label="Date Field"></dt-date>

    <dt-label>Single Select Field</dt-label>
    <dt-single-select placeholder="Select Item"
      value="opt1"
      options="${JSON.stringify(options)}"
    ></dt-single-select>

    <dt-label>Multi Select Field</dt-label>
    <dt-multi-select placeholder="Select Items"
      value="${JSON.stringify(options.slice(0, 2).map(o => o.id))}"
      options="${JSON.stringify(options)}"
    ></dt-multi-select>

    <dt-label>Tags Field</dt-label>
    <dt-tags
      value="${JSON.stringify([{id:'personal',label:'Personal'}])}"
      options="${JSON.stringify(tags)}"
    ></dt-tags>

    <pre><code>
    ${themeCss(args)}
    </code></pre>
  `;
}

export const KitchenSink = Template.bind({});

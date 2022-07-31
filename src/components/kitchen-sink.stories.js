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

    <dt-label>Text Field</dt-label>
    <dt-text id='textField' name='textField' value=''></dt-text>

    <dt-label>Textarea Field</dt-label>
    <dt-textarea id='textareaField' name='textareaField' value=''></dt-textarea>

    <dt-label>Number Field</dt-label>
    <dt-number></dt-number>

    <dt-label>Date Field</dt-label>
    <dt-date></dt-date>

    <dt-label>Single Select Field</dt-label>
    <dt-single-select placeholder="Select Item"></dt-single-select>

    <dt-label>Multi Select Field</dt-label>
    <dt-multi-select placeholder="Select Items" options="${JSON.stringify(tags)}"></dt-multi-select>

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

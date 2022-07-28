import { html } from 'lit';
import { argTypes, themeCss } from '../stories-theme.js';
import './dt-label/dt-label.js';
import './dt-multi-select/dt-multi-select.js';
import './dt-single-select/dt-single-select.js';
import './dt-tags/dt-tags.js';

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

    <dt-label>Single Select Field</dt-label>
    <dt-single-select placeholderLabel="Select Item"></dt-single-select>

    <dt-label>Multi Select Field</dt-label>
    <dt-multi-select placeholderLabel="Select Items" options="${JSON.stringify(tags)}"></dt-multi-select>
    
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

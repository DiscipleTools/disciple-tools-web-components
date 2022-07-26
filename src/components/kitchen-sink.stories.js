import { html } from 'lit';
import { argTypes, themeCss } from '../stories-theme.js';
import './dt-multi-select/dt-multi-select.js';
import './dt-single-select/dt-single-select.js';

export default {
  title: 'Kitchen Sink',
  component: 'dt-single-select',
  argTypes,
};

function Template(args) {
  return html`
    <style>
      ${themeCss(args)}
    </style>

    <dt-single-select placeholderLabel="Select Item"></dt-single-select>

    <dt-multi-select placeholderLabel="Select Items"></dt-multi-select>

    <pre><code>
    ${themeCss(args)}
    </code></pre>
  `;
}

export const KitchenSink = Template.bind({});

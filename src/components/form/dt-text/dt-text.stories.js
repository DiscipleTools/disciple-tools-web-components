import { html } from 'lit';
import { themeCss } from '../../../stories-theme.js';
import './dt-text.js';

export default {
  title: 'dt-text',
  component: 'dt-text',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    isPrivate: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    onchange: { control: 'text' },
  },
};

function Template(args) {
  const {
    id = 'name',
    name = 'field-name',
    label = 'Field Name',
    value = '',
    disabled = false,
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    onchange,
    slot,
  } = args;
  return html`
    <style>
    ${themeCss(args)}
    </style>
    <dt-text
      id=${id}
      name=${name}
      label=${label}
      value=${value}
      ?disabled=${disabled}
      icon="${icon}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?loading=${loading}
      ?saved=${saved}
      onchange=${onchange}
    >
    ${slot}
    </dt-text>
  `;
}

export const Empty = Template.bind({});

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  slot: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
};

export const EnteredValue = Template.bind({});
EnteredValue.args = {
  value: 'Lorem Ipsum',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'Lorem Ipsum',
};

export const privateField = Template.bind({});
privateField.args = {
  isPrivate: true,
  value: 'Lorem Ipsum',
  privateLabel: 'This is a custom tooltip',
};

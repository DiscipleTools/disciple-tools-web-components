import { html } from 'lit-html';
import { themes, themeCss, argTypes, contexts } from '../../../stories-theme.js';
import './dt-modal.js';

export default {
  title: 'dt-modal',
  component: 'dt-modal',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default'
    },
    context: {
      control: 'select',
      options: ['none', ...contexts],
      defaultValue: 'default'
    },
    ...argTypes,
  }
};

const Template = (args) => html`
  <style>
    ${themeCss(args)}
  </style>
  <dt-modal
    title="${args.title}"
    context="${args.context}"
    ?ishelp="${args.isHelp}"
    ?isopen="${args.isOpen}"
  >
    <span slot="content">This is the content of the modal</span>
    <span slot="close-button">Cancel</span>
  </dt-modal>
`;

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  context: 'default',
};


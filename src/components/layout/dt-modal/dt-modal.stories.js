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
    isHelp: {
      control: 'boolean',
      defaultValue: false
    },

    ...argTypes,
  }
};

const Template = (args) => html`
  <style>
    ${themeCss(args)}
    ul {
        margin-left: 1.25rem;
        padding: 0;
        line-height: 1.6;
        list-style-type: disc;
        list-style-position: outside;
        margin-bottom: 1rem;
      }
      li {
        font-size: inherit;
      }
      a {
        color: #3f729b;
        cursor: pointer;
        line-height: inherit;
        text-decoration: none;
      }
  </style>
  <dt-modal
    title="${args.title}"
    context="${args.context}"
    ?isHelp="${!args.isHelp}"
    ?isopen="${args.isOpen}"
  >
    <span slot="content">
      <h2>Mauris Cursus<span style="font-size: 10px; padding-inline-start: 1em"></span></h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <ul>
        <li><strong>feugiat vivamus at</strong></li>
        <li><strong>quis enim lobortis</strong></li>
        <li><strong>tincidunt arcu</strong></li>
        <li><strong>rhoncus mattis</strong></li>
      </ul>
    </span>
  </dt-modal>
`;

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  context: 'default',
  isHelp: false,
};

export const HelpModal = Template.bind({});
Default.args = {
  title: 'Help Modal Title',
  context: 'default',
  isHelp: true,
};

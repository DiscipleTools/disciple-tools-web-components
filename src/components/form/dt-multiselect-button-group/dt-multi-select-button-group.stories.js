import { html } from 'lit-html';
import { FormDecorator, LocaleDecorator } from '../../../stories-utils.js';
import {
  themes,
  themeCss,
  argTypes,
  buttonContexts,
} from '../../../stories-theme.js';
import './dt-multiselect-button-group.js';

export default {
  title: 'Form/dt-multi-select-button-group',
  component: 'dt-multiselect-button-group',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    context: {
      control: 'select',
      options: ['primary', ...buttonContexts],
      defaultValue: 'primary',
    },
    ...argTypes,
  },
};

const Template = args => {
  const { slot = '' } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-multiselect-buttons-group
      .context="${args.context}"
      type="${args.type}"
      ?outline="${args.outline}"
      ?rounded="${args.rounded}"
      .href="${args.href}"
      title="${args.title}"
      confirm="${args.confirm}"
    >
      ${slot}
    </dt-multiselect-buttons-group>
  `;
};

export const BasicGroup = Template.bind({});
BasicGroup.decorators = [LocaleDecorator, FormDecorator];

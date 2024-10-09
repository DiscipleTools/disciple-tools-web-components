import { html } from 'lit';
import {
  themes,
  themeCss,
  argTypes,
  buttonContexts,
} from '../../../stories-theme.js';

import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-button.js';

export default {
  title: 'Form/dt-button',
  component: 'dt-button',
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
  const { slot = 'Button' } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-button
      .context="${args.context}"
      type="${args.type}"
      buttonStyle="${args.buttonStyle}"
      ?outline="${args.outline}"
      ?rounded="${args.rounded}"
      .href="${args.href}"
      title="${args.title}"
      confirm="${args.confirm}"
    >
      ${slot}
    </dt-button>
  `;
};
export const Default = Template.bind({});
Default.args = {
  context: 'primary',
};

export const Link = Template.bind({});
Link.args = {
  context: 'link',
};

export const Alert = Template.bind({});
Alert.args = {
  context: 'alert',
};

export const Caution = Template.bind({});
Caution.args = {
  context: 'caution',
};
export const Success = Template.bind({});
Success.args = {
  context: 'success',
};
export const Inactive = Template.bind({});
Inactive.args = {
  context: 'inactive',
};
export const Disabled = Template.bind({});
Disabled.args = {
  context: 'disabled',
};
export const OutlineDefault = Template.bind({});
OutlineDefault.args = {
  outline: true,
  context: 'primary',
};

export const OutlineLink = Template.bind({});
OutlineLink.args = {
  outline: true,
  context: 'link',
};

export const OutlineAlert = Template.bind({});
OutlineAlert.args = {
  outline: true,
  context: 'alert',
};

export const OutlineCaution = Template.bind({});
OutlineCaution.args = {
  outline: true,
  context: 'caution',
};
export const OutlineSuccess = Template.bind({});
OutlineSuccess.args = {
  outline: true,
  context: 'success',
};
export const OutlineInactive = Template.bind({});
OutlineInactive.args = {
  outline: true,
  context: 'inactive',
};
export const OutlineDisabled = Template.bind({});
OutlineDisabled.args = {
  outline: true,
  context: 'disabled',
};

export const RoundedDefault = Template.bind({});
RoundedDefault.args = {
  rounded: true,
};

export const WithConfrimationMessage = Template.bind({});
WithConfrimationMessage.args = {
  context: 'alert',
  confirm: 'Are you sure you want to do this?',
};

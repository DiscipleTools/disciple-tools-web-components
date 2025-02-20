import { html } from 'lit';
import {
  themes,
  themeCss,
  argTypes,
  contexts,
} from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-alert.js';

export default {
  title: 'Components/Layout/Alert',
  component: 'dt-alert',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    context: {
      control: 'select',
      options: ['none', ...contexts],
      defaultValue: 'default',
    },
    ...argTypes,
  },
};

const Template = args => {
  const { slot = 'Your message was sent successfully.' } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-alert
      context="${args.context}"
      ?dismissable="${args.dismissable}"
      ?hide="${args.hide}"
      timeout="${args.timeout}"
      ?outline="${args.outline}"
    >
      ${slot}
    </dt-alert>
  `;
};
export const Dismissable = Template.bind({});
Dismissable.args = {
  hide: false,
  dismissable: true,
  timeout: 0,
};

export const NonDismissable = Template.bind({});
NonDismissable.args = {
  hide: false,
  dismissable: false,
  timeout: 0,
};

export const Timeout = Template.bind({});
Timeout.args = {
  hide: false,
  dismissable: false,
  timeout: 5000,
};

export const Primary = Template.bind({});
Primary.args = {
  hide: false,
  dismissable: true,
  timeout: 0,
  context: 'primary',
};

export const Success = Template.bind({});
Success.args = {
  hide: false,
  dismissable: true,
  timeout: 0,
  context: 'success',
};

export const Alert = Template.bind({});
Alert.args = {
  hide: false,
  dismissable: true,
  timeout: 0,
  context: 'alert',
};

export const Caution = Template.bind({});
Caution.args = {
  hide: false,
  dismissable: true,
  timeout: 0,
  context: 'caution',
};

export const Outline = Template.bind({});
Outline.args = {
  hide: false,
  dismissable: true,
  timeout: 0,
  context: 'primary',
  outline: true,
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];

LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  slot: 'لقد تم ارسال رسالتك بنجاح.',
  hide: false,
  dismissable: true,
  timeout: 0,
};

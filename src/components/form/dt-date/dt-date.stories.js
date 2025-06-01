import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { themes, argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-date.js';

export default {
  title: 'Components/Form/Date',
  component: 'dt-date',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'number' },
    date: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    private: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
};

function Template(args) {
  const {
    id = 'name',
    name = 'field-name',
    label = 'Date Field',
    value = '',
    timestamp = 0,
    disabled,
    required = false,
    requiredMessage,
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    loading,
    saved,
    error,
    slot,
    onChange,
  } = args;
  return html`
    <dt-date
      id=${id}
      name=${name}
      label=${label}
      value=${value}
      timestamp=${timestamp}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${requiredMessage}
      icon=${icon}
      ?private=${args.private}
      ?loading=${loading}
      ?saved=${saved}
      error="${ifDefined(error)}"
      @change=${onChange}
    >
      ${slot}
    </dt-date>
  `;
}

export const Empty = Template.bind({});

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  // prettier-ignore
  slot: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
};

export const EnteredPHPTimestamp = Template.bind({});
EnteredPHPTimestamp.args = {
  timestamp: 1468281600,
};

export const EnteredDateString = Template.bind({});
EnteredDateString.args = {
  value: '2020-01-01',
};

export const EnteredJSTimestamp = Template.bind({});
EnteredJSTimestamp.args = {
  timestamp: 1658361600000,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: '2020-01-01',
  disabled: true,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  onChange: onAutoSave,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  saved: true,
};
export const Error = Template.bind({});
Error.args = {
  error: 'Custom error message',
};

export const BasicForm = Template.bind({});
BasicForm.decorators = [FormDecorator];
BasicForm.args = {
  value: '2020-01-01',
};

export const Required = Template.bind({});
Required.decorators = [FormDecorator];
Required.args = {
  required: true,
}

export const RequiredCustomMessage = Template.bind({});
RequiredCustomMessage.args = {
  required: true,
  requiredMessage: 'Custom error message',
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
};

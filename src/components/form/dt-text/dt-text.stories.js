import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-text.js';

export default {
  title: 'Components/Form/Text',
  component: 'dt-text',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      defaultValue: 'text',
    },
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
    label = 'Field Name',
    value = '',
    disabled = false,
    required = false,
    requiredMessage = '',
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
    privateLabel,
    loading = false,
    saved = false,
    error,
    slot,
    type,
    onChange,
  } = args;
  return html`
    <dt-text
      id=${id}
      name=${name}
      label=${label}
      value=${value}
      type=${type}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${requiredMessage}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${args.private}
      privateLabel="${privateLabel}"
      ?loading=${loading}
      ?saved=${saved}
      error="${error}"
      @change=${onChange}
    >
      ${slot}
    </dt-text>
  `;
}

export const Empty = Template.bind({});

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  // prettier-ignore
  slot: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
};

export const EnteredValue = Template.bind({});
EnteredValue.args = {
  value: 'Lorem Ipsum',
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  onChange: onAutoSave,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'Lorem Ipsum',
};

export const privateField = Template.bind({});
privateField.args = {
  private: true,
  value: 'Lorem Ipsum',
  privateLabel: 'This is a custom tooltip',
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
  value: 'Lorem Ipsum',
};

export const required = Template.bind({});
required.args = {
  required: true,
};

export const password = Template.bind({});
password.args = {
  type: 'password',
};

export const requiredCustomMessage = Template.bind({});
requiredCustomMessage.args = {
  required: true,
  requiredMessage: 'Custom error message',
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
  value: 'راد أن يشع',
};

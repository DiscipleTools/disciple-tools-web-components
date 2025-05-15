import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-multi-text.js';

export default {
  title: 'Components/Form/Text - Multi',
  component: 'dt-multi-text',
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    value: {
      control: 'text',
      type: { name: 'array' }
    },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      defaultValue: 'text',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  }
};

function Template(args) {
  const {
    name = 'field-name',
    label = 'Field Name',
    value = '',
    placeholder,
    disabled = false,
    required = false,
    requiredMessage,
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    error,
    onChange,
    slot,
    type,
  } = args;
  return html`
    <dt-multi-text
      name=${name}
      label=${label}
      .value=${value}
      placeholder=${placeholder}
      type=${type}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${requiredMessage}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?loading=${loading}
      ?saved=${saved}
      error="${error}"
      @change=${onChange}
    >
      ${slot}
    </dt-multi-text>
  `;
}

export const Empty = Template.bind({});

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  slot: 'SvgIcon',
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: 'Enter a value',
};

export const EnteredValue = Template.bind({});
EnteredValue.args = {
  value: [
    {
        "verified": false,
        "value": "test1",
        "key": "comm_channel_1"
    },
    {
        "verified": false,
        "value": "test2",
        "key": "comm_channel_2"
    }
]
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  onChange: onAutoSave,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: [{
    value: 'Lorem Ipsum',
    key: 'comm_channel_1',
  }],
};

export const privateField = Template.bind({});
privateField.args = {
  isPrivate: true,
  value: [{
    value: 'Lorem Ipsum',
    key: 'comm_channel_1',
  }],
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
  value: [{
    value: 'Lorem Ipsum',
    key: 'comm_channel_1',
  }],
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
LocalizeRTL.decorators = [LocaleDecorator, FormDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
  value: [{
    value: 'راد أن يشع',
    key: 'comm_channel_1',
  }],
};

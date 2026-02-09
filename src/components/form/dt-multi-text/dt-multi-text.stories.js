import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-multi-text.js';

export default {
  title: 'Components/Form/Text - Multi',
  component: 'dt-multi-text',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'object' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    requiredMessage: { control: 'text' },
    icon: { control: 'text' },
    iconAltText: { control: 'text' },
    private: { control: 'boolean' },
    privateLabel: { control: 'text' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    error: { control: 'text' },
    slot: { control: 'text' },
    onChange: { action: 'on-change' },
    ...argTypes,
  },
  args: {
    id: 'name',
    name: 'field-name',
    label: 'Field Name',
    value: [],
    placeholder: '',
    type: 'text',
    disabled: false,
    required: false,
    requiredMessage: 'This field is required',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText: 'Icon Alt Text',
    private: false,
    privateLabel: 'Private',
    loading: false,
    saved: false,
    error: '',
    slot: '',
    onChange: action('on-change'),
  },
  render: args => {
    const {
      id,
      name,
      label,
      value,
      placeholder,
      type,
      disabled,
      required,
      requiredMessage,
      icon,
      iconAltText,
      private: isPrivate,
      privateLabel,
      loading,
      saved,
      error,
      onChange,
      slot,
    } = args;
    return html`
      <dt-multi-text
        id="${ifDefined(id)}"
        name="${ifDefined(name)}"
        label="${ifDefined(label)}"
        .value="${value}"
        placeholder="${ifDefined(placeholder)}"
        type="${ifDefined(type)}"
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage="${ifDefined(requiredMessage)}"
        icon="${ifDefined(icon)}"
        iconAltText="${ifDefined(iconAltText)}"
        ?private=${isPrivate}
        privateLabel="${ifDefined(privateLabel)}"
        ?loading=${loading}
        ?saved=${saved}
        error="${ifDefined(error)}"
        @change=${onChange}
      >
        ${slot}
      </dt-multi-text>
    `;
  },
};

export const Empty = {
  args: {
    value: [],
  },
};

export const SvgIcon = {
  args: {
    icon: null,
    slot: 'SvgIcon',
  },
};

export const CustomPlaceholder = {
  args: {
    placeholder: 'Enter a value',
  },
};

export const EnteredValue = {
  args: {
    value: [
      {
        verified: false,
        value: 'test1',
        key: 'comm_channel_1',
      },
      {
        verified: false,
        value: 'test2',
        key: 'comm_channel_2',
      },
    ],
  },
};

export const AutoSave = {
  args: {
    onChange: onAutoSave,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    value: [
      {
        value: 'Lorem Ipsum',
        key: 'comm_channel_1',
      },
    ],
  },
};

export const PrivateField = {
  args: {
    private: true,
    value: [
      {
        value: 'Lorem Ipsum',
        key: 'comm_channel_1',
      },
    ],
    privateLabel: 'This is a custom tooltip',
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};
export const Saved = {
  args: {
    saved: true,
  },
};
export const Error = {
  args: {
    error: 'Custom error message',
  },
};

export const ErrorSlot = {
  args: {
    error: '[Should show link here]',
    slot: 'ErrorSlot',
  },
};

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    value: [
      {
        value: 'Lorem Ipsum',
        key: 'comm_channel_1',
      },
    ],
  },
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    required: true,
  },
};

export const Password = {
  args: {
    type: 'password',
  },
};

export const RequiredCustomMessage = {
  decorators: [FormDecorator],
  args: {
    required: true,
    requiredMessage: 'Custom error message',
  },
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator, FormDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    value: [
      {
        value: 'راد أن يشع',
        key: 'comm_channel_1',
      },
    ],
  },
};

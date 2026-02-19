import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-multi-text-groups.js';

export default {
  title: 'Components/Form/Text - Multi Text Groups',
  component: 'dt-multi-text-groups',
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    value: {
      control: 'text',
      type: { name: 'array' },
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
    groups: {
      control: 'text',
      type: { name: 'array' },
    },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
  render: args => {
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
    groups = '',
    error,
    onChange,
    slot,
    type,
  } = args;
  return html`
    <dt-multi-text-groups
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
      .groups=${groups}
      error="${ifDefined(error)}"
      @change=${onChange}
    >
      ${slot}
    </dt-multi-text-groups>
  `;
  },
};

export const Empty = {};
Empty.args = {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
  };

export const EmptyNoGroups = {};

export const SvgIcon = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    icon: null,
    slot: 'SvgIcon',
  },
};

export const CustomPlaceholder = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    placeholder: 'Enter a value',
  },
};

export const EnteredValue = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: 'Lorem Ipsum',
        key: 'comm_channel_1',
        group: 'one',
      },
      {
        value: 'Lorem Ipsum 2',
        key: 'comm_channel_2',
        group: 'two',
      },
      {
        value: 'Lorem Ipsum 3',
        key: 'comm_channel_3',
        group: 'two',
      },
    ],
  },
};

export const AutoSave = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    onChange: onAutoSave,
  },
};

export const Disabled = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    disabled: true,
    value: [
      {
        value: 'Lorem Ipsum',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
  }
}

export const privateField = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    isPrivate: true,
    value: [
      {
        value: 'Lorem Ipsum',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
    privateLabel: 'This is a custom tooltip',
  },
};

export const Loading = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: '',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
    loading: true,
  },
};

export const Saved = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: '',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
    saved: true,
  }
};

export const Error = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: '',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
    error: 'Custom error message',
  },
};

export const ErrorSlot = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: '',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
    error: '[Should show link here]',
    slot: 'ErrorSlot',
  },
};

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: '',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
  },
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: '',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
    required: true,
  },
};

export const requiredCustomMessage = {
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    value: [
      {
        value: '',
        key: 'comm_channel_1',
        group: 'one'
      },
    ],
    required: true,
    requiredMessage: 'Custom error message',
  },
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator, FormDecorator],
  args: {
    groups: [
      { id: 'one', label: 'Group 1' }, 
      { id: 'two', label: 'Group 2' }
    ],
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    value: [
      {
        value: 'راد أن يشع',
        key: 'comm_channel_1',
        group: 'one',
      },
    ],
  },
};
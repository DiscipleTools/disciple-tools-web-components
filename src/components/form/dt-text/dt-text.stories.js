import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
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
    readonly: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  render: args => {
    const {
      id = 'name',
      name = 'field-name',
      label = 'Field Name',
      value,
      disabled = false,
      required = false,
      requiredMessage,
      icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
      iconAltText = 'Icon Alt Text',
      privateLabel,
      readonly = false,
      loading = false,
      saved = false,
      error,
      slot,
      type,
      onChange,
    } = args;
    return html`
      <dt-text
        id=${ifDefined(id)}
        name=${ifDefined(name)}
        label=${ifDefined(label)}
        value=${ifDefined(value)}
        type=${ifDefined(type)}
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage=${ifDefined(requiredMessage)}
        icon="${ifDefined(icon)}"
        iconAltText="${ifDefined(iconAltText)}"
        ?private=${args.private}
        ?readonly=${readonly}
        privateLabel="${ifDefined(privateLabel)}"
        ?loading=${loading}
        ?saved=${saved}
        error="${ifDefined(error)}"
        @change=${onChange}
      >
        ${slot}
      </dt-text>
    `;
  },
};

export const Empty = {};

export const SvgIcon = {
  args: {
    icon: null,
    slot: 'SvgIcon',
  },
};

export const EnteredValue = {
  args: {
    value: 'Lorem Ipsum',
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
    value: 'Lorem Ipsum',
  },
};

export const PrivateField = {
  args: {
    private: true,
    value: 'Lorem Ipsum',
    privateLabel: 'This is a custom tooltip',
  },
};

export const Readonly = {
  args: {
    readonly: true,
    value: 'Lorem Ipsum',
  },
};

export const ReadonlyDisabled = {
  args: {
    readonly: true,
    disabled: true,
    value: 'Lorem Ipsum',
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
    value: 'Lorem Ipsum',
  },
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    required: true,
  },
};

export const RequiredCustomMessage = {
  decorators: [FormDecorator],
  args: {
    required: true,
    requiredMessage: 'Custom error message',
  },
};

export const Password = {
  args: {
    type: 'password',
  },
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    value: 'راد أن يشع',
  },
};
/* // requires addon-interactions v8.6
export const Focus = {
  play: async () => {
    document.querySelector('dt-text').focus();
  }
}; */

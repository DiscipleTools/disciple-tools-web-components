import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-number.js';

export default {
  title: 'Components/Form/Number',
  component: 'dt-number',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
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
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
  render: (args) => {
    const {
      id = 'name',
      name = 'field-name',
      label = 'Field Name',
      value,
      min,
      max,
      disabled = false,
      required = false,
      requiredMessage,
      icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
      iconAltText = 'Icon Alt Text',
      privateLabel,
      loading = false,
      saved = false,
      error,
      slot,
      onChange,
    } = args;
    return html`
    <dt-number
      id=${ifDefined(id)}
      name=${ifDefined(name)}
      label=${ifDefined(label)}
      value=${ifDefined(value)}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${ifDefined(requiredMessage)}
      icon="${ifDefined(icon)}"
      iconAltText="${ifDefined(iconAltText)}"
      ?private=${args.private}
      privateLabel="${ifDefined(privateLabel)}"
      ?loading=${loading}
      ?saved=${saved}
      error="${ifDefined(error)}"
      @change=${onChange}
    >
      ${slot}
    </dt-number>
  `;
  }
};

export const Empty = {};

export const SvgIcon = {
  args: {
    icon: null,
    slot: 'SvgIcon',
  }
};

export const EnteredValue = {
  args: {
    value: 42,
  }
};

export const AutoSave = {
  args: {
    onChange: onAutoSave,
  }
};

export const Disabled = {
  args: {
    disabled: true,
    value: 42,
  }
};

export const PrivateField = {
  args: {
    private: true,
    value: 42,
    privateLabel: 'This is a custom tooltip',
  }
};

export const Loading = {
  args: {
    loading: true,
  }
};

export const Saved = {
  args: {
    saved: true,
  }
};

export const Error = {
  args: {
    error: 'Custom error message',
  }
};

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    value: 42,
  }
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    required: true,
  }
};

export const RequiredCustomMessage = {
  decorators: [FormDecorator],
  args: {
    required: true,
    requiredMessage: 'Custom error message',
  }
};

export const MinValue = {
  args: {
    min: 9,
  }
};

export const MaxValue = {
  args: {
    max: 10,
  }
};

export const MinMaxValue = {
  args: {
    min: 3,
    max: 7,
  }
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    value: 42,
  }
};

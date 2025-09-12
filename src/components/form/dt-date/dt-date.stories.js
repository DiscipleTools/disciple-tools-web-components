import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';
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
  render: (args) => {
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
      iconAltText = 'Icon Alt Text',
      privateLabel,
      loading,
      saved,
      error,
      slot,
      onChange
    } = args;
    return html`
      <dt-date
        id=${ifDefined(id)}
        name=${ifDefined(name)}
        label=${ifDefined(label)}
        value=${ifDefined(value)}
        timestamp=${ifDefined(timestamp)}
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage=${ifDefined(requiredMessage)}
        icon=${ifDefined(icon)}
        iconAltText="${ifDefined(iconAltText)}"
        ?private=${args.private}
        privateLabel="${ifDefined(privateLabel)}"
        ?loading=${loading}
        ?saved=${saved}
        error="${ifDefined(error)}"
        @change=${onChange}
      >
        ${slot}
      </dt-date>
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

export const EnteredPHPTimestamp = {
  args: {
    timestamp: 1468281600
  }
};

export const EnteredDateString = {
  args: {
    value: '2020-01-01'
  }
};

export const EnteredJSTimestamp = {
  args: {
    timestamp: 1658361600000
  }
};

export const AutoSave = {
  args: {
    onChange: onAutoSave
  }
};

export const Disabled = {
  args: {
    value: '2020-01-01',
    disabled: true
  }
};

export const PrivateField = {
  args: {
    private: true,
    value: '2020-01-01',
    privateLabel: 'This is a custom tooltip',
  }
};

export const Loading = {
  args: {
    loading: true
  }
};

export const Saved = {
  args: {
    saved: true
  }
};

export const Error = {
  args: {
    error: 'Custom error message'
  }
};

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    value: '2020-01-01'
  }
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    required: true
  }
};

export const RequiredCustomMessage = {
  decorators: [FormDecorator],
  args: {
    required: true,
    requiredMessage: 'Custom error message'
  }
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال'
  }
};

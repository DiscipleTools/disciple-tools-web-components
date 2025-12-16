import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator
} from '../../../stories-utils.js';
import './dt-toggle.js';

export default {
  title: 'Components/Form/Toggle',
  component: 'dt-toggle',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    icons: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { control: 'text' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
  render: args => {
    const {
      id = 'name',
      name = 'field-name',
      label = 'Field Name',
      disabled = false,
      checked = false,
      icons = false,
      loading = false,
      saved = false,
      error,
      onChange,
      slot,
    } = args;
    return html`
      <dt-toggle
        id=${ifDefined(id)}
        name=${ifDefined(name)}
        label=${ifDefined(label)}
        ?checked=${checked}
        ?icons=${icons}
        ?disabled=${disabled}
        ?loading=${loading}
        ?saved=${saved}
        error="${ifDefined(error)}"
        @change=${onChange}
      >
        ${slot}
      </dt-toggle>
    `;
  },
};

export const Default = {};

export const ToggledOn = {
  args: {
    checked: true,
  },
};

export const ShowIcons = {
  args: {
    icons: true,
  },
};

export const DisabledOff = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const DisabledOn = {
  args: {
    checked: true,
    disabled: true,
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

export const BasicForm = {
  decorators: [FormDecorator],
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

export const LocalizeRTLOn = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    value: 'راد أن يشع',
    checked: true,
  },
};

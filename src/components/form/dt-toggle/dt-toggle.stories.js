import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
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
      disabled = false,
      checked = false,
      icons = false,
      required = false,
      requiredMessage,
      icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
      iconAltText = 'Icon Alt Text',
      privateLabel,
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
      </dt-toggle>
    `;
  },
};

export const Empty = {};

export const ToggledOn = {
  args: {
    checked: true,
  },
};

export const SvgIcon = {
  args: {
    icon: null,
    slot: 'SvgIcon',
  },
};

export const ShowIcons = {
  args: {
    icons: true,
  },
};

export const AutoSave = {
  args: {
    onChange: onAutoSave,
  },
};

export const Disabled = {
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

export const PrivateField = {
  args: {
    private: true,
    checked: true,
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
    slot: 'ErrorSlot',
    error: '[Should show link here]',
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
  },
};

export const LocalizeRTLOn = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    checked: true,
  },
};

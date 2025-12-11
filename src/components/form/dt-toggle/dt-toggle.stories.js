import { html } from 'lit';
import { argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-toggle.js';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';

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
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
  render: args => {
    const {
      id = 'name',
      name = 'field-name',
      label,
      disabled = false,
      checked = false,
      icons = false,
      onChange,
      slot,
    } = args;
    return html`
      <dt-toggle
        id=${id}
        name=${name}
        label=${ifDefined(label)}
        ?checked=${checked}
        ?icons=${icons}
        ?disabled=${disabled}
        @change=${onChange}
      >
        ${slot}
      </dt-toggle>
    `;
  },
};

export const Default = {};

export const Label = {
  args: {
    label: 'Toggle Label',
  },
};

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

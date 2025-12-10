import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  LocaleDecorator,
  FormDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-multi-select.js';

const basicOptions = [
  {
    id: 'opt1',
    label: 'Option 1',
  },
  {
    id: 'opt2',
    label: 'Option 2',
  },
  {
    id: 'opt3',
    label: 'Option 3',
  },
  {
    id: 'opt4',
    label: 'Option 4',
  },
  {
    id: 'opt5',
    label: 'Option 5',
  },
  {
    id: 'opt6',
    label: 'Option 6',
  },
  {
    id: 'opt7',
    label: 'Option 7',
  },
  {
    id: 'opt8',
    label:
      'Long option that is too long to fit in the dropdown. It should be truncated with an ellipsis.',
  },
];
export default {
  title: 'Components/Form/Multi Select',
  component: 'dt-multi-select',
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
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
      name = 'field-name',
      label = 'Field Name',
      options,
      placeholder,
      value,
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
      open,
      slot,
      onChange,
    } = args;
    return html`
      <dt-multi-select
        name="${name}"
        label=${label}
        placeholder="${placeholder}"
        options="${JSON.stringify(options)}"
        value="${JSON.stringify(value)}"
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage=${requiredMessage}
        icon="${icon}"
        iconAltText="${iconAltText}"
        ?private=${isPrivate}
        privateLabel="${privateLabel}"
        ?loading="${loading}"
        ?saved="${saved}"
        error="${ifDefined(error)}"
        .open="${open}"
        @change=${onChange}
      >
        ${slot}
      </dt-multi-select>
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

export const CustomOptions = {
  args: {
    options: basicOptions,
  },
};

export const CustomPlaceholder = {
  args: {
    placeholder: 'Search Options',
  },
};

export const SelectedValue = {
  args: {
    value: ['opt2', 'opt3'],
    options: basicOptions,
  },
};
export const OptionsWrap = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    value: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6', 'opt7'],
    options: basicOptions,
  },
};

export const SmallWidth = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    value: ['opt8'],
    options: basicOptions,
  },
};
export const OptionsOpen = {
  args: {
    value: ['opt1'],
    options: basicOptions,
    open: true,
  },
};

export const NoOptionsAvailable = {
  args: {
    value: ['opt1', 'opt2', 'opt3'],
    options: basicOptions.slice(0, 3),
    open: true,
  },
};

export const AutoSave = {
  args: {
    options: basicOptions,
    onChange: onAutoSave,
  },
};

export const Disabled = {
  args: {
    value: ['opt2'],
    options: basicOptions,
    disabled: true,
  },
};

export const Loading = {
  args: {
    value: ['opt2'],
    options: basicOptions,
    loading: true,
  },
};

export const Saved = {
  args: {
    value: ['opt2'],
    options: basicOptions,
    saved: true,
  },
};
export const Error = {
  args: {
    options: basicOptions,
    error: 'Custom error message',
  },
};

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    value: ['opt2'],
    options: basicOptions,
  },
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    required: true,
    options: basicOptions,
  },
};

export const RequiredCustomMessage = {
  decorators: [FormDecorator],
  args: {
    required: true,
    requiredMessage: 'Custom error message',
    options: basicOptions,
  },
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    value: ['opt1'],
    options: [
      {
        id: 'opt1',
        label: 'تنكر هؤلاء الرجال المفتونون',
      },
      {
        id: 'opt2',
        label: 'م فيتساوي مع هؤلاء',
      },
      {
        id: 'opt3',
        label: 'فلا أحد يرفض',
      },
    ],
  },
};

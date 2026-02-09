import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator } from '../../../stories-utils.js';
import './dt-location.js';
import { ifDefined } from 'lit/directives/if-defined.js';

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
    label: 'Option 8',
  },
];
const defaultFilters = [
  {
    id: 'focus',
    label: 'Region of Focus',
  },
  {
    id: 'all',
    label: 'All Locations',
  },
];

function onLoadEvent(event) {
  console.log('fetching data', event);
  const { query, onSuccess } = event.detail;
  action('on-load')(event);
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      onSuccess(
        json
          .filter(
            post => !query || post.title.includes(query) || post.id === query,
          )
          .map(post => ({
            id: post.id.toString(),
            label: post.title,
          })),
      );
    });
}
export default {
  title: 'Components/Form/Location',
  component: 'dt-location',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    allowAdd: { control: 'boolean' },
    private: { control: 'boolean' },
    privateLabel: { control: 'text' },
    error: { control: 'text' },
    slot: { control: 'text' },
    options: { control: 'object' },
    filters: { control: 'object' },
    requiredMessage: { control: 'text' },
    onChange: { action: 'on-change' },
    ...argTypes,
  },
  args: {
    id: 'name',
    name: 'field-name',
    label: 'Field Name',
    placeholder: 'Search Locations',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText: 'Icon Alt Text',
    private: false,
    privateLabel: 'Private',
    loading: false,
    saved: false,
    error: '',
    slot: '',
    options: basicOptions,
    filters: defaultFilters,
    requiredMessage: 'This field is required',
    onChange: action('on-change'),
    onLoad: action('on-load'),
  },
  render: args => {
    const {
      id = 'name',
      name = 'field-name',
      label = 'Field Name',
      options,
      filters,
      placeholder,
      value,
      disabled,
      required,
      requiredMessage,
      icon,
      iconAltText = 'Icon Alt Text',
      private: isPrivate,
      privateLabel,
      loading,
      saved,
      allowAdd,
      error,
      slot,
      onChange,
      onLoad,
    } = args;
    return html`
      <dt-location
        id="${ifDefined(id)}"
        name="${ifDefined(name)}"
        label="${ifDefined(label)}"
        placeholder="${ifDefined(placeholder)}"
        .options="${options}"
        .filters="${filters}"
        .value="${value}"
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage="${ifDefined(requiredMessage)}"
        icon="${ifDefined(icon)}"
        iconAltText="${ifDefined(iconAltText)}"
        ?private="${isPrivate}"
        privateLabel="${ifDefined(privateLabel)}"
        ?allowAdd="${allowAdd}"
        ?loading="${loading}"
        ?saved="${saved}"
        error="${ifDefined(error)}"
        @change=${onChange}
        @dt:get-data=${onLoad}
      >
        ${slot}
      </dt-location>
    `;
  },
};

export const Empty = {
  args: {},
};

export const SvgIcon = {
  args: {
    icon: null,
    slot: 'SvgIcon',
  },
};

export const StaticOptions = {
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
    value: [basicOptions[1]],
  },
};

export const LoadOptionsFromAPI = {
  args: {
    options: null,
    onLoad: onLoadEvent,
  },
};

export const AddNewOption = {
  args: {
    allowAdd: true,
    options: basicOptions,
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
    value: [basicOptions[1]],
    options: basicOptions,
    disabled: true,
  },
};
export const PrivateField = {
  args: {
    private: true,
    privateLabel: 'This is a custom tooltip',
    value: [basicOptions[1]],
  },
};

export const Loading = {
  args: {
    value: [basicOptions[1]],
    options: basicOptions,
    loading: true,
  },
};
export const Saved = {
  args: {
    value: [basicOptions[1]],
    options: basicOptions,
    saved: true,
  },
};
export const Error = {
  args: {
    value: [basicOptions[1]],
    options: basicOptions,
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
  args: {
    value: [basicOptions[1]],
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

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    placeholder: 'حدد العلامات',
    allowAdd: true,
    loading: true,
    value: [
      {
        id: 'opt1',
        label: 'تنكر هؤلاء الرجال المفتونون',
      },
    ],
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
    filters: [
      {
        id: 'focus',
        label: 'منطقة التركيز',
      },
      {
        id: 'all',
        label: 'جميع المواقع',
      },
    ],
  },
};

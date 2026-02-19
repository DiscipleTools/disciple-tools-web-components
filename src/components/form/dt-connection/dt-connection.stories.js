import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  LocaleDecorator,
  FormDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-connection.js';

const basicOptions = [
  {
    id: 1,
    label: 'Option 1',
    link: '/#opt1',
    status: {
      key: 'active',
      label: 'Active',
      color: '#4CAF50',
    },
  },
  {
    id: 2,
    label: 'User 2',
    link: '/#opt2',
    user: true,
    status: {
      key: 'assigned',
      label: 'Waiting to be accepted',
      color: '#FF9800',
    },
  },
  {
    id: 3,
    label: 'Option 3',
    link: '/#opt3',
  },
  {
    id: 4,
    label: 'Option 4',
    link: '/#opt4',
  },
  {
    id: 5,
    label: 'Option 5',
    link: '/#opt5',
  },
  {
    id: 6,
    label: 'Option 6',
    link: '/#opt6',
  },
  {
    id: 7,
    label: 'Option 7',
    link: '/#opt7',
  },
  {
    id: 8,
    label:
      'Long option that is too long to fit in the dropdown. It should be truncated with an ellipsis.',
    link: '/#opt8',
  },
];
function onLoadEvent(event) {
  console.log('fetching data', event);
  const { field, query, onSuccess, onError } = event.detail;
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      onSuccess(
        json
          .filter(
            post => !query || post.title.includes(query) || post.id === query,
          )
          .map(post => ({
            id: post.id,
            label: post.title,
          })),
      );
    });
}

export default {
  title: 'Components/Form/Connection',
  component: 'dt-connection',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'object' },
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    allowAdd: { control: 'boolean' },
    private: { control: 'boolean' },
    privateLabel: { control: 'text' },
    error: { control: 'text' },
    slot: { control: 'text' },
    options: { control: 'object' },
    requiredMessage: { control: 'text' },
    onChange: { action: 'on-change' },
    ...argTypes,
  },
  args: {
    id: 'name',
    name: 'field-name',
    label: 'Field Name',
    placeholder: 'Select Connection',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText: 'Icon Alt Text',
    private: false,
    privateLabel: 'Private',
    loading: false,
    saved: false,
    error: '',
    slot: '',
    options: basicOptions,
    requiredMessage: 'This field is required',
    onLoad: action('on-load'),
    onChange: action('on-change'),
    onNew: action('on-new'),
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  render: args => {
    const {
      id = 'name',
      name = 'field-name',
      label = 'Field Name',
      options,
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
      open,
      error,
      slot,
      allowAdd,
      onChange,
      onLoad,
      onNew,
    } = args;
    return html`
      <dt-connection
        id="${ifDefined(id)}"
        name="${ifDefined(name)}"
        label="${ifDefined(label)}"
        placeholder="${ifDefined(placeholder)}"
        .options="${options}"
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
        .open="${open}"
        error="${ifDefined(error)}"
        @change=${onChange}
        @dt:get-data=${onLoad}
        @dt:add-new=${onNew}
      >
        ${slot}
      </dt-connection>
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
    options: basicOptions,
  },
};

export const SelectedValue = {
  args: {
    value: [
      basicOptions[1],
      {
        id: 99,
        label: 'Option 99',
      },
    ],
    options: basicOptions,
  },
};

export const SmallWidth = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    value: [basicOptions[7]],
    options: basicOptions,
  },
};
export const SmallWidthWithAdd = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    value: [basicOptions[7]],
    options: basicOptions,
    allowAdd: true,
  },
};

export const OptionsOpen = {
  args: {
    value: [basicOptions[0]],
    options: basicOptions,
    open: true,
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
    privateLabel: 'This is a private field',
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
    value: [
      {
        id: 2,
        label: 'qui est esse',
      },
    ],
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

export const basicForm = {
  decorators: [FormDecorator],
  args: {
    value: [basicOptions[1]],
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
    placeholder: 'حدد العلامات',
    allowAdd: true,
    loading: true,
    value: [
      {
        id: 1,
        label: 'تنكر هؤلاء الرجال المفتونون',
      },
    ],
    options: [
      {
        id: 1,
        label: 'تنكر هؤلاء الرجال المفتونون',
        link: '/#opt1',
        status: {
          key: 'active',
          label: 'نشيط',
          color: '#4CAF50',
        },
      },
      {
        id: 2,
        label: 'م فيتساوي مع هؤلاء',
        link: '/#opt2',
        user: true,
        status: {
          key: 'assigned',
          label: 'في انتظار قبولها',
          color: '#FF9800',
        },
      },
      {
        id: 3,
        label: 'فلا أحد يرفض',
        link: '/#opt3',
      },
    ],
  },
};

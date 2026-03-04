import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-users-connection.js';

const basicOptions = [
  {
    label: 'Bp',
    id: 2,
    avatar:
      'https:\/\/2.gravatar.com\/avatar\/2373ee570d59db06102d14feb50a4291?s=16&d=mm&r=g',
    contact_id: 10,
    status: '#4caf50',
  },
  {
    label: 'root',
    id: 1,
    avatar:
      'https:\/\/0.gravatar.com\/avatar\/3f009d72559f51e7e454b16e5d0687a1?s=16&d=mm&r=g',
    contact_id: 6,
    update_needed: 0,
  },
  {
    label: 'root2',
    id: 3,
    avatar:
      'https:\/\/0.gravatar.com\/avatar\/3f009d72559f51e7e454b16e5d0687a1?s=16&d=mm&r=g',
    contact_id: 6,
    update_needed: 0,
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
  title: 'Components/Form/Users Connection',
  component: 'dt-users-connection',
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
    single: { control: 'boolean' },
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
    allowAdd: false,
    single: false,
    onLoad: action('on-load'),
    onChange: action('on-change'),
    onAdd: action('on-add'),
  },
  render: args => {
    const {
      id = 'name',
      name = 'field-name',
      label = 'Field Name',
      options,
      placeholder = 'Select Connection',
      value,
      open,
      disabled,
      required,
      requiredMessage,
      icon,
      iconAltText = 'Icon Alt Text',
      private: isPrivate,
      privateLabel,
      loading,
      saved,
      error,
      single,
      onChange,
      onLoad,
      onAdd,
      allowAdd,
      slot,
    } = args;
    return html`
      <dt-users-connection
        id="${ifDefined(id)}"
        name="${ifDefined(name)}"
        label="${ifDefined(label)}"
        placeholder="${ifDefined(placeholder)}"
        .options="${options}"
        .value="${value}"
        .open="${open}"
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage="${ifDefined(requiredMessage)}"
        icon="${ifDefined(icon)}"
        iconAltText="${ifDefined(iconAltText)}"
        ?private=${isPrivate}
        privateLabel="${ifDefined(privateLabel)}"
        ?allowAdd="${allowAdd}"
        ?loading="${loading}"
        ?saved="${saved}"
        ?single="${single}"
        error="${ifDefined(error)}"
        @change=${onChange}
        @dt:get-data=${onLoad}
        @dt:add-new=${onAdd}
      >
        ${slot}
      </dt-users-connection>
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
    value: [basicOptions[0]],
    options: basicOptions,
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
    value: [basicOptions[1]],
    options: basicOptions,
    saved: true,
  },
};

export const Single = {
  args: {
    options: basicOptions,
    single: true,
    allowAdd: true,
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
        id: 'opt1',
        label: 'تنكر هؤلاء الرجال المفتونون',
      },
    ],
    options: [
      {
        label: 'Bp',
        id: 2,
        avatar:
          'https:\/\/2.gravatar.com\/avatar\/2373ee570d59db06102d14feb50a4291?s=16&d=mm&r=g',
        contact_id: 10,
        status: '#4caf50',
        update_needed: 0,
      },
      {
        label: 'root',
        id: 1,
        avatar:
          'https:\/\/2.gravatar.com\/avatar\/2373ee570d59db06102d14feb50a4291?s=16&d=mm&r=g',
        contact_id: 10,
        status: '#4caf50',
        update_needed: 0,
      },
    ],
  },
};

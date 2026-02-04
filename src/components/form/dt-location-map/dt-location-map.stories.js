import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-location-map.js';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const GOOGLE_GEOCODE_TOKEN = import.meta.env.VITE_GOOGLE_GEOCODE_TOKEN;

const basicOptions = [
  {
    grid_meta_id: '65',
    post_id: '43',
    post_type: 'contacts',
    postmeta_id_location_grid: '1671',
    grid_id: '100366112',
    lng: '-73.9866',
    lat: '40.7306',
    level: 'place',
    source: 'user',
    label: 'New York, New York, United States',
  },
  {
    grid_meta_id: '66',
    post_id: '43',
    post_type: 'contacts',
    postmeta_id_location_grid: '1673',
    grid_id: '100364858',
    lng: '-87.624421',
    lat: '41.875562',
    level: 'place',
    source: 'user',
    label: 'Chicago, Illinois, United States',
  },
  {
    grid_meta_id: '67',
    post_id: '43',
    post_type: 'contacts',
    postmeta_id_location_grid: '1675',
    grid_id: '100364452',
    lng: '-118.242766',
    lat: '34.053691',
    level: 'place',
    source: 'user',
    label: 'Los Angeles, California, United States',
  },
  {
    label: ['Test'],
    key: 'contact_address_861',
  },
];
export default {
  title: 'Components/Form/Location Meta',
  component: 'dt-location-map',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    mapboxToken: { control: 'text' },
    googleToken: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'object' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    requiredMessage: { control: 'text' },
    icon: { control: 'text' },
    iconAltText: { control: 'text' },
    private: { control: 'boolean' },
    privateLabel: { control: 'text' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    open: { control: 'boolean' },
    i18n: { control: 'object' },
    limit: { control: 'number' },
    error: { control: 'text' },
    slot: { control: 'text' },
    onChange: { action: 'on-change' },
    ...argTypes,
  },
  args: {
    theme: 'default',
    id: 'field-id',
    name: 'field-name',
    label: 'Field Name',
    mapboxToken: MAPBOX_TOKEN,
    googleToken: GOOGLE_GEOCODE_TOKEN,
    placeholder: 'Search Locations',
    value: [],
    disabled: false,
    required: false,
    requiredMessage: 'This field is required',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText: 'Icon Alt Text',
    private: false,
    privateLabel: 'Private',
    loading: false,
    saved: false,
    open: false,
    i18n: null,
    limit: 0,
    error: '',
    slot: '',
    onChange: action('on-change'),
  },
  render: args => {
    const {
      name = 'field-name',
      label = 'Field Name',
      mapboxToken = MAPBOX_TOKEN,
      googleToken = GOOGLE_GEOCODE_TOKEN,
      placeholder,
      value,
      disabled = false,
      required = false,
      requiredMessage,
      icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
      iconAltText = 'Icon Alt Text',
      privateLabel,
      loading = false,
      saved = false,
      onChange,
      open,
      slot,
      i18n,
      limit,
      error,
    } = args;
    return html`
      <dt-location-map
        id="${ifDefined(args.id)}"
        name="${ifDefined(args.name)}"
        label="${ifDefined(args.label)}"
        mapbox-token="${ifDefined(mapboxToken)}"
        google-token="${ifDefined(googleToken)}"
        placeholder="${ifDefined(args.placeholder)}"
        .value="${args.value}"
        ?disabled=${args.disabled}
        ?required=${args.required}
        requiredMessage="${ifDefined(args.requiredMessage)}"
        icon="${ifDefined(args.icon)}"
        iconAltText="${ifDefined(args.iconAltText)}"
        ?private=${args.private}
        privateLabel="${ifDefined(args.privateLabel)}"
        ?loading=${args.loading}
        ?saved=${args.saved}
        .open=${args.open}
        .i18n="${args.i18n}"
        limit="${ifDefined(args.limit)}"
        error="${ifDefined(args.error)}"
        @change=${args.onChange}
      >
        ${args.slot}
      </dt-location-map>
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

export const CustomPlaceholder = {
  args: {
    placeholder: 'Custom Placeholder',
  },
};

export const SelectedValueMaps = {
  args: {
    value: [basicOptions[1], basicOptions[2]],
  },
};

export const SelectedValueMixed = {
  args: {
    value: [
      basicOptions[1],
      {
        label: 'Custom address',
        key: 'contact_addres_1fe',
      },
    ],
  },
};

export const Open = {
  args: {
    value: [basicOptions[1], basicOptions[2]],
    open: true,
  },
};

export const AutoSave = {
  args: {
    value: [basicOptions[0]],
    onChange: onAutoSave,
  },
};

export const Disabled = {
  args: {
    value: [basicOptions[0]],
    disabled: true,
  },
};

export const PrivateField = {
  args: {
    value: [basicOptions[0]],
    private: true,
    privateLabel: 'Private field',
  },
};

export const Loading = {
  args: {
    value: [basicOptions[0], basicOptions[1]],
    loading: true,
  },
};

export const Saved = {
  args: {
    value: [basicOptions[0], basicOptions[1]],
    saved: true,
  },
};

export const Error = {
  args: {
    value: [basicOptions[0], basicOptions[1]],
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
  decorators: [LocaleDecorator, FormDecorator],
  args: {
    value: [basicOptions[0]],
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
    requiredMessage: 'Custom message',
  },
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'حقل الموقع',
    placeholder: 'اختر موقعا',
    value: [
      {
        grid_meta_id: '65',
        post_id: '43',
        post_type: 'contacts',
        postmeta_id_location_grid: '1671',
        grid_id: '100366112',
        lng: '-73.9866',
        lat: '40.7306',
        level: 'place',
        source: 'user',
        label: 'نيويورك ، نيويورك ، الولايات المتحدة',
      },
    ],
  },
};

export const WithLimit = {
  args: {
    value: [basicOptions[0]],
    limit: 1,
  },
};

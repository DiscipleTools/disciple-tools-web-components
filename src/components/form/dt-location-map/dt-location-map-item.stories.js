import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-location-map-item.js';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const GOOGLE_GEOCODE_TOKEN = import.meta.env.VITE_GOOGLE_GEOCODE_TOKEN;

const basicOptions = [
  {
    "grid_meta_id": "65",
    "post_id": "43",
    "post_type": "contacts",
    "postmeta_id_location_grid": "1671",
    "grid_id": "100366112",
    "lng": "-73.9866",
    "lat": "40.7306",
    "level": "place",
    "source": "user",
    "label": "New York, New York, United States"
  },
  {
    "grid_meta_id": "66",
    "post_id": "43",
    "post_type": "contacts",
    "postmeta_id_location_grid": "1673",
    "grid_id": "100364858",
    "lng": "-87.624421",
    "lat": "41.875562",
    "level": "place",
    "source": "user",
    "label": "Chicago, Illinois, United States"
  },
  {
    "grid_meta_id": "67",
    "post_id": "43",
    "post_type": "contacts",
    "postmeta_id_location_grid": "1675",
    "grid_id": "100364452",
    "lng": "-118.242766",
    "lat": "34.053691",
    "level": "place",
    "source": "user",
    "label": "Los Angeles, California, United States"
  }
];
export default {
  title: 'Components/Form/Location Meta/dt-location-map-item',
  component: 'dt-location-map-item',
  argTypes: {
    theme: { control: 'select', options: Object.keys(themes) },
    placeholder: {
      control: 'text',
      description: 'String rendered as placeholder text',
    },
    loading: {
      control: 'boolean',
      description:
        '(true|false) If attribute is present, the loading spinner will be displayed within the field',
      table: {
        type: {
          summary: 'loading',
          detail: '<dt-location loading />',
        },
      },
    },
    saved: {
      control: 'boolean',
      description:
        '(true|false) If attribute is present, the saved checkmark will be displayed within the field',
      table: {
        type: {
          summary: 'saved',
          detail: '<dt-location saved />',
        },
      },
    },
    ...argTypes,
  },
  args: {
    theme: 'default',
    placeholder: 'Search Locations',
    onChange: action('on-change'),
  },
  render: args => {
    const {
      placeholder,
      mapboxToken = MAPBOX_TOKEN,
      googleToken,
      metadata,
      disabled = false,
      loading = false,
      saved = false,
      error,
      onChange,
      open,
      i18n,
    } = args;
    return html`
      <style>
        ${themeCss(args)}
      </style>
      <dt-location-map-item
        placeholder="${placeholder}"
        mapbox-token=${mapboxToken}
        google-token=${googleToken}
        metadata="${JSON.stringify(metadata)}"
        ?disabled=${disabled}
        ?loading="${loading}"
        ?saved="${saved}"
        error="${ifDefined(error)}"
        .open="${open}"
        i18n="${JSON.stringify(i18n)}"
        @change=${onChange}
      >
      </dt-location-map-item>
    `;
  },
};

export const Empty = {};

export const CustomPlaceholder = {
  args: {
    placeholder: 'Custom Placeholder',
  },
};

export const SelectedValueMap = {
  args: {
    metadata: basicOptions[1],
  },
};
export const SelectedValueAddress = {
  args: {
    metadata: {
      label: 'Custom address',
      key: 'contact_address_1fe',
    },
  },
};

export const GoogleGeocode = {
  args: {
    googleToken: GOOGLE_GEOCODE_TOKEN,
  },
};

export const Open = {
  args: {
    open: true,
  },
};

export const Disabled = {
  args: {
    value: [basicOptions[0]],
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
    value: [
      {
        id: '2',
        label: 'qui est esse',
      },
    ],
    options: basicOptions,
    saved: true,
  },
};

export const Error = {
  args: {
    error: 'Custom error message',
  },
};

export const SelectedValueLoading = {
  args: {
    metadata: basicOptions[1],
    loading: true,
  },
};

export const SelectedValueSaved = {
  args: {
    metadata: basicOptions[1],
    saved: true,
  },
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'حقل الموقع',
    placeholder: 'اختر موقعا',
    loading: true,
    value: [
      {
        "grid_meta_id": "65",
        "post_id": "43",
        "post_type": "contacts",
        "postmeta_id_location_grid": "1671",
        "grid_id": "100366112",
        "lng": "-73.9866",
        "lat": "40.7306",
        "level": "place",
        "source": "user",
        "label": "نيويورك ، نيويورك ، الولايات المتحدة"
      },
    ],
  },
};

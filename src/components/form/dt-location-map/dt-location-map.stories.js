import { html } from 'lit';
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
  },
  {
    "label": [
      "Test"
    ],
    "key": "contact_address_861"
  }
];
export default {
  title: 'Components/Form/Location Meta',
  component: 'dt-location-map',
  argTypes: {
    theme: { control: 'select', options: Object.keys(themes) },
    name: {
      control: 'text',
      type: { name: 'string', required: true },
      description:
        'Passed to `change` function to identify which input triggered the event',
    },
    value: {
      control: 'text',
      type: { name: 'array' },
      table: {
        type: {
          summary: '{id:string, label:string}[]',
          detail: `[{id:'1',label:'Item 1'},{id:'345',label:'Item 345'}]`,
        },
      },
      description:
        'Array of values indicating the selected values. Should be an array of option objects converted to a string with `JSON.stringify`. <br/>**Note:** This attribute will be updated on the HTML element when value changes.',
    },
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
    limit: {
      control: 'number',
      description: 'Maximum number of locations that can be selected',
      table: {
        type: {
          summary: 'limit',
          detail: '<dt-location-map limit="1" />',
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
      isPrivate,
      privateLabel,
      loading = false,
      saved = false,
      onChange,
      open,
      slot,
      i18n,
      limit,
    } = args;
    return html`
      <dt-location-map
        name="${name}"
        label=${label}
        mapbox-token=${mapboxToken}
        google-token=${googleToken}
        placeholder="${placeholder}"
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
        .open="${open}"
        i18n="${JSON.stringify(i18n)}"
        limit="${limit}"
        @change=${onChange}
      >
        ${slot}
      </dt-location-map>
    `;
  },
};

export const Empty = {};

export const SvgIcon = {
  args: {
    icon: null,
    // prettier-ignore
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

export const WithLimit = {
  args: {
    value: [basicOptions[0]],
    limit: 1,
  },
};

import { html } from 'lit';
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
  title: 'Form/dt-location-map/dt-location-map-item',
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
    onchange: {
      control: 'text',
      description:
        'Javascript code to be executed when the value of the field changes. Makes available a `event` variable that includes field name, old value, and new value in `event.details`',
      table: {
        type: {
          summary: 'onChange(event)',
          detail: '<dt-location onchange="onChange(event)" />',
        },
      },
    },
    ...argTypes,
  },
  args: {
    theme: 'default',
    placeholder: 'Search Locations',
  },
};

function Template(args) {
  const {
    placeholder,
    mapboxToken = MAPBOX_TOKEN,
    googleToken,
    metadata,
    disabled = false,
    loading = false,
    saved = false,
    onchange,
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
      onchange="${onchange}"
      ?disabled=${disabled}
      ?loading="${loading}"
      ?saved="${saved}"
      .open="${open}"
      i18n="${JSON.stringify(i18n)}"
    >
    </dt-location-map-item>
  `;
}

export const Empty = Template.bind({});
Empty.args = {};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: 'Custom Placeholder',
};

export const SelectedValueMap = Template.bind({});
SelectedValueMap.args = {
  metadata: basicOptions[1],
};
export const SelectedValueAddress = Template.bind({});
SelectedValueAddress.args = {
  metadata: {
    label: 'Custom address',
    key: 'contact_address_1fe',
  },
};

export const GoogleGeocode = Template.bind({});
GoogleGeocode.args = {
  googleToken: GOOGLE_GEOCODE_TOKEN,
};

export const Open = Template.bind({});
Open.args = {
  open: true,
}

export const AutoSave = Template.bind({});
AutoSave.args = {
  onchange: 'onAutoSave(event)',
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: [basicOptions[0]],
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
/*export const Saved = Template.bind({});
Saved.args = {
  value: [
    {
      id: '2',
      label: 'qui est esse',
    },
  ],
  options: basicOptions,
  saved: true,
};*/

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
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
};

import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-location-map.js';
import { FormDecorator } from '../../../stories-utils';

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
  title: 'Form/dt-location-map',
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
    name = 'field-name',
    label = 'Field Name',
    mapboxToken = MAPBOX_TOKEN,
    googleToken = GOOGLE_GEOCODE_TOKEN,
    placeholder,
    value,
    disabled = false,
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    onchange,
    open,
    slot,
    i18n,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-location-map
      name="${name}"
      label=${label}
      mapbox-token=${mapboxToken}
      google-token=${googleToken}
      placeholder="${placeholder}"
      value="${JSON.stringify(value)}"
      onchange="${onchange}"
      ?disabled=${disabled}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?loading="${loading}"
      ?saved="${saved}"
      .open="${open}"
      i18n="${JSON.stringify(i18n)}"
    >
      ${slot}
    </dt-location-map>
  `;
}

export const Empty = Template.bind({});
Empty.args = {};

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  // prettier-ignore
  slot: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: 'Custom Placeholder',
};

export const SelectedValueMaps = Template.bind({});
SelectedValueMaps.args = {
  value: [basicOptions[1], basicOptions[2]],
};

export const SelectedValueMixed = Template.bind({});
SelectedValueMixed.args = {
  value: [
    basicOptions[1],
    {
      label: 'Custom address',
      key: 'contact_addres_1fe',
    },
  ],
};

export const Open = Template.bind({});
Open.args = {
  value: [basicOptions[1], basicOptions[2]],
  open: true,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  value: [basicOptions[0]],
  onchange: 'onAutoSave(event)',
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: [basicOptions[0]],
  disabled: true,
};

export const BasicForm = Template.bind({});
BasicForm.decorators = [LocaleDecorator, FormDecorator];
BasicForm.args = {
  value: [basicOptions[0]],
};

/*export const Loading = Template.bind({});
Loading.args = {
  value: [
    {
      id: '2',
      label: 'qui est esse',
    },
  ],
  options: basicOptions,
  loading: true,
};
export const Saved = Template.bind({});
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

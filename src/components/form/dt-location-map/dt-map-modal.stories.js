import { html } from 'lit';
import {
  themes,
  themeCss,
  argTypes,
} from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';

import './dt-map-modal.js';

const MAPBOX_TOKEN = import.meta.env.VITE_STORYBOOK_MAPBOX_TOKEN;

export default {
  title: 'Form/dt-location-map/dt-map-modal',
  component: 'dt-map-modal',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    isOpen: {
      control: 'boolean',
      defaultValue: false,
    },

    ...argTypes,
  },
};

const Template = args => {
  const {
    mapboxToken = MAPBOX_TOKEN,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-map-modal
      ?isopen="${args.isOpen}"
      metadata="${JSON.stringify(args.metadata)}"
      mapbox-token="${mapboxToken}"
      center="${JSON.stringify(args.center)}"
    />
  `;
};

export const Default = Template.bind({});
Default.args = {
  metadata: {
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
};

export const OpenedModalWithLocation = Template.bind({});
OpenedModalWithLocation.args = {
  metadata: {
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
  isOpen: true,
};

export const OpenedModalEmpty = Template.bind({});
OpenedModalEmpty.args = {
  metadata: null,
  isOpen: true,
};

export const OpenedModalEmptyWithCenter = Template.bind({});
OpenedModalEmptyWithCenter.args = {
  metadata: null,
  isOpen: true,
  center: [
    -0.12768421957309783,
    51.50737858330203
  ]
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  metadata: {
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
  isOpen: true,
};

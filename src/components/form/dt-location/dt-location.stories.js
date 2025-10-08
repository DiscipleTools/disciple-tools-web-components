import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-location.js';

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
            post =>
              !query || post.title.includes(query) || post.id === query
          )
          .map(post => ({
            id: post.id.toString(),
            label: post.title,
          }))
      );
    });
}
export default {
  title: 'Components/Form/Location',
  component: 'dt-location',
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    allowAdd: { control: 'boolean' },
    ...argTypes,
  },
  args: {
    theme: 'default',
    placeholder: 'Search Locations',
    onChange: action('on-change'),
    onLoad: action('on-load'),
  },
};

function Template(args) {
  const {
    name = 'field-name',
    label = 'Field Name',
    mapboxKey,
    options,
    filters = defaultFilters,
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
    onChange,
    onLoad,
    allowAdd,
  } = args;
  return html`
    <dt-location
      name="${name}"
      label=${label}
      mapboxKey=${mapboxKey}
      placeholder="${placeholder}"
      options="${JSON.stringify(options)}"
      filters="${JSON.stringify(filters)}"
      value="${JSON.stringify(value)}"
      onchange="${onchange}"
      ?disabled=${disabled}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?allowAdd="${allowAdd}"
      ?loading="${loading}"
      ?saved="${saved}"
      .open="${open}"
      @change=${onChange}
      @dt:get-data=${onLoad}
    >
      ${slot}
    </dt-location>
  `;
}

export const Empty = Template.bind({});
Empty.args = {};

export const withMapboxKey = Template.bind({});
withMapboxKey.args = {
  mapboxKey: 'XXXXXXXXXXXXXXX',
};

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  // prettier-ignore
  slot: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
};

export const StaticOptions = Template.bind({});
StaticOptions.args = {
  options: basicOptions,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: 'Search Options',
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: [basicOptions[1]],
};

export const LoadOptionsFromAPI = Template.bind({});
LoadOptionsFromAPI.args = {
  'onLoad': onLoadEvent
};

export const AddNewOption = Template.bind({});
AddNewOption.args = {
  allowAdd: true,
  options: basicOptions,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  options: basicOptions,
  onchange: 'onAutoSave(event)',
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: [
    {
      id: '2',
      label: 'qui est esse',
    },
  ],
  options: basicOptions,
  disabled: true,
};

export const Loading = Template.bind({});
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
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
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
};

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
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
  const { field, query, onSuccess, onError } = event.detail;
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
  title: 'Form/dt-location',
  component: 'dt-location',
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
    options: {
      description:
        'Array of available options to choose.' +
        '<br/>**Format:** Array of objects with keys `id` and `label`. Convert to string with `JSON.stringify`. ',
      table: {
        type: {
          summary: '{id:string, label:string}[]',
          detail: `[{id:'1',label:'Item 1'},{id:'345',label:'Item 345'}]`,
        },
      },
    },
    placeholder: {
      control: 'text',
      description: 'String rendered as placeholder text',
    },
    allowAdd: {
      control: 'boolean',
      description:
        "(true|false) If attribute is present, new values can be added if they don't exist yet",
      table: {
        type: {
          summary: 'allowAdd',
          detail: '<dt-location allowAdd />',
        },
      },
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
    onLoad: {
      control: 'text',
      description:
        'Javascript code to be executed when the search value changes and data should be loaded from API.<br/>' +
        'Makes available a `event` variable that includes field name, search query, onSuccess event, and onError event in `event.details`',
      table: {
        type: {
          summary: 'onLoad(event)',
          detail: '<dt-location onload="onLoad(event)" />',
        },
      },
    },
    ...argTypes,
  },
  args: {
    theme: 'default',
    placeholder: 'Search Locations',
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
    onLoad,
    allowAdd,
    i18n,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
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
      @dt:get-data=${onLoad}
      i18n="${JSON.stringify(i18n)}"
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

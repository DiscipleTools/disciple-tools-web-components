import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-users-connection.js';

const basicOptions =[
    {
        label: "Bp",
        id: 2,
        avatar: "https:\/\/2.gravatar.com\/avatar\/2373ee570d59db06102d14feb50a4291?s=16&d=mm&r=g",
        contact_id: 10,
        status: "#4caf50",
    },
    {
        label: "root",
        id: 1,
        avatar: "https:\/\/0.gravatar.com\/avatar\/3f009d72559f51e7e454b16e5d0687a1?s=16&d=mm&r=g",
        contact_id: 6,
        update_needed: 0
    }
]
export default {
  title: 'Form/dt-users-connection',
  component: 'dt-users-connection',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    label: {
      control: 'text',
      type: { label: 'string', required: true },
      description:
        'Passed to `change` function to identify which input triggered the event',
    },
    value: {
      control: 'text',
      type: { label: 'array' },
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
          detail: '<dt-multi-select allowAdd />',
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
          detail: '<dt-multi-select loading />',
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
          detail: '<dt-multi-select saved />',
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
          detail: '<dt-multi-select onchange="onChange(event)" />',
        },
      },
    },
    onload: {
      control: 'text',
      description:
        'Javascript code to be executed when the search value changes and data should be loaded from API.<br/>' +
        'Makes available a `event` variable that includes field name, search query, onSuccess event, and onError event in `event.details`',
      table: {
        type: {
          summary: 'onLoad(event)',
          detail: '<dt-multi-select onload="onLoad(event)" />',
        },
      },
    },
    ...argTypes,
  },
  args: {
    placeholder: 'Select Connection',
    onload: 'onLoad(event)',
  },
};

function Template(args) {
  const {
    name = 'field-name',
    label = 'Field Name',
    options,
    placeholder,
    value,
    disabled = false,
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    error,
    onchange,
    onload,
    open,
    allowAdd,
    slot,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <script>
      function onLoad(event) {
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
                  id: post.id,
                }))
            );
          });
      }
    </script>
    <dt-users-connection
      name="${name}"
      label=${label}
      placeholder="${placeholder}"
      options="${JSON.stringify(options)}"
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
      error="${error}"
      .open="${open}"
    >
      ${slot}
    </dt-users-connection>
  `;
}

export const Empty = Template.bind({});
Empty.args = {
  onload: '',
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
  options: basicOptions,
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: [
    {
      name: "Bp",
      id: 2,
      avatar: "https:\/\/2.gravatar.com\/avatar\/2373ee570d59db06102d14feb50a4291?s=16&d=mm&r=g",
      contact_id: 10,
      status: "#4caf50",
      update_needed: 0
    },
  ],
  options: basicOptions,
};

export const OptionsOpen = Template.bind({});
OptionsOpen.args = {
  value: [basicOptions[0]],
  options: basicOptions,
  open: true,
};

export const LoadOptionsFromAPI = Template.bind({});
LoadOptionsFromAPI.args = {
  onload: 'onLoad(event)',
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
  value: [basicOptions[1]],
  options: basicOptions,
  disabled: true,
};
export const Loading = Template.bind({});
Loading.args = {
  value: [basicOptions[1]],
  options: basicOptions,
  loading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  value: [
    {
      name: "Bp",
        id: 2,
        avatar: "https:\/\/2.gravatar.com\/avatar\/2373ee570d59db06102d14feb50a4291?s=16&d=mm&r=g",
        contact_id: 10,
        status: "#4caf50",
        update_needed: 0
    },
  ],
  options: basicOptions,
  saved: true,
};
export const Error = Template.bind({});
Error.args = {
  value: [basicOptions[1]],
  options: basicOptions,
  error: 'Field is invalid',
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
      name: "Bp",
      id: 2,
      avatar: 'تنكر هؤلاء الرجال المفتونون',
      contact_id: 10,
      status: "#4caf50",
      update_needed: 0
  },
  {
    name: "root",
    id: 1,
    avatar: 'تنكر هؤلاء الرجال المفتونون',
    contact_id: 10,
    status: "#4caf50",
    update_needed: 0
},
  ],
};

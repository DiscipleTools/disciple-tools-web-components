import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { LocaleDecorator, FormDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-connection.js';

const basicOptions = [
  {
    id: 1,
    label: 'Option 1',
    link: '/#opt1',
    status: {
      key: 'active',
      label: 'Active',
      color: '#4CAF50',
    },
  },
  {
    id: 2,
    label: 'User 2',
    link: '/#opt2',
    user: true,
    status: {
      key: 'assigned',
      label: 'Waiting to be accepted',
      color: '#FF9800',
    },
  },
  {
    id: 3,
    label: 'Option 3',
    link: '/#opt3',
  },
  {
    id: 4,
    label: 'Option 4',
    link: '/#opt4',
  },
  {
    id: 5,
    label: 'Option 5',
    link: '/#opt5',
  },
  {
    id: 6,
    label: 'Option 6',
    link: '/#opt6',
  },
  {
    id: 7,
    label: 'Option 7',
    link: '/#opt7',
  },
  {
    id: 8,
    label: 'Option 8',
    link: '/#opt8',
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
            id: post.id,
            label: post.title,
          }))
      );
    });
}

export default {
  title: 'Components/Form/Connection',
  component: 'dt-connection',
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
    placeholder: 'Select Connection',
    onLoad: action('on-load'),
    onChange: action('on-change'),
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
    open,
    error,
    slot,
    allowAdd,
    onChange,
    onLoad,
  } = args;
  return html`
    <dt-connection
      name="${name}"
      label=${label}
      placeholder="${placeholder}"
      options="${JSON.stringify(options)}"
      value="${JSON.stringify(value)}"
      ?disabled=${disabled}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?allowAdd="${allowAdd}"
      ?loading="${loading}"
      ?saved="${saved}"
      .open="${open}"
      error="${error}"
      @change=${onChange}
      @dt:get-data=${onLoad}
    >
      ${slot}
    </dt-connection>
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
      id: 2,
      label: 'User 2',
      status: {
        key: 'active',
        label: 'Active',
        color: '#4CAF50',
      },
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
  onLoad: onLoadEvent,
};

export const AddNewOption = Template.bind({});
AddNewOption.args = {
  allowAdd: true,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  options: basicOptions,
  onChange: onAutoSave,
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
      id: 2,
      label: 'qui est esse',
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

export const basicForm = Template.bind({});
basicForm.decorators = [FormDecorator];
basicForm.args = {
  value: [basicOptions[1]],
  options: basicOptions,
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
      id: 1,
      label: 'تنكر هؤلاء الرجال المفتونون',
    },
  ],
  options: [
    {
      id: 1,
      label: 'تنكر هؤلاء الرجال المفتونون',
      link: '/#opt1',
      status: {
        key: 'active',
        label: 'نشيط',
        color: '#4CAF50',
      },
    },
    {
      id: 2,
      label: 'م فيتساوي مع هؤلاء',
      link: '/#opt2',
      user: true,
      status: {
        key: 'assigned',
        label: 'في انتظار قبولها',
        color: '#FF9800',
      },
    },
    {
      id: 3,
      label: 'فلا أحد يرفض',
      link: '/#opt3',
    },
  ],
};

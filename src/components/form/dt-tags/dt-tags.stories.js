import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { LocaleDecorator, FormDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-tags.js';

const basicOptions = [
  {
    id: 'Option 1',
    link: '/#opt1',
  },
  {
    id: 'Option 2',
    link: '/#opt2',
  },
  {
    id: 'Option 3',
    link: '/#opt3',
  },
  {
    id: 'Option 4',
    link: '/#opt4',
  },
  {
    id: 'Option 5',
    link: '/#opt5',
  },
  {
    id: 'Option 6',
    link: '/#opt6',
  },
  {
    id: 'Option 7',
    link: '/#opt7',
  },
  {
    id: 'Option 8',
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
            id: post.id.toString(),
            label: post.title,
          }))
      );
    });
}

export default {
  title: 'Components/Form/Tags',
  component: 'dt-tags',
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
    placeholder: 'Select Tags',
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
    slot,
    allowAdd,
    onChange,
    onLoad,
  } = args;
  return html`
    <dt-tags
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
      @change=${onChange}
      @dt:get-data=${onLoad}
    >
      ${slot}
    </dt-tags>
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
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: [basicOptions[1].id],
};

export const SelectedValueWithLabels = Template.bind({});
SelectedValueWithLabels.args = {
  value: ['opt1'],
  options: [{
    id: 'opt1',
    label: 'Option 1',
  }, {
    id: 'opt2',
    label: 'Option 2',
  }],
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
  allowAdd: true,
  options: basicOptions,
  onChange: onAutoSave,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: ['qui est esse'],
  options: basicOptions,
  disabled: true,
};
export const Loading = Template.bind({});
Loading.args = {
  value: ['qui est esse'],
  options: basicOptions,
  loading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  value: ['qui est esse'],
  options: basicOptions,
  saved: true,
};

export const basicForm = Template.bind({});
basicForm.decorators = [FormDecorator];
basicForm.args = {
  value: [basicOptions[0].id, basicOptions[1].id],
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
  value: ['تنكر هؤلاء الرجال المفتونون'],
  options: [
    {
      id: 'تنكر هؤلاء الرجال المفتونون',
    },
    {
      id: 'م فيتساوي مع هؤلاء',
    },
    {
      id: 'فلا أحد يرفض',
    },
  ],
};

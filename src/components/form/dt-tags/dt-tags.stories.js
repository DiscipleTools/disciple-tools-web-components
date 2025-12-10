import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  LocaleDecorator,
  FormDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
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
    id: 'opt8',
    label:
      'Long option that is too long to fit in the dropdown. It should be truncated with an ellipsis.',
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
            post => !query || post.title.includes(query) || post.id === query,
          )
          .map(post => ({
            id: post.id.toString(),
            label: post.title,
          })),
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
    onNew: action('on-new'),
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  render: args => {
    const {
      name = 'field-name',
      label = 'Field Name',
      options,
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
      open,
      slot,
      allowAdd,
      error,
      onChange,
      onLoad,
      onNew,
    } = args;
    return html`
      <dt-tags
        name="${name}"
        label=${label}
        placeholder="${placeholder}"
        options="${JSON.stringify(options)}"
        value="${JSON.stringify(value)}"
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage=${requiredMessage}
        icon="${icon}"
        iconAltText="${iconAltText}"
        ?private=${isPrivate}
        privateLabel="${privateLabel}"
        ?allowAdd="${allowAdd}"
        ?loading="${loading}"
        ?saved="${saved}"
        error="${ifDefined(error)}"
        .open="${open}"
        @change=${onChange}
        @dt:get-data=${onLoad}
        @dt:add-new=${onNew}
      >
        ${slot}
      </dt-tags>
    `;
  },
};

export const Empty = {
  args: {
    onload: '',
  },
};

export const SvgIcon = {
  args: {
    icon: null,
    slot: 'SvgIcon',
  },
};

export const StaticOptions = {
  args: {
    options: basicOptions,
  },
};

export const CustomPlaceholder = {
  args: {
    placeholder: 'Search Options',
  },
};

export const SelectedValue = {
  args: {
    value: [basicOptions[1].id],
  },
};

export const SelectedValueWithLabels = {
  args: {
    value: ['opt1'],
    options: [
      {
        id: 'opt1',
        label: 'Option 1',
      },
      {
        id: 'opt2',
        label: 'Option 2',
      },
    ],
  },
};
export const SmallWidth = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    value: ['opt8'],
    options: basicOptions,
  },
};

export const LoadOptionsFromAPI = {
  args: {
    onLoad: onLoadEvent,
  },
};

export const AddNewOption = {
  args: {
    allowAdd: true,
    options: basicOptions,
  },
};

export const AutoSave = {
  args: {
    allowAdd: true,
    options: basicOptions,
    onChange: onAutoSave,
  },
};

export const Disabled = {
  args: {
    value: ['qui est esse'],
    options: basicOptions,
    disabled: true,
  },
};
export const Loading = {
  args: {
    value: ['qui est esse'],
    options: basicOptions,
    loading: true,
  },
};
export const Saved = {
  args: {
    value: ['qui est esse'],
    options: basicOptions,
    saved: true,
  },
};

export const Error = {
  args: {
    allowAdd: true,
    options: basicOptions,
    error: 'Custom error message',
  },
};

export const basicForm = {
  decorators: [FormDecorator],
  args: {
    value: [basicOptions[0].id, basicOptions[1].id],
    options: basicOptions,
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
    requiredMessage: 'Custom error message',
    options: basicOptions,
  },
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
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
  },
};

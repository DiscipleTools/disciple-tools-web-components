import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-copy-text.js';
import '../../icons/dt-icon.js';

export default {
  title: 'Form/dt-copy-text',
  component: 'dt-copy-text',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'link'],
      defaultValue: 'text',
    },
    icon: { control: 'text' },
    isPrivate: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    onchange: { control: 'text' },
    ...argTypes,
  },
  tags: ['!dev', '!autodocs'], // excluding from Storybook for now until further need for this
};

function Template(args) {
  const {
    id = 'name',
    name = 'field-name',
    label = 'Field Name',
    value = '',
    disabled = false,
    required = false,
    requiredMessage = '',
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    onChange,
    slot,
    type,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-copy-text
      id=${id}
      name=${name}
      label=${label}
      value=${value}
      type=${type}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${requiredMessage}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?loading=${loading}
      ?saved=${saved}
      onchange=${onChange}
      .dir=${args.dir}
    >
      ${slot}
    </dt-copy-text>
  `;
}

export const Default = Template.bind({});
Default.decorators = [LocaleDecorator];
Default.args = {
  value: 'Lorem Ipsum',
};

export const RTL = Template.bind({});
RTL.decorators = [LocaleDecorator];
RTL.args = {
  value: 'اسم الإدخال',
  lang: 'ar',
  dir: 'rtl',
};

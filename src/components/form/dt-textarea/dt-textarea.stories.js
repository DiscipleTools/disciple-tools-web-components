import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-textarea.js';

export default {
  title: 'Components/Form/Textarea',
  component: 'dt-textarea',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    id: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    isPrivate: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
};

function Template(args) {
  const {
    id = 'name',
    name = 'field-name',
    label = 'Field Name',
    value = '',
    disabled,
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    isPrivate,
    loading,
    saved,
    onChange,
    slot,
  } = args;
  return html`
    <dt-textarea
      id=${id}
      name=${name}
      label=${label}
      ?disabled=${disabled}
      icon=${icon}
      ?private=${isPrivate}
      ?loading=${loading}
      ?saved=${saved}
      @change=${onChange}
      .value=${value}
    >
      ${slot}
    </dt-textarea>
  `;
}

export const Empty = Template.bind({});

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  slot: 'SvgIcon',
};

export const EnteredValue = Template.bind({});
EnteredValue.args = {
  value: 'Lorem Ipsum',
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  onChange: onAutoSave,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'Lorem Ipsum',
};

export const privateField = Template.bind({});
privateField.args = {
  isPrivate: true,
  value: 'Lorem Ipsum',
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  saved: true,
};
export const Error = Template.bind({});
Error.args = {
  error: 'Custom error message',
};

export const BasicForm = Template.bind({});
BasicForm.decorators = [FormDecorator];
BasicForm.args = {
  value: 'Lorem Ipsum',
};

export const required = Template.bind({});
required.args = {
  required: true,
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
  value: 'راد أن يشع',
};

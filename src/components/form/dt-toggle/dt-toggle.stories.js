import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-toggle.js';

export default {
  title: 'Form/dt-toggle',
  component: 'dt-toggle',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    hideIcons: { control: 'boolean' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    isPrivate: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    onchange: { control: 'text' },
    ...argTypes,
  },
};

function Template(args) {
  const {
    id = 'name',
    name = 'field-name',
    label = 'Field Name',
    disabled = false,
    checked = false,
    hideIcons = false,
    required = false,
    requiredMessage = '',
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    onchange,
    slot,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-toggle
      id=${id}
      name=${name}
      label=${label}
      ?checked=${checked}
      ?hideIcons=${hideIcons}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${requiredMessage}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?loading=${loading}
      ?saved=${saved}
      onchange=${onchange}
    >
      ${slot}
    </dt-toggle>
  `;
}

export const Default = Template.bind({});

export const ToggledOn = Template.bind({});
ToggledOn.args = {
  checked: true,
};
export const iconsHidden = Template.bind({});
iconsHidden.args = {
  hideIcons: true,
};
export const DisabledOff = Template.bind({});
DisabledOff.args = {
  disabled: true,
};
export const DisabledOn = Template.bind({});
DisabledOn.args = {
  checked: true,
  disabled: true,
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
  value: 'راد أن يشع',
};

export const LocalizeRTLOn = Template.bind({});
LocalizeRTLOn.decorators = [LocaleDecorator];
LocalizeRTLOn.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
  value: 'راد أن يشع',
  checked: true,
};

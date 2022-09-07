import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import './dt-toggle.js';

export default {
  title: 'Form/dt-toggle',
  component: 'dt-toggle',
  argTypes: {
    theme: { control: 'select', options: Object.keys(themes), defaultValue: 'default' },
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
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    onchange,
    slot,
    RTL,
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
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?loading=${loading}
      ?saved=${saved}
      ?rtl="${RTL}"
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

export const RTL = Template.bind({});
RTL.args = {
  RTL: true,
  label: 'اسم الإدخال',
  value: 'راد أن يشع',
};

export const RTLOn = Template.bind({});
RTLOn.args = {
  RTL: true,
  label: 'اسم الإدخال',
  value: 'راد أن يشع',
  checked: true,
};

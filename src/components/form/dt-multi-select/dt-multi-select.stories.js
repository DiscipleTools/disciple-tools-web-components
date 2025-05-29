import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import { LocaleDecorator, FormDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-multi-select.js';

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
export default {
  title: 'Components/Form/Multi Select',
  component: 'dt-multi-select',
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
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
    error,
    open,
    slot,
    onChange,
  } = args;
  return html`
    <dt-multi-select
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
      ?loading="${loading}"
      ?saved="${saved}"
      ?error="${ifDefined(error)}"
      .open="${open}"
      @change=${onChange}
    >
      ${slot}
    </dt-multi-select>
  `;
}

export const Empty = Template.bind({});

export const SvgIcon = Template.bind({});
SvgIcon.args = {
  icon: null,
  // prettier-ignore
  slot: html`<svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><linearGradient id="lg"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#c3c3c3"/></linearGradient><rect x="2" y="2" width="96" height="96" style="fill:url(#lg);stroke:#ffffff;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="monospace, sans-serif" fill="#ffffff">icon</text></svg>`,
};

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  options: basicOptions,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: 'Search Options',
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: ['opt2', 'opt3'],
  options: basicOptions,
};
export const OptionsWrap = Template.bind({});
OptionsWrap.args = {
  value: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6', 'opt7'],
  options: basicOptions,
};
export const OptionsOpen = Template.bind({});
OptionsOpen.args = {
  value: ['opt1'],
  options: basicOptions,
  open: true,
};
export const NoOptionsAvailable = Template.bind({});
NoOptionsAvailable.args = {
  value: ['opt1', 'opt2', 'opt3'],
  options: basicOptions.slice(0, 3),
  open: true,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  options: basicOptions,
  onChange: onAutoSave,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: ['opt2'],
  options: basicOptions,
  disabled: true,
};
export const Loading = Template.bind({});
Loading.args = {
  value: ['opt2'],
  options: basicOptions,
  loading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  value: ['opt2'],
  options: basicOptions,
  saved: true,
};
export const Error = Template.bind({});
Error.args = {
  error: 'Custom error message',
};

export const BasicForm = Template.bind({});
BasicForm.decorators = [FormDecorator];
BasicForm.args = {
  value: ['opt2'],
  options: basicOptions,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
  options: basicOptions,
}

export const RequiredCustomMessage = Template.bind({});
RequiredCustomMessage.args = {
  required: true,
  requiredMessage: 'Custom error message',
  options: basicOptions,
};


export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'اسم الإدخال',
  value: ['opt1'],
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
};

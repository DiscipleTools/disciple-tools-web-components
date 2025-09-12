import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator, FormDecorator, onAutoSave } from '../../../stories-utils.js';
import './dt-single-select.js';

const basicOptions = [
  {
    id: '',
    label: '',
  },
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
];
const colorOptions = [
  {
    id: 'opt1',
    label: 'Red',
    color: '#990000',
  },
  {
    id: 'opt2',
    label: 'Green',
    color: '#009900',
  },
  {
    id: 'opt3',
    label: 'Blue',
    color: '#000099',
  },
  {
    id: 'opt4',
    label: 'Pale Blue',
    color: '#aaaaff',
  },
];
export default {
  title: 'Components/Form/Single Select',
  component: 'dt-single-select',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    requiredMessage: { control: 'text' },
    icon: { control: 'text' },
    iconAltText: { control: 'text' },
    private: { control: 'boolean' },
    privateLabel: { control: 'text' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    error: { control: 'text' },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
  },
  render: (args) => {
    const {
      id = 'single-select',
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
      privateLabel,
      loading = false,
      saved = false,
      error,
      slot,
      onChange,
    } = args;
    return html`
      <dt-single-select
        id=${ifDefined(id)}
        name=${ifDefined(name)}
        label=${ifDefined(label)}
        placeholder=${ifDefined(placeholder)}
        options=${ifDefined(options ? JSON.stringify(options) : undefined)}
        value=${ifDefined(value)}
        ?disabled=${disabled}
        ?required=${required}
        requiredMessage=${ifDefined(requiredMessage)}
        icon=${ifDefined(icon)}
        iconAltText=${ifDefined(iconAltText)}
        ?private=${args.private}
        privateLabel=${ifDefined(privateLabel)}
        ?loading=${loading}
        ?saved=${saved}
        error=${ifDefined(error)}
        @change=${onChange}
      >
        ${slot}
      </dt-single-select>
    `;
  }
};

export const Empty = {};

export const SvgIcon = {
  args: {
    icon: null,
    slot: 'SvgIcon',
  }
};

export const CustomOptions = {
  args: {
    options: basicOptions,
  }
};

export const CustomPlaceholder = {
  args: {
    placeholder: '--Select--',
  }
};

export const SelectedValue = {
  args: {
    value: 'opt2',
    options: basicOptions,
  }
};

export const ColorChange = {
  args: {
    value: 'opt1',
    options: colorOptions,
  }
};

export const ColorChangeNotSelected = {
  args: {
    options: colorOptions,
  }
};

export const AutoSave = {
  args: {
    options: basicOptions,
    onChange: onAutoSave,
  }
};

export const Disabled = {
  args: {
    value: 'opt2',
    options: basicOptions,
    disabled: true,
  }
};

export const PrivateField = {
  args: {
    private: true,
    value: 'opt2',
    options: basicOptions,
    privateLabel: 'This is a custom tooltip',
  }
};

export const Loading = {
  args: {
    value: 'opt2',
    options: basicOptions,
    loading: true,
  }
};

export const Saved = {
  args: {
    value: 'opt2',
    options: basicOptions,
    saved: true,
  }
};

export const Error = {
  args: {
    error: 'Custom error message',
  }
};

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    value: 'opt2',
    options: basicOptions,
  }
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    required: true,
    options: basicOptions,
  }
};

export const RequiredCustomMessage = {
  decorators: [FormDecorator],
  args: {
    required: true,
    requiredMessage: 'Custom error message',
    options: basicOptions,
  }
};

export const LocalizeRTL = {
  decorators: [LocaleDecorator],
  args: {
    lang: 'ar',
    dir: 'rtl',
    label: 'اسم الإدخال',
    placeholder: 'حدد العلامات',
    saved: true,
    value: 'opt2',
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
  }
};

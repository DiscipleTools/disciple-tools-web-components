import { html } from 'lit-html';
import {
  themes,
  themeCss,
  argTypes,
  buttonContexts,
} from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';

import './dt-dropdown.js';

export default {
  title: 'Form/dt-dropdown',
  component: 'dt-dropdown',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    context: {
      control: 'select',
      options: ['primary', ...buttonContexts],
      defaultValue: 'primary',
    },
    label:{
      control:'select',
      options:['button'],
      default:'button',
    },
    ...argTypes,
  },
};

const Template = args => {
  const {options,buttonStyle} = args;

  return html`
    <style>
      ${themeCss(args)}
    </style>
     <dt-dropdown options=${JSON.stringify(options)} label=${args.label}>
      </dt-dropdown>


  `;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Action Items',
  options:[
    { label: 'Option 1', icon: '/assets/circle-square-triangle.svg?v=2', isModal: true },
    { label: 'Option 2', icon: '/assets/arrow-user.svg', isModal: true },
    { label: 'Option 3', icon: '/assets/trash.svg', isModal: false, href: 'https://www.google.com' },
  ],

};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];
LocalizeRTL.args = {
  lang: 'ar',
  dir: 'rtl',
  label: 'خطوات العمل',
  options:[
    { label: 'الخيار 1', icon: '/assets/circle-square-triangle.svg?v=2', isModal: true },
    { label: 'الخيار 2', icon: '/assets/arrow-user.svg', isModal: true },
    { label: 'الخيار 3', icon: '/assets/trash.svg', isModal: false, href: 'https://www.google.com' },
  ],
};

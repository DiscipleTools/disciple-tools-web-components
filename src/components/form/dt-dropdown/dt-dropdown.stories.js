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
  title: 'Form/dropdown',
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
  
     <dt-dropdown label=${args.label} options=${JSON.stringify(options)} selectedOptionLabel=${args.selectedOptionLabel} buttonStyle=${JSON.stringify(buttonStyle)}>
      </dt-dropdown>


  `;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  options:[
    { label: 'Option 1', icon: 'http://localhost/wp-vijender/wp-content/themes/disciple-tools-theme-next/dt-assets/images/circle-square-triangle.svg?v=2', isModal: true },
    { label: 'Option 2', icon: 'http://localhost/wp-vijender/wp-content/themes/disciple-tools-theme-next/dt-assets/images/arrow-user.svg', isModal: true },
    { label: 'Option 3', icon: 'http://localhost/wp-vijender/wp-content/themes/disciple-tools-theme-next/dt-assets/images/trash.svg', isModal: false, href: 'https://www.google.com' },
  ],
  selectedOptionLabel:'Action Items',
  buttonStyle: {
    padding: '8px',
    backgroundColor: '#00897B',
    color: 'white',
    borderRadius: '4px',
   border:'none',
  },
};
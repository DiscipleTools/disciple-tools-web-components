import { html } from 'lit-html';
import { FormDecorator, LocaleDecorator } from '../../../stories-utils.js';
import {
  themes,
  themeCss,
  argTypes,
  buttonContexts,
} from '../../../stories-theme.js';
import './dt-multiselect-button-group.js';

export default {
  title: 'Form/dt-multi-select-button-group',
  component: 'dt-multiselect-button-group',
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
    ...argTypes,
  },
};

const Template = args => {
  const { slot = '' } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-multiselect-buttons-group
      .context="${args.context}"
      type="${args.type}"
      ?outline="${args.outline}"
      ?rounded="${args.rounded}"
      .href="${args.href}"
      title="${args.title}"
      confirm="${args.confirm}"
     .value="${args.value}"
      .buttons="${args.buttons}"
    >
      ${slot}
    </dt-multiselect-buttons-group>
  `;
};

export const BasicGroup = Template.bind({});
BasicGroup.decorators = [LocaleDecorator, FormDecorator];
BasicGroup.args = {
  buttons: [
    {
      "Button 1": {
          "label": "Button 1",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      },
      "Button 2": {
          "label": "Button 2",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      },
      "Button 3": {
          "label": "Button 3",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      },
      "Button 4": {
          "label": "Button 4",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      }
    }
  ],
};


export const ButtonsSelected = Template.bind({});
ButtonsSelected.decorators = [LocaleDecorator, FormDecorator];
ButtonsSelected.args = {
  buttons: [
    {
      "Button 1": {
          "label": "Button 1",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      },
      "Button 2": {
          "label": "Button 2",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      },
      "Button 3": {
          "label": "Button 3",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      },
      "Button 4": {
          "label": "Button 4",
          "description": "",
          "icon": "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
      }
    }
  ],
  value: ["Button 1", "Button 2"]
};

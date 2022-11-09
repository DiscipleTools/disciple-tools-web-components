import { html } from 'lit';
import '../lit-extend.js';

export default {
  title: 'LitExtend',
  component: 'lit-extend',
  argTypes: {
    title: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

function Template({ name = 'myColor', label = 'Color Field', value }) {
  return html`
    <dt-color
      name=${name}
      label=${label}
      value=${value}
    ></dt-color>
  `;
}

export const Regular = Template.bind({});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'My label',
};

export const PresetValue = Template.bind({});
PresetValue.args = {
  value: '#ff0000',
};

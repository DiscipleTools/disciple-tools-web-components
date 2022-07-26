import { html } from 'lit';
import '../dt-text.js';

export default {
  title: 'dt-text',
  component: 'dt-text',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
  },
};

function Template({ id = 'name', value = 'Field Value', disabled = false, icon='https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }) {
  return html`
    <dt-text
      .id=${id}
      .value=${value}
      .disabled=${disabled}
      .icon=${icon}
    >
    </dt-text>
  `;
}

export const Regular = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

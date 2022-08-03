import { html } from 'lit';
import './dt-number.js';

export default {
  title: 'dt-number',
  component: 'dt-number',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    isPrivate: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    onchange: { control: 'text' },
  },
};

function Template({ id = 'name', name = 'field-name', label = 'Field Name' , value = '', disabled = false, min = undefined, max = undefined, icon='https://cdn-icons-png.flaticon.com/512/1077/1077114.png', isPrivate = false, loading = false, saved = false, onchange = 'onChange' }) {
  return html`
    <dt-number
      id=${id}
      name=${name}
      label=${label}
      .value=${value}
      .min=${min}
      .max=${max}
      ?disabled=${disabled}
      icon=${icon}
      ?private=${isPrivate}
      ?loading=${loading}
      ?saved=${saved}
      onchange=${onchange}
    >
    </dt-number>
  `;
}

export const Empty = Template.bind({});

export const EnteredValue = Template.bind({});
EnteredValue.args = {
  value: 7,
};

export const MinValue = Template.bind({});
MinValue.args = {
  min: 9,
};

export const MaxValue = Template.bind({});
MaxValue.args = {
  max: 10,
};

export const MinMaxValue = Template.bind({});
MinMaxValue.args = {
  min: 3,
  max: 7,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 12,
};

export const privateField = Template.bind({});
privateField.args = {
  isPrivate: true,
  value: 77,
};

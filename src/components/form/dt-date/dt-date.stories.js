import { html } from 'lit';
import './dt-date.js';

export default {
  title: 'dt-date',
  component: 'dt-date',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'number' },
    date: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    isPrivate: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    onchange: { control: 'text' },
  },
};

function Template({ id = 'name', name = 'field-name', label = 'Date Field' , value = '', timestamp = 0, disabled = false, icon='https://cdn-icons-png.flaticon.com/512/1077/1077114.png', isPrivate = false, loading = false, saved = false, onchange = 'onChange' }) {
  return html`
    <dt-date
      id=${id}
      name=${name}
      label=${label}
      value=${value}
      timestamp=${timestamp}
      ?disabled=${disabled}
      icon=${icon}
      ?private=${isPrivate}
      ?loading=${loading}
      ?saved=${saved}
      onchange=${onchange}
    >
    </dt-date>
  `;
}

export const Empty = Template.bind({});

export const EnteredPHPTimestamp = Template.bind({});
EnteredPHPTimestamp.args = {
  timestamp: 1468281600,
};

export const EnteredDateString = Template.bind({});
EnteredDateString.args = {
  value: '2020-01-01',
};

export const EnteredJSTimestamp = Template.bind({});
EnteredJSTimestamp.args = {
  timestamp: 1658361600000,
};

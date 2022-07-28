import { html } from 'lit';
import './dt-text.js';

export default {
  title: 'dt-text',
  component: 'dt-text',
  argTypes: {
    id: { control: 'text' },
    fieldName: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    privateField: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    onchange: { control: 'text' },
  },
};

function Template({ id = 'name', fieldName = 'Field Name' , value = '', disabled = false, icon='https://cdn-icons-png.flaticon.com/512/1077/1077114.png', privateField = false, loading = false, saved = false, onchange = 'onChange' }) {
  return html`
    <dt-text
      id=${id}
      fieldName=${fieldName}
      value=${value}
      .disabled=${disabled}
      icon=${icon}
      .privateField=${privateField}
      loading=${loading}
      saved=${saved}
      onchange=${onchange}
    >
    </dt-text>
  `;
}

export const Empty = Template.bind({});

export const EnteredValue = Template.bind({});
EnteredValue.args = {
  value: 'Lorem Ipsum',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'Lorem Ipsum',
};

export const privateField = Template.bind({});
privateField.args = {
  privateField: true,
  value: 'Lorem Ipsum',
};

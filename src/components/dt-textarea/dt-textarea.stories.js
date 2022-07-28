import { html } from 'lit';
import './dt-textarea.js';

export default {
  title: 'dt-textarea',
  component: 'dt-textarea',
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
  console.log(value);
  return html`
    <dt-textarea
      id=${id}
      fieldName=${fieldName}
      .disabled=${disabled}
      icon=${icon}
      privateField=${privateField}
      loading=${loading}
      saved=${saved}
      onchange=${onchange}
      value=${value}
    >
    </dt-textarea>
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

import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import './dt-toggle.js';

export default {
  title: 'dt-toggle',
  component: 'dt-toggle',
  argTypes: {
    theme: { control: 'select', options: Object.keys(themes), defaultValue: 'default' },
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    isPrivate: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    onchange: { control: 'text' },
    ...argTypes,
  },
};

function Template(args) {
  const {
    id = 'name',
    name = 'field-name',
    label = 'Field Name',
    disabled = false,
    checked = false,
    required = false,
    requiredMessage = '',
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    onchange,
    slot,
  } = args;
  return html`
    <style>
    ${themeCss(args)}
    </style>
    <dt-toggle
      id=${id}
      name=${name}
      label=${label}
      ?checked=${checked}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${requiredMessage}
      icon="${icon}"
      ?private=${isPrivate}
      privateLabel="${privateLabel}"
      ?loading=${loading}
      ?saved=${saved}
      onchange=${onchange}
    >
    ${slot}
    </dt-toggle>
  `;
}

export const Default = Template.bind({});

export const ToggledOn = Template.bind({});
ToggledOn.args = {
  checked: true,
}

const FormDecorator = (story) => html`<form onsubmit="onFormSubmit(event)">
    ${story()}

    <button type="submit">Submit</button>

    <pre><output></output></pre>
  </form>
  <script>
  function onFormSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const output = document.querySelector('output');

    const form = event.target;

    /** Get all of the form data */
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    output.innerHTML = JSON.stringify(data, null, 2);
  }
  </script>
`;

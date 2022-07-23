import { html } from 'lit';
import '../dt-single-select.js';

const basicOptions = [
  {
    id: 'opt1',
    label: 'Option 1',
  },
  {
    id: 'opt2',
    label: 'Option 2',
  },
  {
    id: 'opt3',
    label: 'Option 3',
  },
];
const colorOptions = [
  {
    id: 'opt1',
    label: 'Red',
    color: '#990000',
  },
  {
    id: 'opt2',
    label: 'Green',
    color: '#009900',
  },
  {
    id: 'opt3',
    label: 'Blue',
    color: '#000099',
  },
  {
    id: 'opt4',
    label: 'Pale Blue',
    color: '#aaaaff',
  },
];
export default {
  title: 'dt-single-select',
  component: 'dt-single-select',
  argTypes: {
    name: { control: 'text' },
    placeholderLabel: { control: 'text' },
    value: { control: 'text' },
    isLoading: { control: 'boolean' },
    isSaved: { control: 'boolean' },
    options: {
      type: 'select',
      labels: {
        empty: 'Empty',
        basic: 'Basic',
        color: 'Colors',
      },
      options: ['empty', 'basic', 'color'],
      mapping: {
        empty: [],
        basic: basicOptions,
        color: colorOptions,
      },
    },
  },
};

function Template({
  name = 'my-input',
  options,
  placeholderLabel,
  value,
  saveData,
  isLoading,
  isSaved,
}) {
  return html`
    <style>
      :root {
        --primary-color: #3f729b;
      }
    </style>
    <script>
      window.saveFakeData = function (field, value, onSuccess, onError) {
        console.log(field, value);
        setTimeout(function () {
          onSuccess();
        }, 1000);
      };
    </script>
    <dt-single-select
      name="${name}"
      placeholderLabel="${placeholderLabel}"
      options="${JSON.stringify(options)}"
      value="${value}"
      saveData="${saveData}"
      .isLoading="${isLoading}"
      .isSaved="${isSaved}"
    >
    </dt-single-select>
  `;
}

export const Empty = Template.bind({});

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  options: basicOptions,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholderLabel: '--Select--',
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: 'opt2',
  options: basicOptions,
};

export const ColorChange = Template.bind({});
ColorChange.args = {
  value: 'opt1',
  options: colorOptions,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  options: basicOptions,
  saveData: 'saveFakeData',
};

export const Loading = Template.bind({});
Loading.args = {
  value: 'opt2',
  options: basicOptions,
  isLoading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  value: 'opt2',
  options: basicOptions,
  isSaved: true,
};

import { html } from 'lit';
import '../dt-multi-select.js';

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
  {
    id: 'opt4',
    label: 'Option 4',
  },
  {
    id: 'opt5',
    label: 'Option 5',
  },
  {
    id: 'opt6',
    label: 'Option 6',
  },
  {
    id: 'opt7',
    label: 'Option 7',
  },
  {
    id: 'opt8',
    label: 'Option 8',
  },
];
export default {
  title: 'dt-multi-select',
  component: 'dt-multi-select',
  argTypes: {
    name: { control: 'text' },
    placeholderLabel: { control: 'text' },
    isLoading: { control: 'boolean' },
    isSaved: { control: 'boolean' },
  },
};

function Template({
  name = 'my-input',
  options,
  placeholderLabel,
  value,
  onChange,
  isLoading,
  isSaved,
  open,
}) {
  return html`
    <style>
      :root {
        --primary-color: #3f729b;
      }
    </style>
    <script>
      function onChange(event) {
        if (event?.target) {
          event.target.setAttribute('loading', true);
          console.log(
            'Value changed from ' +
              JSON.stringify(event.detail.oldValue) +
              ' to ' +
              JSON.stringify(event.detail.newValue)
          );
          setTimeout(function () {
            event.target.removeAttribute('loading');
            event.target.setAttribute('saved', true);
          }, 1000);
        }
      }
    </script>
    <dt-multi-select
      name="${name}"
      placeholderLabel="${placeholderLabel}"
      options="${JSON.stringify(options)}"
      value="${JSON.stringify(value)}"
      onchange="${onChange}"
      ?loading="${isLoading}"
      ?saved="${isSaved}"
      .open="${open}"
    >
    </dt-multi-select>
  `;
}

export const Empty = Template.bind({});

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  options: basicOptions,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholderLabel: 'Search Options',
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: ['opt2', 'opt3'],
  options: basicOptions,
};
export const OptionsWrap = Template.bind({});
OptionsWrap.args = {
  value: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6', 'opt7'],
  options: basicOptions,
};
export const OptionsOpen = Template.bind({});
OptionsOpen.args = {
  value: ['opt1'],
  options: basicOptions,
  open: true,
};
export const NoOptionsAvailable = Template.bind({});
NoOptionsAvailable.args = {
  value: ['opt1', 'opt2', 'opt3'],
  options: basicOptions.slice(0, 3),
  open: true,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  options: basicOptions,
  onChange: 'onChange(event)',
};

export const Loading = Template.bind({});
Loading.args = {
  value: ['opt2'],
  options: basicOptions,
  isLoading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  value: ['opt2'],
  options: basicOptions,
  isSaved: true,
};

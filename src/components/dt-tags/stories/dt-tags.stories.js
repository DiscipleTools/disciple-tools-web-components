import { html } from 'lit';
import { themeCss } from '../../../stories-theme.js';
import '../dt-tags.js';

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
  title: 'dt-tags',
  component: 'dt-tags',
  argTypes: {
    name: { control: 'text' },
    placeholderLabel: { control: 'text' },
    isLoading: { control: 'boolean' },
    isSaved: { control: 'boolean' },
  },
  args: {
    placeholderLabel: 'Select Tags',
    onLoad: 'onLoad(event)',
  },
};

function Template(args) {
  const {
    name = 'my-input',
    options,
    placeholderLabel,
    value,
    onChange,
    onLoad,
    allowAdd,
    isLoading,
    isSaved,
    open,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
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
      function onLoad(event) {
        console.log('fetching data', event);
        const { field, query, onSuccess, onError } = event.detail;
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then(json => {
            onSuccess(
              json
                .filter(
                  post =>
                    !query || post.title.includes(query) || post.id === query
                )
                .map(post => ({
                  id: post.id.toString(),
                  label: post.title,
                }))
            );
          });
      }
    </script>
    <dt-tags
      name="${name}"
      placeholderLabel="${placeholderLabel}"
      options="${JSON.stringify(options)}"
      value="${JSON.stringify(value)}"
      onchange="${onChange}"
      onload="${onLoad}"
      ?allowAdd="${allowAdd}"
      ?loading="${isLoading}"
      ?saved="${isSaved}"
      .open="${open}"
    >
    </dt-tags>
  `;
}

export const Empty = Template.bind({});
Empty.args = {
  onLoad: '',
};

export const StaticOptions = Template.bind({});
StaticOptions.args = {
  options: basicOptions,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholderLabel: 'Search Options',
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: [
    {
      id: '2',
      label: 'qui est esse',
    },
  ],
};

export const LoadOptionsFromAPI = Template.bind({});
LoadOptionsFromAPI.args = {
  onLoad: 'onLoad(event)',
};

export const AddNewOption = Template.bind({});
AddNewOption.args = {
  allowAdd: true,
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  options: basicOptions,
  onChange: 'onChange(event)',
};

export const Loading = Template.bind({});
Loading.args = {
  value: [
    {
      id: '2',
      label: 'qui est esse',
    },
  ],
  options: basicOptions,
  isLoading: true,
};
export const Saved = Template.bind({});
Saved.args = {
  value: [
    {
      id: '2',
      label: 'qui est esse',
    },
  ],
  options: basicOptions,
  isSaved: true,
};

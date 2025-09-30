import { html } from 'lit';
import { argTypes } from '../stories-theme.js';

import './layout/dt-tile/dt-tile.js';
import './form/dt-label/dt-label.js';
import './form/dt-text/dt-text.js';
import './form/dt-textarea/dt-textarea.js';
import './form/dt-number/dt-number.js';
import './form/dt-date/dt-date.js';
import './form/dt-datetime/dt-datetime.js';
import './form/dt-multi-select/dt-multi-select.js';
import './form/dt-multi-select-button-group/dt-multi-select-button-group.js';
import './form/dt-multi-text/dt-multi-text.js';
import './form/dt-single-select/dt-single-select.js';
import './form/dt-tags/dt-tags.js';
import './form/dt-connection/dt-connection.js';
import './form/dt-dropdown/dt-dropdown.js';
import './form/dt-users-connection/dt-users-connection.js';

const options = [
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
];
const tags = [
  {
    id: 'personal',
    label: 'Personal',
  },
  {
    id: 'web',
    label: 'Web',
  },
  {
    id: 'facebook',
    label: 'Facebook',
  },
];
const posts = [
  {
    id: '1',
    label: 'John Doe',
  },
  {
    id: '2',
    label: 'Jane Smith',
    user: true,
  },
  {
    id: '3',
    label: 'Trevor Virtue',
    user: true,
  },
  {
    id: '4',
    label: 'Jane Meldrum',
  },
];

export default {
  title: 'Components/All',
  argTypes,
  tags: ['!autodocs'],
  render: args => html`
    <dt-tile
      title="Kitchen Sink Tile"
      expands: true,
    >
      <dt-text
        id='textField'
        name='textField'
        value=''
        label="Text Field"
        ?disabled=${args.disabled}
      ></dt-text>

      <dt-textarea
        id='textareaField'
        name='textareaField'
        value=''
        label="Textarea Field"
        ?disabled=${args.disabled}
      ></dt-textarea>

      <dt-number
        id='numberField'
        name='numberField'
        label="Number Field"
        ?disabled=${args.disabled}
      ></dt-number>

      <dt-multi-text
        id="multiTextField"
        name="multiTextField"
        label="MultiText Field"
        ?disabled=${args.disabled}
      ></dt-multi-text>

      <dt-date
        id="dateField"
        name="dateField"
        label="Date Field"
        ?disabled=${args.disabled}
      ></dt-date>

      <dt-datetime
        id="dateTimeField"
        name="dateTimeField"
        label="Date Time Field"
        ?disabled=${args.disabled}
      ></dt-datetime>

      <dt-single-select
        label="Single Select Field"
        placeholder="Select Item"
        value="opt1"
        options="${JSON.stringify(options)}"
        ?disabled=${args.disabled}
      ></dt-single-select>

      <dt-multi-select
        label="Multi Select Field"
        placeholder="Select Items"
        value="${JSON.stringify(options.slice(0, 2).map(o => o.id))}"
        options="${JSON.stringify(options)}"
        ?disabled=${args.disabled}
      ></dt-multi-select>

      <dt-multi-select-button-group
        label="Multi Select Buttons"
        placeholder="Select Buttons"
        value="${JSON.stringify(options.slice(0, 2).map(o => o.id))}"
        options="${JSON.stringify(options)}"
        ?disabled=${args.disabled}
      ></dt-multi-select-button-group>

      <dt-tags
        label="Tags Field"
        value="${JSON.stringify(['personal'])}"
        options="${JSON.stringify(tags)}"
        ?disabled=${args.disabled}
      ></dt-tags>

      <dt-connection
        label="Connection Field"
        options="${JSON.stringify(posts)}"
        ?disabled=${args.disabled}
      ></dt-connection>

       <dt-button
         id="buttonField"
         name="buttonField"
         label="Button"
         context="primary"
         ?disabled=${args.disabled}
       >Click Me</dt-button>
    </dt-tile>
  `,
};

export const Components = {};

export const Disabled = {
  args: {
    disabled: true,
  },
};

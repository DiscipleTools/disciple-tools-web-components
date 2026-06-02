import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { argTypes } from '../stories-theme.js';
import sampleImage from '../../assets/dt-caret.png';

import './layout/dt-tile/dt-tile.js';
import './form/dt-label/dt-label.js';
import './form/dt-text/dt-text.js';
import './form/dt-textarea/dt-textarea.js';
import './form/dt-number/dt-number.js';
import './form/dt-date/dt-date.js';
import './form/dt-datetime/dt-datetime.js';
import './form/dt-toggle/dt-toggle.js';
import './form/dt-location/dt-location.js';
import './form/dt-location-map/dt-location-map.js';
import './form/dt-multi-select/dt-multi-select.js';
import './form/dt-multi-select-button-group/dt-multi-select-button-group.js';
import './form/dt-multi-text/dt-multi-text.js';
import './form/dt-multi-text-groups/dt-multi-text-groups.js'
import './form/dt-single-select/dt-single-select.js';
import './form/dt-tags/dt-tags.js';
import './form/dt-connection/dt-connection.js';
import './form/dt-users-connection/dt-users-connection.js';
import './form/dt-file-upload/dt-file-upload.js';

// Sample image used for Storybook previews (local asset).
const SAMPLE_IMAGE_URL = sampleImage;
const SAMPLE_THUMBNAIL_URL = sampleImage;

const options = [
  {
    id: 'opt1',
    label: 'Option 1',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
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
const locationFilters = [
  {
    id: 'focus',
    label: 'Region of Focus',
  },
  {
    id: 'all',
    label: 'All Locations',
  },
];
const groups = [
  {
    id: 'one',
    label: 'Group 1',
  },
  {
    id: 'two',
    label: 'Group 2',
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
        value='Lorem Ipsum'
        label="Text Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-text>

      <dt-textarea
        id='textareaField'
        name='textareaField'
        value='Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, at condimentum nisl.'
        label="Textarea Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-textarea>

      <dt-number
        id='numberField'
        name='numberField'
        value=42
        label="Number Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-number>

      <dt-multi-text
        id="multiTextField"
        name="multiTextField"
        value="${JSON.stringify([
          {
            value: 'email@test.com',
            key: 'comm_channel_1',
          },
          {
            value: 'example@example.com',
            key: 'comm_channel_2',
          },
        ])}"
        type="email"
        label="MultiText Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-multi-text>

      <dt-multi-text-groups
        id="multiTextGroupsField"
        name="multiTextGroupsField"
        value="${JSON.stringify([
          {
            value: 'Lorem Ipsum',
            key: 'comm_channel_1',
            group: 'one'
          },
          {
            value: 'Lorem Ipsum',
            key: 'comm_channel_2',
            group: 'two'
          },
          {
            value: 'Lorem Ipsum2',
            key: 'comm_channel_3',
            group: 'two'
          }
        ])}"
        label="MultiText Groups Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
        .groups=${groups}
      ></dt-multi-text-groups>

      <dt-date
        id="dateField"
        name="dateField"
        value="2020-01-01"
        label="Date Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-date>

      <dt-datetime
        id="dateTimeField"
        name="dateTimeField"
        value="2023-07-21T17:00"
        label="Date Time Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-datetime>

      <dt-toggle
        id="toggleField"
        name="toggleField"
        label="Boolean Field"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-toggle>

      <dt-single-select
        label="Single Select Field"
        placeholder="Select Item"
        value="opt1"
        options="${JSON.stringify(options)}"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-single-select>

      <dt-multi-select
        label="Multi Select Field"
        placeholder="Select Items"
        value="${JSON.stringify(options.slice(0, 2).map(o => o.id))}"
        options="${JSON.stringify(options)}"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-multi-select>

      <dt-multi-select-button-group
        label="Multi Select Buttons"
        placeholder="Select Buttons"
        value="${JSON.stringify(options.slice(0, 2).map(o => o.id))}"
        options="${JSON.stringify(options)}"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-multi-select-button-group>

      <dt-tags
        label="Tags Field"
        value="${JSON.stringify(['personal'])}"
        options="${JSON.stringify(tags)}"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-tags>

      <dt-connection
        label="Connection Field"
        options="${JSON.stringify(posts)}"
        value="${JSON.stringify([
          {
            id: 2,
            label: 'User 2',
            link: '/#opt2',
            user: true,
            status: {
              key: 'assigned',
              label: 'Waiting to be accepted',
              color: '#FF9800'
            }
          },
          {
            id: 2,
            label: 'test'
          }
        ])}"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-connection>

      <dt-location
        label="Location Field"
        options="${JSON.stringify(posts)}"
        value="${JSON.stringify([{
          id: '1',
          label: 'John Doe',
        }])}"
        filters="${JSON.stringify(locationFilters)}"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-location>

      <dt-location-map
        label="Location Meta Field"
        options="${JSON.stringify(posts)}"
        value="${JSON.stringify([{
          grid_meta_id: '65',
          post_id: '43',
          post_type: 'contacts',
          postmeta_id_location_grid: '1671',
          grid_id: '100366112',
          lng: '-73.9866',
          lat: '40.7306',
          level: 'place',
          source: 'user',
          label: 'New York, New York, United States',
        }])}"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-location-map>

      <dt-file-upload
        label="File Upload Field"
        name="fileUploadField"
        value=${JSON.stringify([{
          key: 'site_id/prefix_randomstring1.jpg',
          name: 'photo1.jpg',
          type: 'image/jpeg',
          size: 123456,
          thumbnail_url: SAMPLE_THUMBNAIL_URL,
          url: SAMPLE_IMAGE_URL,
        }])}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        error="${ifDefined(args.error)}"
      ></dt-file-upload>

       <dt-button
         id="buttonField"
         name="buttonField"
         label="Button"
         context="primary"
         ?disabled=${args.disabled}
         ?readonly=${args.readonly}
         error="${ifDefined(args.error)}"
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

export const ReadOnly = {
  args: {
    readonly: true,
  },
};

export const Error = {
  args: {
    error: 'Custom error message',
  },
};

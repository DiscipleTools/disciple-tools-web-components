import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator } from '../../../stories-utils.js';
import './dt-church-health-circle.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';

const ChurchHealthEmptyGroup = {
  ID: '1',
  post_title: 'Empty Group',
  post_type: 'groups',
  post_date: { timestamp: 1667920392, formatted: '2022-11-08' },
  coaches: [],
  members: [],
  leaders: [],
  parent_groups: [
    {
      ID: '19',
      post_type: 'groups',
      post_date_gmt: '2022-10-07 19:15:18',
      post_date: '2022-10-07 19:15:18',
      post_title: 'Christ Church',
      permalink: 'https://test.local/?p=19',
      status: {
        key: 'active',
        label: 'Active',
        color: '#4CAF50',
      },
    },
  ],
  peer_groups: [],
  child_groups: [],
  people_groups: [],
  meetings: [],
  contacts: [],
  prayer_request: [],
  group_status: {
    key: 'active',
    label: 'Active',
  },
  last_modified: {
    timestamp: 1669701376,
    formatted: '2022-11-29',
  },
  group_type: {
    key: 'pre-group',
    label: 'Pre-Group',
  },
  start_date: {
    timestamp: 1667920392,
    formatted: '2022-11-08',
  },
  assigned_to: {
    id: '1',
    type: 'user',
    display: 'micahmills',
    'assigned-to': 'user-1',
  },
  health_metrics: [],
  leader_count: 4,
  member_count: 2,
  permalink: 'https://test.local/groups/239',
  name: 'Home Church',
};

const options = {
  church_baptism: {
    label: 'Baptism',
    description: 'The group is baptising.',
    icon: '/groups/baptism-2.svg',
  },
  church_bible: {
    label: 'Bible Study',
    description: 'The group is studying the bible.',
    icon: '/groups/word-2.svg',
  },
  church_communion: {
    label: 'Communion',
    description: 'The group is practicing communion.',
    icon: '/groups/communion-2.svg',
  },
  church_fellowship: {
    label: 'Fellowship',
    description: 'The group is fellowshiping.',
    icon: '/groups/heart-2.svg',
  },
  church_giving: {
    label: 'Giving',
    description: 'The group is giving.',
    icon: '/groups/giving-2.svg',
  },
  church_prayer: {
    label: 'Prayer',
    description: 'The group is praying.',
    icon: '/groups/prayer-2.svg',
  },
  church_praise: {
    label: 'Praise',
    description: 'The group is praising.',
    icon: '/groups/praise-2.svg',
  },
  church_sharing: {
    label: 'Sharing the Gospel',
    description: 'The group is sharing the gospel.',
    icon: '/groups/evangelism-2.svg',
  },
  church_leaders: {
    label: 'Leaders',
    description: 'The group has leaders.',
    icon: '/groups/leadership-2.svg',
  },
  custom_img: {
    label: 'Custom Image',
    description: 'The group has a custom image.',
    icon: '/dt-caret.png',
  },
  custom_icon: {
    label: 'Custom Icon',
    description: 'The group has a custom icon.',
    icon: null,
    'font-icon': 'mdi mdi-ab-testing',
  },
  church_commitment: {
    label: 'Church Commitment',
    description: 'The group has committed to be church.',
    icon: '/groups/covenant.svg',
  },
};

export default {
  title: 'Components/Form/Church Health Circle',
  component: 'dt-church-health-circle',
  argTypes: {
    name: { control: 'text' },
    options: { control: 'object' },
    value: { control: 'object' },
    width: { control: 'number' },
    missingIcon: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    error: { control: 'text' },
    slot: { control: 'text' },
    onChange: { action: 'on-change' },
    ...argTypes,
  },
  args: {
    name: 'church-health',
    options,
    width: 300,
    value: [],
    missingIcon: '/groups/missing.svg',
    disabled: false,
    loading: false,
    saved: false,
    error: '',
    onChange: action('on-change'),
  },
  render: args => {
    return html`
      <div style="width: ${ifDefined(args.width)}px;">
        <dt-church-health-circle
          name="${ifDefined(args.name)}"
          .value="${args.value}"
          .options="${args.options}"
          missingIcon="${ifDefined(args.missingIcon)}"
          ?disabled=${args.disabled}
          ?loading="${args.loading}"
          ?saved="${args.saved}"
          error="${ifDefined(args.error)}"
          @change=${args.onChange}
        >
          ${args.slot}
        </dt-church-health-circle>
      </div>
    `;
  },
};

export const Empty = {};

export const MissingIcon = {
  args: {
    options: {
      ...options,
      extra: {
        label: 'Extra missing',
      },
    },
  },
};

export const Incomplete = {
  args: {
    value: ['church_bible', 'church_praise', 'church_prayer', 'church_giving'],
  },
};

export const Filled = {
  args: {
    value: Object.keys(options),
  },
};

export const WidthMedium = {
  args: {
    width: 500,
    value: ['church_bible'],
  },
};
export const WidthLarge = {
  args: {
    width: 800,
    value: ['church_bible'],
  },
};

export const Disabled = {
  args: {
    value: ['church_bible'],
    disabled: true,
  },
};

export const PrivateField = {
  args: {
    private: true,
    privateLabel: 'This is a private field',
    value: ['church_bible'],
  },
};

export const Loading = {
  args: {
    value: ['church_bible'],
    loading: true,
  },
};

export const Saved = {
  args: {
    value: ['church_bible'],
    saved: true,
  },
};
export const Error = {
  args: {
    error: 'Custom error message',
  },
};

export const ErrorSlot = {
  args: {
    slot: 'ErrorSlot',
    error: '[Should show link here]',
  },
};

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    value: ['church_bible'],
  },
};

export const Required = {
  decorators: [FormDecorator],
  args: {
    required: true,
  },
};

export const RequiredCustomMessage = {
  decorators: [FormDecorator],
  args: {
    required: true,
    requiredMessage: 'Custom required message',
  },
};
/*
export const ApiSettings = {
  args: {
    value: [
      'church_bible',
      'church_praise',
      'church_prayer',
      'church_giving',
    ],
    settings: null,
  },
};*/
/*
export const ApiGroup = {
  args: {
    groupId: 3,
    group: null,
  },
};*/

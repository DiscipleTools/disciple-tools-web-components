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
    icon: '/assets/groups/baptism-2.svg',
  },
  church_bible: {
    label: 'Bible Study',
    description: 'The group is studying the bible.',
    icon: '/assets/groups/word-2.svg',
  },
  church_communion: {
    label: 'Communion',
    description: 'The group is practicing communion.',
    icon: '/assets/groups/communion-2.svg',
  },
  church_fellowship: {
    label: 'Fellowship',
    description: 'The group is fellowshiping.',
    icon: '/assets/groups/heart-2.svg',
  },
  church_giving: {
    label: 'Giving',
    description: 'The group is giving.',
    icon: '/assets/groups/giving-2.svg',
  },
  church_prayer: {
    label: 'Prayer',
    description: 'The group is praying.',
    icon: '/assets/groups/prayer-2.svg',
  },
  church_praise: {
    label: 'Praise',
    description: 'The group is praising.',
    icon: '/assets/groups/praise-2.svg',
  },
  church_sharing: {
    label: 'Sharing the Gospel',
    description: 'The group is sharing the gospel.',
    icon: '/assets/groups/evangelism-2.svg',
  },
  church_leaders: {
    label: 'Leaders',
    description: 'The group has leaders.',
    icon: '/assets/groups/leadership-2.svg',
  },
  church_commitment: {
    label: 'Church Commitment',
    description: 'The group has committed to be church.',
    icon: '/assets/groups/covenant.svg',
  },
};

export default {
  title: 'Components/Form/Church Health Circle',
  component: 'dt-church-health-circle',
  args: {
    name: 'church-health',
    options,
    width: 300,
    onChange: action('on-change'),
  },
  render: args => {
    return html`
      <div style="width: ${args.width}px;">
        <dt-church-health-circle
          name="${args.name}"
          value="${JSON.stringify(args.value)}"
          options="${JSON.stringify(args.options)}"
          missingIcon="/assets/groups/missing.svg"
          ?loading="${args.loading}"
          ?saved="${args.saved}"
          error="${ifDefined(args.error)}"
          @change=${args.onChange}
        ></dt-church-health-circle>
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
    value: [
      'church_bible',
      'church_praise',
      'church_prayer',
      'church_giving',
      'church_leaders',
      'church_sharing',
      'church_baptism',
      'church_fellowship',
      'church_commitment',
    ],
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

export const BasicForm = {
  decorators: [FormDecorator],
  args: {
    value: ['church_bible'],
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

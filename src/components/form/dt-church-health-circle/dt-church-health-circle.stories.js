import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { LocaleDecorator } from '../../../stories-utils.js';
import './dt-church-health-circle.js';

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
const ChurchHealthIncompleteGroup = {
  ID: '2',
  post_title: 'Completed Group',
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
  health_metrics: [
    'church_bible',
    'church_praise',
    'church_prayer',
    'church_giving',
  ],
  leader_count: 4,
  member_count: 2,
  permalink: 'https://test.local/groups/239',
  name: 'Home Church',
};
const ChurchHealthCompleteGroup = {
  ID: '2',
  post_title: 'Completed Group',
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
  health_metrics: [
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
  leader_count: 4,
  member_count: 2,
  permalink: 'https://test.local/groups/239',
  name: 'Home Church',
};

const healthMetrics = {
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
  title: 'Form/dt-church-health-circle',
  component: 'dt-church-health-circle',
  args: {
    group: ChurchHealthEmptyGroup,
    settings: healthMetrics,
    handleSave: (groupId, updatedValue) => {
      console.log(groupId, updatedValue);
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },

    ...argTypes,
  },
};

function Template(args) {
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-church-health-circle
      .group=${args.group}
      .settings=${args.settings}
      groupId="${args.groupId}"
      apiRoot="/wp-json"
      missingIcon="/assets/groups/missing.svg"
      .handleSave=${args.handleSave}
    ></dt-church-health-circle>
  `;
}

export const Empty = Template.bind({});
Empty.args = {
  group: ChurchHealthEmptyGroup,
};
export const Incomplete = Template.bind({});
Incomplete.args = {
  group: ChurchHealthIncompleteGroup,
};
export const Filled = Template.bind({});
Filled.args = {
  group: ChurchHealthCompleteGroup,
};

export const ApiSettings = Template.bind({});
ApiSettings.args = {
  group: ChurchHealthIncompleteGroup,
  settings: null,
};

export const ApiGroup = Template.bind({});
ApiGroup.args = {
  groupId: 3,
  group: null,
};

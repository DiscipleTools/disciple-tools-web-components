import { html } from 'lit';
import { themes, themeCss, argTypes } from '../../../stories-theme.js';
import { FormDecorator, LocaleDecorator } from '../../../stories-utils.js';
import './dt-church-health-circle.js';

const FilledGroup = {
  "ID":"239",
  "post_title":"Home Church 2",
  "post_type":"groups",
  "post_date":{"timestamp":1667920392,"formatted":"2022-11-08"},"coaches":[],
  "members":[],
  "leaders":[],
  "parent_groups":[
      {"ID":"19",
      "post_type":"groups",
      "post_date_gmt":"2022-10-07 19:15:18",
      "post_date":"2022-10-07 19:15:18",
      "post_title":"Christ Church",
      "permalink":"https://test.local/?p=19",
      "status":{
          "key":"active",
          "label":"Active",
          "color":"#4CAF50"
      }
      }
  ],
  "peer_groups":[],
  "child_groups":[],
  "people_groups":[],
  "meetings":[],
  "contacts":[],
  "prayer_request":[],
  "group_status":{
      "key":"active",
      "label":"Active"
  },
  "last_modified":{
      "timestamp":1669701376,
      "formatted":"2022-11-29"
  },
  "group_type":{
      "key":"pre-group",
      "label":"Pre-Group"
  },
  "start_date":{
      "timestamp":1667920392,
      "formatted":"2022-11-08"
  },
  "assigned_to":{
      "id":"1",
      "type":"user",
      "display":"micahmills",
      "assigned-to":"user-1"
  },
  "health_metrics":[
      "church_bible",
      "church_praise",
      "church_prayer",
      "church_giving",
      "church_leaders",
      "church_sharing",
      "church_baptism",
      "church_fellowship"
  ],
  "leader_count":4,
  "member_count":2,
  "permalink":"https://test.local/groups/239",
  "name":"Home Church"
}

const NoFilledGroup = {
  "ID":"239",
  "post_title":"Home Church 2",
  "post_type":"groups",
  "post_date":{"timestamp":1667920392,"formatted":"2022-11-08"},"coaches":[],
  "members":[],
  "leaders":[],
  "parent_groups":[
      {"ID":"19",
      "post_type":"groups",
      "post_date_gmt":"2022-10-07 19:15:18",
      "post_date":"2022-10-07 19:15:18",
      "post_title":"Christ Church",
      "permalink":"https://test.local/?p=19",
      "status":{
          "key":"active",
          "label":"Active",
          "color":"#4CAF50"
      }
      }
  ],
  "peer_groups":[],
  "child_groups":[],
  "people_groups":[],
  "meetings":[],
  "contacts":[],
  "prayer_request":[],
  "group_status":{
      "key":"active",
      "label":"Active"
  },
  "last_modified":{
      "timestamp":1669701376,
      "formatted":"2022-11-29"
  },
  "group_type":{
      "key":"pre-group",
      "label":"Pre-Group"
  },
  "start_date":{
      "timestamp":1667920392,
      "formatted":"2022-11-08"
  },
  "assigned_to":{
      "id":"1",
      "type":"user",
      "display":"micahmills",
      "assigned-to":"user-1"
  },
  "health_metrics":[
  ],
  "leader_count":4,
  "member_count":2,
  "permalink":"https://test.local/groups/239",
  "name":"Home Church"
}

const healthMetrics = {
  "church_baptism":{
      "label":"Baptism",
      "description":"The group is baptising.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/baptism-2.svg"},
  "church_bible":{
      "label":"Bible Study",
      "description":"The group is studying the bible.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/word-2.svg"
  },
  "church_communion":{
      "label":"Communion",
      "description":"The group is practicing communion.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/communion-2.svg"
  },
  "church_fellowship":{
      "label":"Fellowship",
      "description":"The group is fellowshiping.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/heart-2.svg"
  },
  "church_giving":{
      "label":"Giving",
      "description":"The group is giving.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/giving-2.svg"
  },
  "church_prayer":{
      "label":"Prayer",
      "description":"The group is praying.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/prayer-2.svg"
  },
  "church_praise":{
      "label":"Praise",
      "description":"The group is praising.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/praise-2.svg"
  },
  "church_sharing":{
      "label":"Sharing the Gospel",
      "description":"The group is sharing the gospel.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/evangelism-2.svg"
  },
  "church_leaders":{
      "label":"Leaders",
      "description":"The group has leaders.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/leadership-2.svg"
  },
  "church_commitment":{
      "label":"Church Commitment",
      "description":"The group has committed to be church.",
      "icon":"https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/groups/covenant.svg"
  }
}

export default {
  title: 'Form/dt-church-health-circle',
  component: 'dt-church-health-circle',
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themes),
      defaultValue: 'default',
    },
    id: { control: 'text' },
    name: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      defaultValue: 'text',
    },
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
    value = '',
    disabled = false,
    required = false,
    requiredMessage = '',
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    onChange,
    slot,
    type,
  } = args;
  return html`
    <style>
      ${themeCss(args)}
    </style>
    <dt-church-health-circle
      .group=${NoFilledGroup}
      .settings=${healthMetrics}
    ></dt-church-health-circle>
  `;
}

export const Empty = Template.bind({});
Empty.decorators = [LocaleDecorator, FormDecorator];

export const Filled = Template.bind({});
Filled.group = FilledGroup;

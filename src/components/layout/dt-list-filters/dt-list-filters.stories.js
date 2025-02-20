import { html } from 'lit-html';
import { themeCss, argTypes } from '../../../stories-theme.js';
import './dt-list-filters.js';
import { LocaleDecorator } from '../../../stories-utils.js';

const defaultPosts = [
  {
    "ID": "11",
    "post_title": "Jim Doe",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1726725912,
        "formatted": "2024-09-19"
    },
    "groups": [],
    "last_modified": {
        "timestamp": 1728453091,
        "formatted": "2024-10-09"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "overall_status": {
        "key": "active",
        "label": "Active"
    },
    "milestones": [
        "milestone_has_bible",
        "milestone_reading_bible",
        "milestone_belief",
        "milestone_can_share",
        "milestone_baptized",
        "milestone_baptizing"
    ],
    "assigned_to": {
        "id": "1",
        "type": "user",
        "display": "micahmills",
        "assigned-to": "user-1"
    },
    "favorite": true,
    "permalink": "https://dt.local/contacts/11",
    "name": "Jim Doe"
},
{
    "ID": "7",
    "post_title": "John Doe",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1726658637,
        "formatted": "2024-09-18"
    },
    "groups": [],
    "last_modified": {
        "timestamp": 1728452753,
        "formatted": "2024-10-09"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "overall_status": {
        "key": "active",
        "label": "Active"
    },
    "assigned_to": {
        "id": "2",
        "type": "user",
        "display": "testuser",
        "assigned-to": "user-2"
    },
    "milestones": [
        "milestone_has_bible"
    ],
    "favorite": "",
    "permalink": "https://dt.local/contacts/7",
    "name": "John Doe"
},
{
    "ID": "5",
    "post_title": "micahmills",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1726658529,
        "formatted": "2024-09-18"
    },
    "groups": [],
    "last_modified": {
        "timestamp": 1728040260,
        "formatted": "2024-10-04"
    },
    "permalink": "https://dt.local/contacts/5",
    "name": "micahmills"
},
{
    "ID": "22",
    "post_title": "Test12",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1727944669,
        "formatted": "2024-10-03"
    },
    "groups": [],
    "last_modified": {
        "timestamp": 1728262870,
        "formatted": "2024-10-07"
    },
    "overall_status": {
        "key": "active",
        "label": "Active"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "assigned_to": {
        "id": "1",
        "type": "user",
        "display": "micahmills",
        "assigned-to": "user-1"
    },
    "permalink": "https://dt.local/contacts/22",
    "name": "Test12"
},
{
    "ID": "23",
    "post_title": "Test12",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1727946058,
        "formatted": "2024-10-03"
    },
    "groups": [],
    "last_modified": {
        "timestamp": 1728033072,
        "formatted": "2024-10-04"
    },
    "overall_status": {
        "key": "assigned",
        "label": "Waiting to be accepted"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "assigned_to": {
        "id": "2",
        "type": "user",
        "display": "testuser",
        "assigned-to": "user-2"
    },
    "permalink": "https://dt.local/contacts/23",
    "name": "Test12"
},
{
    "ID": "25",
    "post_title": "test22",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1728048297,
        "formatted": "2024-10-04"
    },
    "groups": [],
    "last_modified": {
        "timestamp": 1728386746,
        "formatted": "2024-10-08"
    },
    "overall_status": {
        "key": "active",
        "label": "Active"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "permalink": "https://dt.local/contacts/25",
    "name": "test22"
},
{
    "ID": "8",
    "post_title": "testuser",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1726725040,
        "formatted": "2024-09-19"
    },
    "groups": [],
    "last_modified": {
        "timestamp": 1728304940,
        "formatted": "2024-10-07"
    },
    "permalink": "https://dt.local/contacts/8",
    "name": "testuser"
}
];

const defaultPostTypeSettings = {
  "name": {
      "name": "Name",
      "type": "text",
      "tile": "details",
      "in_create_form": true,
      "required": true,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/name.svg",
      "show_in_table": 5
  },
  "record_picture": {
      "name": "Picture",
      "type": "image",
      "show_in_table": 1,
      "hidden": true
  },
  "last_modified": {
      "name": "Last Modified",
      "type": "date",
      "default": 0,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-range.svg",
      "customizable": false,
      "show_in_table": 100
  },
  "post_date": {
      "name": "Creation Date",
      "type": "date",
      "default": 0,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-plus.svg",
      "customizable": false
  },
  "favorite": {
      "name": "Favorite",
      "type": "boolean",
      "default": false,
      "private": true,
      "show_in_table": 6,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/star.svg"
  },
  "tags": {
      "name": "Tags",
      "description": "A useful way to group related items.",
      "type": "tags",
      "default": [],
      "tile": "other",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/tag.svg"
  },
  "follow": {
      "name": "Follow",
      "type": "multi_select",
      "default": [],
      "hidden": true
  },
  "unfollow": {
      "name": "Un-Follow",
      "type": "multi_select",
      "default": [],
      "hidden": true
  },
  "tasks": {
      "name": "Tasks",
      "type": "task",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-clock.svg",
      "private": true
  },
  "notes": {
      "name": "Notes",
      "type": "array",
      "hidden": true
  },
  "location_grid": {
      "name": "Locations",
      "description": "The general location where this record is located.",
      "type": "location",
      "mapbox": false,
      "in_create_form": true,
      "tile": "details",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/location.svg?v=2"
  },
  "location_grid_meta": {
      "name": "Locations or Address",
      "type": "location_meta",
      "tile": "details",
      "mapbox": false,
      "hidden": true,
      "in_create_form": true,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/map-marker-multiple.svg?v=2"
  },
  "nickname": {
      "name": "Nickname",
      "type": "text",
      "tile": "details",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/nametag.svg?v=2"
  },
  "type": {
      "name": "Contact Type",
      "type": "key_select",
      "default": {
          "user": {
              "label": "User",
              "description": "Representing a User in the system",
              "color": "#3F729B",
              "hidden": true,
              "in_create_form": false
          },
          "personal": {
              "label": "Private Contact",
              "color": "#9b379b",
              "description": "A friend, family member or acquaintance",
              "visibility": "Only me",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/locked.svg?v=2",
              "order": 50,
              "hidden": true,
              "default": false
          },
          "access": {
              "label": "Standard Contact",
              "color": "#2196F3",
              "description": "A contact to collaborate on",
              "visibility": "Me and project leadership",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/share.svg?v=2",
              "order": 20,
              "default": true
          },
          "access_placeholder": {
              "label": "Connection",
              "color": "#FF9800",
              "description": "Connected to a contact, or generational fruit",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/share.svg?v=2",
              "order": 40,
              "visibility": "Collaborators",
              "in_create_form": false
          },
          "placeholder": {
              "label": "Private Connection",
              "color": "#FF9800",
              "description": "Connected to a contact, or generational fruit",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/locked.svg?v=2",
              "order": 40,
              "visibility": "Only me",
              "in_create_form": false,
              "hidden": true
          }
      },
      "description": "See full documentation here: https://disciple.tools/user-docs/getting-started-info/contacts/contact-types",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/circle-square-triangle.svg?v=2",
      "customizable": false
  },
  "duplicate_data": {
      "name": "Duplicates",
      "type": "array",
      "default": [],
      "hidden": true
  },
  "duplicate_of": {
      "name": "Duplicate of",
      "type": "text",
      "hidden": true
  },
  "languages": {
      "name": "Languages",
      "type": "multi_select",
      "default": {
          "en": {
              "label": "English"
          },
          "fr": {
              "label": "French"
          },
          "es": {
              "label": "Spanish"
          }
      },
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/languages.svg?v=2",
      "tile": "no_tile"
  },
  "contact_phone": {
      "name": "Phone",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/phone.svg?v=2",
      "type": "communication_channel",
      "tile": "details",
      "customizable": false,
      "in_create_form": true,
      "messagingServices": {
          "Signal": {
              "name": "Signal",
              "link": "https://signal.me/#p/PHONE_NUMBER",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/signal.svg"
          },
          "Viber": {
              "name": "Viber",
              "link": "viber://chat?number=PHONE_NUMBER",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/viber.svg"
          },
          "Whatsapp": {
              "name": "WhatsApp",
              "link": "https://api.whatsapp.com/send?phone=PHONE_NUMBER_NO_PLUS",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/whatsapp.svg"
          }
      }
  },
  "contact_email": {
      "name": "Email",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/email.svg?v=2",
      "type": "communication_channel",
      "tile": "details",
      "customizable": false,
      "in_create_form": [
          "access"
      ]
  },
  "contact_address": {
      "name": "Address",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/house.svg?v=2",
      "type": "communication_channel",
      "tile": "details",
      "mapbox": false,
      "customizable": false,
      "in_create_form": [
          "access"
      ]
  },
  "contact_facebook": {
      "name": "Facebook",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/facebook.svg?v=2",
      "hide_domain": true,
      "type": "communication_channel",
      "tile": "details",
      "customizable": false
  },
  "contact_twitter": {
      "name": "Twitter",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/twitter.svg?v=2",
      "hide_domain": true,
      "type": "communication_channel",
      "tile": "details",
      "customizable": false
  },
  "contact_other": {
      "name": "Other Social Links",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/chat.svg?v=2",
      "hide_domain": false,
      "type": "communication_channel",
      "tile": "details",
      "customizable": false
  },
  "relation": {
      "name": "Connections to other Contacts",
      "description": "Relationship this contact has with another contact in the system.",
      "type": "connection",
      "post_type": "contacts",
      "p2p_direction": "any",
      "p2p_key": "contacts_to_relation",
      "tile": "other",
      "in_create_form": [
          "placeholder"
      ],
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/connection-people.svg?v=2"
  },
  "gender": {
      "name": "Gender",
      "type": "key_select",
      "default": {
          "male": {
              "label": "Male"
          },
          "female": {
              "label": "Female"
          }
      },
      "tile": "details",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/gender-male-female.svg"
  },
  "age": {
      "name": "Age",
      "type": "key_select",
      "default": {
          "not-set": {
              "label": ""
          },
          "<19": {
              "label": "Under 18 years old"
          },
          "<26": {
              "label": "18-25 years old"
          },
          "<41": {
              "label": "26-40 years old"
          },
          ">41": {
              "label": "Over 40 years old"
          }
      },
      "tile": "details",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/contact-age.svg?v=2",
      "select_cannot_be_empty": true
  },
  "requires_update": {
      "name": "Requires Update",
      "type": "boolean",
      "default": false
  },
  "overall_status": {
      "name": "Contact Status",
      "description": "The Contact Status describes the progress in communicating with the contact.",
      "type": "key_select",
      "default": {
          "new": {
              "label": "New Contact",
              "description": "The contact is new in the system.",
              "color": "#F43636"
          },
          "unassignable": {
              "label": "Not Ready",
              "description": "There is not enough information to move forward with the contact at this time.",
              "color": "#FF9800"
          },
          "unassigned": {
              "label": "Dispatch Needed",
              "description": "This contact needs to be assigned to a multiplier.",
              "color": "#F43636"
          },
          "assigned": {
              "label": "Waiting to be accepted",
              "description": "The contact has been assigned to someone, but has not yet been accepted by that person.",
              "color": "#FF9800"
          },
          "active": {
              "label": "Active",
              "description": "The contact is progressing and/or continually being updated.",
              "color": "#4CAF50"
          },
          "paused": {
              "label": "Paused",
              "description": "This contact is currently on hold (i.e. on vacation or not responding).",
              "color": "#FF9800"
          },
          "closed": {
              "label": "Archived",
              "color": "#808080",
              "description": "This contact has made it known that they no longer want to continue or you have decided not to continue with him/her."
          }
      },
      "default_color": "#366184",
      "tile": "status",
      "customizable": "add_only",
      "custom_display": true,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/status.svg?v=2",
      "show_in_table": 10,
      "only_for_types": [
          "access"
      ],
      "select_cannot_be_empty": true
  },
  "milestones": {
      "name": "Faith Milestones",
      "description": "Assign which milestones the contact has reached in their faith journey. These are points in a contact’s spiritual journey worth celebrating but can happen in any order.",
      "type": "multi_select",
      "default": {
          "milestone_has_bible": {
              "label": "Has Bible",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/bible.svg?v=2"
          },
          "milestone_reading_bible": {
              "label": "Reading Bible",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/reading.svg?v=2"
          },
          "milestone_belief": {
              "label": "States Belief",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/speak.svg?v=2"
          },
          "milestone_can_share": {
              "label": "Can Share Gospel/Testimony",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/hand-heart.svg?v=2"
          },
          "milestone_sharing": {
              "label": "Sharing Gospel/Testimony",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/account-voice.svg?v=2"
          },
          "milestone_baptized": {
              "label": "Baptized",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/baptism.svg?v=2"
          },
          "milestone_baptizing": {
              "label": "Baptizing",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/child.svg?v=2"
          },
          "milestone_in_group": {
              "label": "In Church/Group",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/group-type.svg?v=2"
          },
          "milestone_planting": {
              "label": "Starting Churches",
              "description": "",
              "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/stream.svg?v=2"
          }
      },
      "customizable": "add_only",
      "tile": "faith",
      "show_in_table": 20,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/bible.svg?v=2"
  },
  "faith_status": {
      "name": "Faith Status",
      "description": "",
      "type": "key_select",
      "default": {
          "seeker": {
              "label": "Seeker"
          },
          "believer": {
              "label": "Believer"
          },
          "leader": {
              "label": "Leader"
          }
      },
      "tile": "status",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/cross.svg?v=2",
      "in_create_form": true
  },
  "subassigned": {
      "name": "Sub-assigned to",
      "description": "Contact or User assisting the Assigned To user to follow up with the contact.",
      "type": "connection",
      "post_type": "contacts",
      "p2p_direction": "to",
      "p2p_key": "contacts_to_subassigned",
      "tile": "status",
      "custom_display": false,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/subassigned.svg?v=2"
  },
  "subassigned_on": {
      "name": "Sub-assigned on other Contacts",
      "description": "Contacts this contacts is subassigned on",
      "type": "connection",
      "post_type": "contacts",
      "p2p_direction": "from",
      "p2p_key": "contacts_to_subassigned",
      "tile": "no_tile",
      "custom_display": false,
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/subassigned.svg?v=2"
  },
  "coaching": {
      "name": "Is Coaching",
      "description": "Who is this contact coaching",
      "type": "connection",
      "post_type": "contacts",
      "p2p_direction": "to",
      "p2p_key": "contacts_to_contacts",
      "tile": "other",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/coaching.svg?v=2"
  },
  "baptism_date": {
      "name": "Baptism Date",
      "description": "",
      "type": "date",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-heart.svg?v=2",
      "tile": "details"
  },
  "baptism_generation": {
      "name": "Baptism Generation",
      "type": "number",
      "default": ""
  },
  "coached_by": {
      "name": "Coached by",
      "description": "Who is coaching this contact",
      "type": "connection",
      "post_type": "contacts",
      "p2p_direction": "from",
      "p2p_key": "contacts_to_contacts",
      "tile": "status",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/coach.svg?v=2"
  },
  "baptized_by": {
      "name": "Baptized by",
      "description": "Who baptized this contact",
      "type": "connection",
      "post_type": "contacts",
      "p2p_direction": "from",
      "p2p_key": "baptizer_to_baptized",
      "tile": "faith",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/baptism.svg?v=2"
  },
  "baptized": {
      "name": "Baptized",
      "description": "Who this contact has baptized",
      "type": "connection",
      "post_type": "contacts",
      "p2p_direction": "to",
      "p2p_key": "baptizer_to_baptized",
      "tile": "faith",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/child.svg?v=2"
  },
  "people_groups": {
      "name": "People Groups",
      "description": "The people groups represented by this contact.",
      "type": "connection",
      "post_type": "peoplegroups",
      "p2p_direction": "from",
      "p2p_key": "contacts_to_peoplegroups",
      "tile": "details",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/people-group.svg?v=2",
      "connection_count_field": {
          "post_type": "peoplegroups",
          "field_key": "contact_count",
          "connection_field": "contacts"
      }
  },
  "quick_button_no_answer": {
      "name": "No Answer",
      "description": "",
      "type": "number",
      "default": 0,
      "section": "quick_buttons",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/account-voice-off.svg?v=2",
      "customizable": false
  },
  "quick_button_contact_established": {
      "name": "Contact Established",
      "description": "",
      "type": "number",
      "default": 0,
      "section": "quick_buttons",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/account-voice.svg?v=2",
      "customizable": false
  },
  "quick_button_meeting_scheduled": {
      "name": "Meeting Scheduled",
      "description": "",
      "type": "number",
      "default": 0,
      "section": "quick_buttons",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-plus.svg?v=2",
      "customizable": false
  },
  "quick_button_meeting_complete": {
      "name": "Meeting Complete",
      "description": "",
      "type": "number",
      "default": 0,
      "section": "quick_buttons",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-check.svg?v=2",
      "customizable": false
  },
  "quick_button_no_show": {
      "name": "Meeting No-show",
      "description": "",
      "type": "number",
      "default": 0,
      "section": "quick_buttons",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-remove.svg?v=2",
      "customizable": false
  },
  "groups": {
      "name": "Groups",
      "description": "Groups this contact is a member of.",
      "type": "connection",
      "post_type": "groups",
      "p2p_direction": "from",
      "p2p_key": "contacts_to_groups",
      "tile": "other",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/group-type.svg?v=2",
      "create-icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/add-group.svg?v=2",
      "show_in_table": 35,
      "connection_count_field": {
          "post_type": "groups",
          "field_key": "member_count",
          "connection_field": "members"
      }
  },
  "group_leader": {
      "name": "Leader of Group",
      "type": "connection",
      "p2p_direction": "to",
      "p2p_key": "groups_to_leaders",
      "post_type": "groups",
      "tile": "no_tile",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/foot.svg?v=2",
      "connection_count_field": {
          "post_type": "groups",
          "field_key": "leader_count",
          "connection_field": "leaders"
      }
  },
  "group_coach": {
      "name": "Coach of Group",
      "type": "connection",
      "p2p_direction": "to",
      "p2p_key": "groups_to_coaches",
      "post_type": "groups",
      "tile": "no_tile",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/coach.svg?v=2"
  },
  "corresponds_to_user": {
      "name": "Corresponds to user",
      "description": "The id of the user this contact corresponds to",
      "type": "number",
      "default": 0,
      "customizable": false,
      "hidden": true
  },
  "corresponds_to_user_name": {
      "name": "Corresponds to user_name",
      "description": "Field used in the multisite invite process",
      "type": "text",
      "customizable": false,
      "hidden": true
  },
  "assigned_to": {
      "name": "Assigned To",
      "description": "Select the main person who is responsible for reporting on this contact.",
      "type": "user_select",
      "default": "",
      "tile": "status",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/assigned-to.svg?v=2",
      "show_in_table": 25,
      "only_for_types": [
          "access",
          "user"
      ],
      "custom_display": false
  },
  "seeker_path": {
      "name": "Seeker Path",
      "description": "Set the status of your progression with the contact. These are the steps that happen in a specific order to help a contact move forward.",
      "type": "key_select",
      "default": {
          "none": {
              "label": "Contact Attempt Needed",
              "description": ""
          },
          "attempted": {
              "label": "Contact Attempted",
              "description": ""
          },
          "established": {
              "label": "Contact Established",
              "description": ""
          },
          "scheduled": {
              "label": "First Meeting Scheduled",
              "description": ""
          },
          "met": {
              "label": "First Meeting Complete",
              "description": ""
          },
          "ongoing": {
              "label": "Ongoing Meetings",
              "description": ""
          },
          "coaching": {
              "label": "Being Coached",
              "description": ""
          }
      },
      "customizable": "add_only",
      "tile": "followup",
      "show_in_table": 15,
      "only_for_types": [
          "access"
      ],
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/sign-post.svg?v=2"
  },
  "reason_unassignable": {
      "name": "Reason Not Ready",
      "description": "The main reason the contact is not ready to be assigned to a user.",
      "type": "key_select",
      "default": {
          "none": {
              "label": ""
          },
          "insufficient": {
              "label": "Insufficient Contact Information"
          },
          "location": {
              "label": "Unknown Location"
          },
          "media": {
              "label": "Only wants media"
          },
          "outside_area": {
              "label": "Outside Area"
          },
          "needs_review": {
              "label": "Needs Review"
          },
          "awaiting_confirmation": {
              "label": "Waiting for Confirmation"
          }
      },
      "customizable": "all",
      "only_for_types": [
          "access"
      ]
  },
  "reason_paused": {
      "name": "Reason Paused",
      "description": "A paused contact is one you are not currently interacting with but expect to in the future.",
      "type": "key_select",
      "default": {
          "none": {
              "label": ""
          },
          "vacation": {
              "label": "Contact on vacation"
          },
          "not_responding": {
              "label": "Contact not responding"
          },
          "not_available": {
              "label": "Contact not available"
          },
          "little_interest": {
              "label": "Contact has little interest/hunger"
          },
          "no_initiative": {
              "label": "Contact shows no initiative"
          },
          "questionable_motives": {
              "label": "Contact has questionable motives"
          },
          "ball_in_their_court": {
              "label": "Ball is in the contact's court"
          },
          "wait_and_see": {
              "label": "We want to see if/how the contact responds to automated text messages"
          }
      },
      "customizable": "all",
      "only_for_types": [
          "access"
      ]
  },
  "reason_closed": {
      "name": "Reason Archived",
      "description": "A closed contact is one you can't or don't wish to interact with.",
      "type": "key_select",
      "default": {
          "none": {
              "label": ""
          },
          "duplicate": {
              "label": "Duplicate"
          },
          "insufficient": {
              "label": "Insufficient contact info"
          },
          "denies_submission": {
              "label": "Denies submitting contact request"
          },
          "hostile_self_gain": {
              "label": "Hostile, playing games or self gain"
          },
          "apologetics": {
              "label": "Only wants to argue or debate"
          },
          "media_only": {
              "label": "Just wanted media or book"
          },
          "no_longer_interested": {
              "label": "No longer interested"
          },
          "no_longer_responding": {
              "label": "No longer responding"
          },
          "already_connected": {
              "label": "Already in church or connected with others"
          },
          "transfer": {
              "label": "Transferred contact to partner"
          },
          "martyred": {
              "label": "Martyred"
          },
          "moved": {
              "label": "Moved or relocated"
          },
          "gdpr": {
              "label": "GDPR request"
          },
          "unknown": {
              "label": "Unknown"
          }
      },
      "customizable": "all",
      "only_for_types": [
          "access"
      ]
  },
  "accepted": {
      "name": "Accepted",
      "type": "boolean",
      "default": false,
      "hidden": true,
      "only_for_types": [
          "access"
      ]
  },
  "sources": {
      "name": "Sources",
      "description": "The website, event or location this contact came from.",
      "type": "multi_select",
      "default": {
          "personal": {
              "label": "Personal",
              "key": "personal"
          },
          "web": {
              "label": "Web",
              "key": "web"
          },
          "facebook": {
              "label": "Facebook",
              "key": "facebook"
          },
          "twitter": {
              "label": "Twitter",
              "key": "twitter"
          },
          "transfer": {
              "label": "Transfer",
              "key": "transfer",
              "description": "Contacts transferred from a partnership with another Disciple.Tools site."
          }
      },
      "tile": "details",
      "customizable": "all",
      "display": "typeahead",
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/arrow-collapse-all.svg?v=2",
      "only_for_types": [
          "access"
      ],
      "in_create_form": [
          "access"
      ]
  },
  "campaigns": {
      "name": "Campaigns",
      "description": "Marketing campaigns or access activities that this contact interacted with.",
      "tile": "details",
      "type": "tags",
      "default": [],
      "icon": "https://dt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/megaphone.svg?v=2",
      "only_for_types": [
          "access"
      ]
  }
};

const filterTabs = [
  {
    "key": "default",
    "label": "Default Filters",
    "order": "7"
  },
  {
    "key": "all_dispatch",
    "label": "Follow-Up Contacts",
    "count": "10",
    "order": "10"
  },
  {
    "key": "custom",
    "label": "Custom Filters",
    "order": "99"
  }

];




const listItems = [

  {
    "ID": "my_subassigned",
    "visible": "1",
    "type": "default",
    "tab": "custom",
    "name": "Subassigned only",
    "query": {
      "subassigned": [
        "me"
      ],
      "sort": "overall_status"
    },
    "labels": [
      {
        "id": "me",
        "name": "Subassigned only",
        "field": "subassigned"
      }
    ]
  },
  {
    "ID": "favorite",
    "tab": "default",
    "name": "Favorite Contacts",
    "query": {
      "fields": {
        "favorite": [
          "1"
        ]
      },
      "sort": "name"
    },
    "labels": [
      {
        "id": "1",
        "name": "Favorite"
      }
    ]
  },
  {
    "ID": "personal",
    "tab": "default",
    "name": "Personal",
    "query": {
      "type": [
        "personal"
      ],
      "sort": "name",
      "overall_status": [
        "-closed"
      ]
    },
    "count": ""
  },
  {
    "ID": "my_coached",
    "visible": "1",
    "type": "default",
    "tab": "default",
    "name": "Coached by me",
    "count": "2",
    "query": {
      "coached_by": [
        "me"
      ],
      "overall_status": [
        "-closed"
      ],
      "sort": "seeker_path"
    },
    "labels": [
      {
        "id": "me",
        "name": "Coached by me",
        "field": "coached_by"
      }
    ]
  },
  {
    "ID": "my_all",
    "tab": "default",
    "name": "My Follow-Up",
    "query": {
      "assigned_to": [
        "me"
      ],
      "subassigned": [
        "me"
      ],
      "combine": [
        "subassigned"
      ],
      "overall_status": [
        "-closed"
      ],
      "type": [
        "access"
      ],
      "sort": "overall_status"
    },
    "labels": [
      {
        "name": "My Follow-Up",
        "field": "combine",
        "id": "subassigned"
      },
      {
        "name": "Assigned to me",
        "field": "assigned_to",
        "id": "me"
      },
      {
        "name": "Sub-assigned to me",
        "field": "subassigned",
        "id": "me"
      }
    ],
    "count": "10"
  },
  {
    "ID": "my_new",
    "tab": "default",
    "name": "New Contact",
    "query": {
      "assigned_to": [
        "me"
      ],
      "subassigned": [
        "me"
      ],
      "combine": [
        "subassigned"
      ],
      "type": [
        "access"
      ],
      "overall_status": [
        "new"
      ],
      "sort": "seeker_path"
    },
    "labels": [
      {
        "name": "New Contact"
      },
      {
        "name": "Assigned to me",
        "field": "assigned_to",
        "id": "me"
      },
      {
        "name": "Sub-assigned to me",
        "field": "subassigned",
        "id": "me"
      }
    ],
    "count": "1",
    "subfilter": "1"
  },
  {
    "ID": "my_active",
    "tab": "default",
    "name": "Active",
    "query": {
      "assigned_to": [
        "me"
      ],
      "subassigned": [
        "me"
      ],
      "combine": [
        "subassigned"
      ],
      "type": [
        "access"
      ],
      "overall_status": [
        "active"
      ],
      "sort": "seeker_path"
    },
    "labels": [
      {
        "name": "Active"
      },
      {
        "name": "Assigned to me",
        "field": "assigned_to",
        "id": "me"
      },
      {
        "name": "Sub-assigned to me",
        "field": "subassigned",
        "id": "me"
      }
    ],
    "count": "3",
    "subfilter": "1"
  },
  {
    "ID": "my_update_needed",
    "tab": "default",
    "name": "Requires Update",
    "query": {
      "assigned_to": [
        "me"
      ],
      "subassigned": [
        "me"
      ],
      "combine": [
        "subassigned"
      ],
      "overall_status": [
        "active"
      ],
      "requires_update": [
        "true"
      ],
      "type": [
        "access"
      ],
      "sort": "seeker_path"
    },
    "labels": [
      {
        "name": "Requires Update"
      },
      {
        "name": "Assigned to me",
        "field": "assigned_to",
        "id": "me"
      },
      {
        "name": "Sub-assigned to me",
        "field": "subassigned",
        "id": "me"
      }
    ],
    "count": "3",
    "subfilter": "2"
  },
  {
    "ID": "my_none",
    "tab": "default",
    "name": "Contact Attempt Needed",
    "query": {
      "assigned_to": [
        "me"
      ],
      "subassigned": [
        "me"
      ],
      "combine": [
        "subassigned"
      ],
      "overall_status": [
        "active"
      ],
      "seeker_path": [
        "none"
      ],
      "type": [
        "access"
      ],
      "sort": "name"
    },
    "labels": [
      {
        "name": "Contact Attempt Needed"
      },
      {
        "name": "Assigned to me",
        "field": "assigned_to",
        "id": "me"
      },
      {
        "name": "Sub-assigned to me",
        "field": "subassigned",
        "id": "me"
      }
    ],
    "count": "3",
    "subfilter": "2"
  },
  {
    "ID": "all_new",
    "tab": "all_dispatch",
    "name": "New Contact",
    "query": {
      "overall_status": [
        "new"
      ],
      "type": [
        "access"
      ],
      "sort": "seeker_path"
    },
    "count": 1
  },
  {
    "ID": "all_active",
    "tab": "all_dispatch",
    "name": "Active",
    "query": {
      "overall_status": [
        "active"
      ],
      "type": [
        "access"
      ],
      "sort": "seeker_path"
    },
    "count": "3"
  },
]

export default {
  title: 'dt-list-filters',
  component: 'dt-list-filters',
  postType: 'contacts',
  args: {
    postTypeSettings: {},
    columns: [],
    theme: 'default',
  },
  argTypes,
};

function Template(args) {
  console.log('These are argumnets in dt-list-filters???',args);

  return html`
    <style>
      ${themeCss(args)}
    </style>

    <dt-list-filters
    ?listFiltersTab= "${args.listFiltersTab}"
    ?splitBy="${args.splitBy}"
    postType="${args.postType}"
    postTypeLabel="${args.postTypeLabel}"
    postTypeSettings="${JSON.stringify(args.postTypeSettings)}"
    filterTabs="${args.filterTabs}"
    listItems="${args.listItems}"
    posts="${args.posts}"
    total="${args.total}"
    columns="${args.columns}"
    ?loading=${args.loading}

    ></dt-list-filters>
    `;
  }
  
  export const Basic = Template.bind({});
  Basic.args = {
  listFiltersTab:true,
  postType: 'contacts',
  postTypeLabel: 'Default Filters',
  postTypeSettings: defaultPostTypeSettings,
  filterTabs: JSON.stringify(filterTabs),
  listItems: JSON.stringify(listItems),
  posts: JSON.stringify(defaultPosts),
  splitBy:false,

};

export const SplitBy = Template.bind({});
SplitBy.args = {
  splitBy:false,
  listFiltersTab:false,
  postType: 'contacts',
  postTypeLabel: "Split By",
  postTypeSettings: defaultPostTypeSettings,
  listItems: JSON.stringify(listItems),
  filterTabs: JSON.stringify(filterTabs),
  posts: JSON.stringify(defaultPosts),
  splitBy:true,
}


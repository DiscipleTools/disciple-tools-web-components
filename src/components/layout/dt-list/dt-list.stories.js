import { html } from 'lit';
import { themeCss, argTypes } from '../../../stories-theme.js';
import './dt-list.js';
import { LocaleDecorator } from '../../../stories-utils.js';

const defaultColumns = [
  'favorite',
  'name',
  'overall_status',
  'seeker_path',
  'milestones',
  'assigned_to',
  'groups',
  'last_modified',
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

const arabicDefaultPostTypeSettings = {
  name: {
    name: 'الاسم',
    type: 'text',
    tile: 'details',
    in_create_form: true,
    required: true,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/name.svg',
    show_in_table: 5,
  },
  last_modified: {
    name: 'اخر تعديل',
    type: 'date',
    default: 0,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-range.svg',
    customizable: false,
    show_in_table: 100,
  },
  post_date: {
    name: 'تاريخ الانشاء',
    type: 'date',
    default: 0,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-plus.svg',
    customizable: false,
  },
  favorite: {
    name: 'المفضلة',
    type: 'boolean',
    default: false,
    private: true,
    show_in_table: 6,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/star.svg',
  },
  tags: {
    name: 'العلامات',
    description: 'A useful way to group related items.',
    type: 'tags',
    default: [],
    tile: 'other',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/tag.svg',
  },
  follow: {
    name: 'تابع',
    type: 'multi_select',
    default: [],
    hidden: true,
  },
  unfollow: {
    name: 'عدم المتابعة',
    type: 'multi_select',
    default: [],
    hidden: true,
  },
  tasks: {
    name: 'مهام',
    type: 'task',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-clock.svg',
    private: true,
  },
  nickname: {
    name: 'اسم الشهرة',
    type: 'text',
    tile: 'details',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/nametag.svg?v=2',
  },
  type: {
    name: 'نوع جهة الاتصال',
    type: 'key_select',
    default: {
      user: {
        label: 'المستخدم',
        description: 'تمثيل مستخدم في النظام',
        color: '#3F729B',
        hidden: true,
        in_create_form: false,
      },
      personal: {
        label: 'Private Contact',
        color: '#9b379b',
        description: 'صديق أو أحد أفراد الأسرة أو المعارف',
        visibility: 'أنا فقط',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/locked.svg?v=2',
        order: 50,
        hidden: false,
        default: false,
      },
      placeholder: {
        label: 'Private Connection',
        color: '#FF9800',
        description: 'مُتصل بجهة اتصال، أو فاكهة جيلية',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/locked.svg?v=2',
        order: 40,
        visibility: 'أنا فقط',
        in_create_form: false,
        hidden: false,
      },
      access: {
        label: 'Standard Contact',
        color: '#2196F3',
        description: 'A contact to collaborate on',
        visibility: 'Me and project leadership',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/share.svg?v=2',
        order: 20,
        default: true,
      },
      access_placeholder: {
        label: 'الاتصال',
        color: '#FF9800',
        description: 'مُتصل بجهة اتصال، أو فاكهة جيلية',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/share.svg?v=2',
        order: 40,
        visibility: 'المُتَعَاوِنُون',
        in_create_form: false,
      },
    },
    description:
      'See full documentation here: https://disciple.tools/user-docs/getting-started-info/contacts/contact-types',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/circle-square-triangle.svg?v=2',
    customizable: false,
  },
  duplicate_data: {
    name: 'Duplicates',
    type: 'array',
    default: [],
    hidden: true,
  },
  duplicate_of: {
    name: 'Duplicate of',
    type: 'text',
    hidden: true,
  },
  languages: {
    name: 'لغات',
    type: 'multi_select',
    default: {
      en: {
        label: 'English',
      },
      fr: {
        label: 'French',
      },
      es: {
        label: 'Spanish',
      },
    },
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/languages.svg?v=2',
    tile: 'no_tile',
  },
  contact_phone: {
    name: 'رقم الهاتف',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/phone.svg?v=2',
    type: 'communication_channel',
    tile: 'details',
    customizable: false,
    in_create_form: true,
    messagingServices: {
      Signal: {
        name: 'Signal',
        link: 'https://signal.me/#p/PHONE_NUMBER',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/signal.svg',
      },
      Viber: {
        name: 'Viber',
        link: 'viber://chat?number=PHONE_NUMBER',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/viber.svg',
      },
      Whatsapp: {
        name: 'Whatsapp',
        link: 'https://api.whatsapp.com/send?phone=PHONE_NUMBER_NO_PLUS',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/signal.svg',
      },
    },
  },
  contact_email: {
    name: 'البريد الالكتروني',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/email.svg?v=2',
    type: 'communication_channel',
    tile: 'details',
    customizable: false,
    in_create_form: ['access'],
  },
  location_grid: {
    name: 'المواقع',
    description: 'من فضلك محاولة الاتصال مرة اخرى',
    type: 'location',
    mapbox: false,
    in_create_form: true,
    tile: 'details',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/location.svg?v=2',
  },
  location_grid_meta: {
    name: 'المواقع أو العنوان',
    type: 'location_meta',
    tile: 'details',
    mapbox: false,
    hidden: true,
    in_create_form: true,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/map-marker-multiple.svg?v=2',
  },
  contact_address: {
    name: 'العنوان',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/house.svg?v=2',
    type: 'communication_channel',
    tile: 'details',
    mapbox: false,
    customizable: false,
    in_create_form: ['access'],
  },
  contact_facebook: {
    name: 'فاسبوك',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/facebook.svg?v=2',
    hide_domain: true,
    type: 'communication_channel',
    tile: 'details',
    customizable: false,
  },
  contact_twitter: {
    name: 'تويتر',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/twitter.svg?v=2',
    hide_domain: true,
    type: 'communication_channel',
    tile: 'details',
    customizable: false,
  },
  contact_other: {
    name: 'روابط اجتماعية أخرى',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/chat.svg?v=2',
    hide_domain: false,
    type: 'communication_channel',
    tile: 'details',
    customizable: false,
  },
  relation: {
    name: 'اتصالات بالسِجِلاَّت الأخرى',
    description: 'دمج جهة الاتصال هذه مع جهة اتصال اخرى',
    type: 'connection',
    post_type: 'contacts',
    p2p_direction: 'any',
    p2p_key: 'contacts_to_relation',
    tile: 'other',
    in_create_form: ['placeholder'],
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/connection-people.svg?v=2',
  },
  gender: {
    name: 'الجنس',
    type: 'key_select',
    default: {
      male: {
        label: 'ذكر',
      },
      female: {
        label: 'أنثى',
      },
    },
    tile: 'details',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/gender-male-female.svg',
  },
  age: {
    name: 'العمر',
    type: 'key_select',
    default: {
      'not-set': {
        label: '',
      },
      '<19': {
        label: 'تحت عمر 18',
      },
      '<26': {
        label: 'بين 18 و 25 سنة',
      },
      '<41': {
        label: 'بين 26 و 40 سنة',
      },
      '>41': {
        label: 'فوق 40 سنة',
      },
    },
    tile: 'details',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/contact-age.svg?v=2',
    select_cannot_be_empty: true,
  },
  requires_update: {
    name: 'يحتاج إلى تحديث',
    type: 'boolean',
    default: false,
  },
  overall_status: {
    name: 'حالة جهات الاتصال',
    description: 'تصف حالة الاتصال تقدمنا في التواصل مع جهة الاتصال',
    type: 'key_select',
    default: {
      new: {
        label: 'جهة اتصال جديدة',
        description: 'جهة الاتصال جديدة في النظام',
        color: '#F43636',
      },
      unassignable: {
        label: 'ليس جاهز',
        description:
          'لا يوجد معلومات كافية تسمح للمضي قدما مع جهة الاتصال في هذا الوقت.',
        color: '#FF9800',
      },
      unassigned: {
        label: 'يحتاج إلى توزيع مهام',
        description: 'تحتاج جهة الاتصال هذه تعيينها إلى مضاعف',
        color: '#F43636',
      },
      assigned: {
        label: 'في انتظار القبول',
        description: 'تمّ تعيين جهة الاتصال هذه لشخص لكن لم يتم قبوله بعد',
        color: '#FF9800',
      },
      active: {
        label: 'ناشط',
        description: 'جهة الاتصال هذه في تقدم و/أو يتم تحديثها بانتظام',
        color: '#4CAF50',
      },
      paused: {
        label: 'توقف',
        description: 'جهة الاتصال هذه معلقة (في عطلة أو لا يتجاوب)',
        color: '#FF9800',
      },
      closed: {
        label: 'محفوظ في الأرشيف',
        color: '#808080',
        description:
          'لا تريد جهة الاتصال هذه إكمال التواصل أو أنت بنفسك قررت إيقاف متابعته',
      },
    },
    default_color: '#366184',
    tile: 'status',
    customizable: 'add_only',
    custom_display: true,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/status.svg?v=2',
    show_in_table: 10,
    only_for_types: ['access'],
    select_cannot_be_empty: true,
  },
  milestones: {
    name: 'مراحل الإيمان',
    description:
      'حدد المراحل التي وصل إليها الاتصال في رحلة الإيمان. هذه نقاط في الرحلة الروحية لجهة اتصال تستحق الاحتفال ولكن يمكن أن تحدث بأي ترتيب.',
    type: 'multi_select',
    default: {
      milestone_has_bible: {
        label: 'يملك الانجيل',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/bible.svg?v=2',
      },
      milestone_reading_bible: {
        label: 'في طور قراءة الانجيل',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/reading.svg?v=2',
      },
      milestone_belief: {
        label: 'الحالة الإيمانية',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/speak.svg?v=2',
      },
      milestone_can_share: {
        label: 'يمكنه مشاركة الانجيل/ الاختبار',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/hand-heart.svg?v=2',
      },
      milestone_sharing: {
        label: 'يشارك الانجيل/ اختباره',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/account-voice.svg?v=2',
      },
      milestone_baptized: {
        label: 'تم تعميده',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/baptism.svg?v=2',
      },
      milestone_baptizing: {
        label: 'يقوم بالتعميد',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/child.svg?v=2',
      },
      milestone_in_group: {
        label: 'ينتمي إلى كنيسة/ مجموعة',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/group-type.svg?v=2',
      },
      milestone_planting: {
        label: 'في طور إنشاء كنائس',
        description: '',
        icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/stream.svg?v=2',
      },
    },
    customizable: 'add_only',
    tile: 'faith',
    show_in_table: 20,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/bible.svg?v=2',
  },
  faith_status: {
    name: 'حالة الثقة',
    description: '',
    type: 'key_select',
    default: {
      seeker: {
        label: 'باحث',
      },
      believer: {
        label: 'مُؤمِن',
      },
      leader: {
        label: 'قائد',
      },
    },
    tile: 'status',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/cross.svg?v=2',
    in_create_form: true,
  },
  subassigned: {
    name: 'معيّن فرعيّا إلى',
    description:
      'جهة اتصال أو مستخدم يساعد المستخدم المعين على المتابعة مع جهة الاتصال.',
    type: 'connection',
    post_type: 'contacts',
    p2p_direction: 'to',
    p2p_key: 'contacts_to_subassigned',
    tile: 'status',
    custom_display: false,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/subassigned.svg?v=2',
  },
  subassigned_on: {
    name: 'تم التسجيل الفرعي على جهات اتصال أخرى',
    description: 'جهات الاتصال هذه مسجلة فرعيًا على',
    type: 'connection',
    post_type: 'contacts',
    p2p_direction: 'from',
    p2p_key: 'contacts_to_subassigned',
    tile: 'no_tile',
    custom_display: false,
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/subassigned.svg?v=2',
  },
  coaching: {
    name: 'يُدرِب',
    description: 'ربط جهة الاتصال هذه بمستخدم حالي',
    type: 'connection',
    post_type: 'contacts',
    p2p_direction: 'to',
    p2p_key: 'contacts_to_contacts',
    tile: 'other',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/coaching.svg?v=2',
  },
  baptism_date: {
    name: 'تاريخ المعمودية',
    description: '',
    type: 'date',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-heart.svg?v=2',
    tile: 'details',
  },
  baptism_generation: {
    name: 'جيل المعمودية',
    type: 'number',
    default: '',
  },
  coached_by: {
    name: 'تم تدريبه من',
    description: 'نقل جهة الاتصال هذه إلى: ',
    type: 'connection',
    post_type: 'contacts',
    p2p_direction: 'from',
    p2p_key: 'contacts_to_contacts',
    tile: 'status',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/coach.svg?v=2',
  },
  baptized_by: {
    name: 'تم تعميده من',
    description: 'نقل جهة الاتصال هذه إلى: ',
    type: 'connection',
    post_type: 'contacts',
    p2p_direction: 'from',
    p2p_key: 'baptizer_to_baptized',
    tile: 'faith',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/baptism.svg?v=2',
  },
  baptized: {
    name: 'تم تعميده',
    description: 'تم نقل جهة الاتصال',
    type: 'connection',
    post_type: 'contacts',
    p2p_direction: 'to',
    p2p_key: 'baptizer_to_baptized',
    tile: 'faith',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/child.svg?v=2',
  },
  people_groups: {
    name: 'مجموعات بشرية',
    description: 'مجموعات الأشخاص الممثلة في جهة الاتصال.',
    type: 'connection',
    post_type: 'peoplegroups',
    p2p_direction: 'from',
    p2p_key: 'contacts_to_peoplegroups',
    tile: 'details',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/people-group.svg?v=2',
  },
  quick_button_no_answer: {
    name: 'لا يوجد إجابة',
    description: '',
    type: 'number',
    default: 0,
    section: 'quick_buttons',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/account-voice-off.svg?v=2',
    customizable: false,
  },
  quick_button_contact_established: {
    name: 'تم إنشاء التواصل',
    description: '',
    type: 'number',
    default: 0,
    section: 'quick_buttons',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/account-voice.svg?v=2',
    customizable: false,
  },
  quick_button_meeting_scheduled: {
    name: 'تم تحديد موعد للقاء',
    description: '',
    type: 'number',
    default: 0,
    section: 'quick_buttons',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-plus.svg?v=2',
    customizable: false,
  },
  quick_button_meeting_complete: {
    name: 'تم اللقاء',
    description: '',
    type: 'number',
    default: 0,
    section: 'quick_buttons',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-check.svg?v=2',
    customizable: false,
  },
  quick_button_no_show: {
    name: 'لم يأت في موعد اللقاء',
    description: '',
    type: 'number',
    default: 0,
    section: 'quick_buttons',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-remove.svg?v=2',
    customizable: false,
  },
  groups: {
    name: 'المجموعات',
    description: 'يحتاج هذا المتصل إلى تحديث',
    type: 'connection',
    post_type: 'groups',
    p2p_direction: 'from',
    p2p_key: 'contacts_to_groups',
    tile: 'other',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/group-type.svg?v=2',
    'create-icon':
      'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/add-group.svg?v=2',
    show_in_table: 35,
    connection_count_field: {
      post_type: 'groups',
      field_key: 'member_count',
      connection_field: 'members',
    },
  },
  group_leader: {
    name: 'قائد المجموعة',
    type: 'connection',
    p2p_direction: 'to',
    p2p_key: 'groups_to_leaders',
    post_type: 'groups',
    tile: 'no_tile',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/foot.svg?v=2',
    connection_count_field: {
      post_type: 'groups',
      field_key: 'leader_count',
      connection_field: 'leaders',
    },
  },
  group_coach: {
    name: 'Coach of Group',
    type: 'connection',
    p2p_direction: 'to',
    p2p_key: 'groups_to_coaches',
    post_type: 'groups',
    tile: 'no_tile',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/coach.svg?v=2',
  },
  meetings: {
    name: 'Meetings',
    type: 'connection',
    p2p_direction: 'to',
    post_type: 'meetings',
    tile: 'disciple_tools_meetings',
    p2p_key: 'meetings_to_contacts',
  },
  meetings_led: {
    name: 'Leader of meetings',
    type: 'connection',
    p2p_direction: 'from',
    post_type: 'meetings',
    tile: 'disciple_tools_meetings',
    p2p_key: 'meetings_to_leaders',
  },
  starter_app_page_magic_key: {
    name: 'Starter App',
    type: 'hash',
    hidden: true,
  },
  starter_app_map_magic_key: {
    name: 'Starter App Map',
    type: 'hash',
    hidden: true,
  },
  corresponds_to_user: {
    name: 'يتوافق مع المستخدم',
    description: 'هوية المستخدم الذي يتوافق معه جهة الاتصال هذه',
    type: 'number',
    default: 0,
    customizable: false,
    hidden: true,
  },
  corresponds_to_user_name: {
    name: 'Corresponds to user_name',
    description: 'Field used in the multisite invite process',
    type: 'text',
    customizable: false,
    hidden: true,
  },
  assigned_to: {
    name: 'المعينة لي',
    description: 'حدد الشخص الرئيسي المسؤول عن الإبلاغ عن جهة الاتصال هذه.',
    type: 'user_select',
    default: '',
    tile: 'status',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/assigned-to.svg?v=2',
    show_in_table: 25,
    only_for_types: ['access', 'user'],
    custom_display: true,
  },
  seeker_path: {
    name: 'مسار الباحث',
    description:
      'تعيين حالة تقدمك مع جهة الاتصال. هذه هي الخطوات التي تحدث في ترتيب معين لمساعدة جهة اتصال على المضي قدمًا.',
    type: 'key_select',
    default: {
      none: {
        label: 'يحتاج محاولة الاتصال به',
        description: '',
      },
      attempted: {
        label: 'تمت محاولة الاتصال',
        description: '',
      },
      established: {
        label: 'تم إنشاء التواصل',
        description: '',
      },
      scheduled: {
        label: 'تم تحديد موعد الاجتماع',
        description: '',
      },
      met: {
        label: 'اكتمال الاجتماع الاول',
        description: '',
      },
      ongoing: {
        label: 'اجتماعات متواصلة',
        description: '',
      },
      coaching: {
        label: 'في طور التدريب',
        description: '',
      },
    },
    customizable: 'add_only',
    tile: 'followup',
    show_in_table: 15,
    only_for_types: ['access'],
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/sign-post.svg?v=2',
  },
  reason_unassignable: {
    name: 'السبب: غير جاهز',
    description: 'تحتاج جهة الاتصال هذه تعيينها إلى مضاعف',
    type: 'key_select',
    default: {
      none: {
        label: '',
      },
      insufficient: {
        label: 'معلومات غير كافية ',
      },
      location: {
        label: 'الموقع غير معروف',
      },
      media: {
        label: 'لا يحتاج إلا لمواد عبر الميديا',
      },
      outside_area: {
        label: 'خارج المنطقة',
      },
      needs_review: {
        label: 'يحتاج إلى مراجعة',
      },
      awaiting_confirmation: {
        label: 'في انتظار التأكيد',
      },
    },
    customizable: 'all',
    only_for_types: ['access'],
  },
  reason_paused: {
    name: 'سبب الإيقاف',
    description:
      'جهة الاتصال المتوقفة مؤقتًا هي تلك التي لا تتفاعل معها حاليًا ولكن تتوقعها في المستقبل.',
    type: 'key_select',
    default: {
      none: {
        label: '',
      },
      vacation: {
        label: 'تم تغيير معلومات جهة الاتصال',
      },
      not_responding: {
        label: 'لا يتجاوب',
      },
      not_available: {
        label: 'تم إنشاء التواصل',
      },
      little_interest: {
        label: 'يحتاج إلى محاولة اتصال',
      },
      no_initiative: {
        label: 'جهة الاتصال لا يظهر مبادرة',
      },
      questionable_motives: {
        label: 'جهة الاتصال لديه دوافع مشكوك فيها',
      },
      ball_in_their_court: {
        label: 'الكرة في ملعب جهة الاتصال',
      },
      wait_and_see: {
        label:
          'نريد أن نرى ما إذا كانت جهة الاتصال تستجيب للرسائل النصية الآلية',
      },
    },
    customizable: 'all',
    only_for_types: ['access'],
  },
  reason_closed: {
    name: 'Reason Archived',
    description:
      'جهة الاتصال المغلقة هي جهة لا يمكنك أو لا ترغب في التفاعل معها.',
    type: 'key_select',
    default: {
      none: {
        label: '',
      },
      duplicate: {
        label: 'مكرّر',
      },
      insufficient: {
        label: 'معلومات جهة الاتصال غير كافية',
      },
      denies_submission: {
        label: 'رفض تقديم طلب الاتصال',
      },
      hostile_self_gain: {
        label: 'عدائي، يتلاعب، مصلحة شخصية',
      },
      apologetics: {
        label: 'لا يريد الا الجدال والنقاش العقيم',
      },
      media_only: {
        label: 'يحتاج فقط إلى الانجيل أو ميديا',
      },
      no_longer_interested: {
        label: 'لم يعد مهتمّا',
      },
      no_longer_responding: {
        label: 'لا يتجاوب',
      },
      already_connected: {
        label: 'ينتمي إلى كنيسة أو يتواصل مع اخرين',
      },
      transfer: {
        label: 'تم نقل جهة الاتصال إلى شريك في الخدمة',
      },
      martyred: {
        label: 'شهيد',
      },
      moved: {
        label: 'انتقال وتغيير مكان',
      },
      gdpr: {
        label: 'طلب اللائحة العامة لحماية البيانات',
      },
      unknown: {
        label: 'غير معروف',
      },
    },
    customizable: 'all',
    only_for_types: ['access'],
  },
  accepted: {
    name: 'تم القبول',
    type: 'boolean',
    default: false,
    hidden: true,
    only_for_types: ['access'],
  },
  sources: {
    name: 'المصادر',
    description:
      'الموقع الإلكتروني أو الحدث أو الموقع الذي أتت منه جهة الاتصال هذه.',
    type: 'multi_select',
    default: {
      personal: {
        label: 'خاص',
        key: 'personal',
      },
      web: {
        label: 'الشبكة',
        key: 'web',
      },
      facebook: {
        label: 'فاسبوك',
        key: 'facebook',
      },
      twitter: {
        label: 'تويتر',
        key: 'twitter',
      },
      transfer: {
        label: 'تأكيد النقل',
        key: 'transfer',
        description: 'تم نقل جهات الاتصال من شراكة مع تابع آخر.موقع الأدوات.',
      },
    },
    tile: 'details',
    customizable: 'all',
    display: 'typeahead',
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/arrow-collapse-all.svg?v=2',
    only_for_types: ['access'],
    in_create_form: ['access'],
  },
  campaigns: {
    name: 'الحملات',
    description:
      'حملات التسويق أو أنشطة الوصول التي تفاعلت معها جهة الاتصال هذه.',
    tile: 'details',
    type: 'tags',
    default: [],
    icon: 'https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/megaphone.svg?v=2',
    only_for_types: ['access'],
  },
};

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

const arabicDefaultPosts = [
  {
    ID: '1',
    post_title: 'test',
    post_type: 'contacts',
    post_date: {
      timestamp: 1660333623,
      formatted: '2022-08-12',
    },
    groups: [
      {
        ID: '2',
        post_type: 'groups',
        post_date_gmt: '2022-08-10 13:14:40',
        post_date: '2022-08-10 13:14:40',
        post_title: 'Group 1',
        permalink: 'https://rsdt.local/groups/5/',
        status: {
          key: 'active',
          label: 'ناشط',
          color: '#4CAF50',
        },
      },
    ],
    last_modified: {
      timestamp: 1660333623,
      formatted: '2022-08-12',
    },
    seeker_path: {
      key: 'none',
      label: 'يحتاج محاولة الاتصال به',
    },
    overall_status: {
      key: 'active',
      label: 'ناشط',
    },
    milestones: [
      'milestone_has_bible',
      'milestone_reading_bible',
      'milestone_belief',
      'milestone_can_share',
      'milestone_baptized',
    ],
    assigned_to: {
      id: '3',
      type: 'user',
      display: 'johndoe',
      'assigned-to': 'user-1',
    },
    permalink: 'https://rsdt.local/contacts/16',
    name: 'test',
    age: {
      key: '<19',
      label: 'Under 18 years old',
    },
  },
  {
    ID: '17',
    post_title: 'archived',
    post_type: 'contacts',
    post_date: {
      timestamp: 1660924474,
      formatted: '2022-08-19',
    },
    groups: [],
    last_modified: {
      timestamp: 1660924616,
      formatted: '2022-08-19',
    },
    seeker_path: {
      key: 'none',
      label: 'يحتاج محاولة الاتصال به',
    },
    overall_status: {
      key: 'closed',
      label: 'Archived',
    },
    assigned_to: {
      id: '1',
      type: 'user',
      display: 'micahmills',
      'assigned-to': 'user-1',
    },
    permalink: 'https://rsdt.local/contacts/17',
    name: 'archived',
    age: {
      key: '<19',
      label: 'Under 18 years old',
    },
  },
  {
    ID: '4',
    post_title: 'johndoe',
    post_type: 'contacts',
    post_date: {
      timestamp: 1660155962,
      formatted: '2022-08-10',
    },
    groups: [],
    last_modified: {
      timestamp: 1660155962,
      formatted: '2022-08-10',
    },
    overall_status: {
      key: 'active',
      label: 'ناشط',
    },
    permalink: 'https://dt.local/contacts/15',
    name: 'johndoe',
    age: {
      key: '<19',
      label: 'Under 18 years old',
    },
  },
];

export default {
  title: 'Components/Layout/List',
  component: 'dt-list',
  postType: 'contacts',
  args: {
    postTypeSettings: {},
    columns: [],
    theme: 'default',
  },
  argTypes,
};

function Template(args) {
  return html`
    <style>
      ${themeCss(args)}
    </style>

    <dt-list
      postType="${args.postType}"
      postTypeLabel="${args.postTypeLabel}"
      postTypeSettings="${JSON.stringify(args.postTypeSettings)}"
      posts="${args.posts}"
      total="${args.total}"
      columns="${args.columns}"
      ?loading=${args.loading}
    ></dt-list>
  `;
}

export const Basic = Template.bind({});
Basic.args = {
  postType: 'contacts',
  postTypeLabel: 'Contact',
  postTypeSettings: defaultPostTypeSettings,
  columns: JSON.stringify(defaultColumns),
  posts: JSON.stringify(defaultPosts),
};

export const LoadFromApi = Template.bind({});
LoadFromApi.args = {
  postType: 'contacts',
  postTypeLabel: 'Contact',
  postTypeSettings: defaultPostTypeSettings,
  columns: JSON.stringify(defaultColumns),
};

export const LocalizeRTL = Template.bind({});
LocalizeRTL.decorators = [LocaleDecorator];

LocalizeRTL.args = {
  postType: 'contacts',
  postTypeLabel: 'جهات الاتصالل',
  lang: 'ar',
  dir: 'rtl',
  postTypeSettings: arabicDefaultPostTypeSettings,
  columns: JSON.stringify(defaultColumns),
  posts: JSON.stringify(arabicDefaultPosts),
};

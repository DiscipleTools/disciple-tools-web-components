# List
List for displaying list of posts (Contacts, Groups, etc.) and their corresponding fields in a table view.

## Attributes
| Attribute | Description | Type | Default Value | Example Value | 
| --------- | ----------- | ---- | ------------- | ------------- |
| `postType` | Type of posts in the list | `string` | - | `Contacts` |
| `postTypeSettings` | The fields for the post type | `Object` | `false` | `{
  "name": {
    "name": "Name",
    "type": "text",
    "tile": "details",
    "in_create_form": true,
    "required": true,
    "icon": "https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/name.svg",
    "show_in_table": 5
  },
  "last_modified": {
    "name": "Last Modified",
    "type": "date",
    "default": 0,
    "icon": "https://rsdt.local/wp-content/themes/disciple-tools-theme/dt-assets/images/calendar-range.svg",
    "customizable": false,
    "show_in_table": 100
  }...` |
| `posts` | Array of posts from DT | `Array` | `` | `  {
      "ID": "1",
      "post_title": "test",
      "post_type": "contacts",
      "post_date": {
          "timestamp": 1660333623,
          "formatted": "2022-08-12"
      },
      "groups": [
          {
              "ID": "2",
              "post_type": "groups",
              "post_date_gmt": "2022-08-10 13:14:40",
              "post_date": "2022-08-10 13:14:40",
              "post_title": "Group 1",
              "permalink": "https://rsdt.local/groups/5/",
              "status": {
                  "key": "active",
                  "label": "Active",
                  "color": "#4CAF50"
              }
          }
      ],
      "last_modified": {
          "timestamp": 1660333623,
          "formatted": "2022-08-12"
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
          "milestone_baptized"
      ],
      "assigned_to": {
          "id": "3",
          "type": "user",
          "display": "johndoe",
          "assigned-to": "user-1"
      },
      "permalink": "https://rsdt.local/contacts/16",
      "name": "test"
  }` |

## Slots
| Name | Description |
| ---- | ----------- |

## CSS Custom Properties
| Custom Properties   | Default Value   |
|---------------------|-----------------|
| `--dt-list-font-family` | `--font-family`  |
| `--dt-list-font-size`   | `15px`  |
| `--dt-list-font-weight` | `300`   |
| `--dt-list-line-height` | `1.5`   |
| `--dt-list-background-color`|  `#fefefe`  |
| `--dt-list-border-color`  | `#f1f1f1` |
| `--dt-list-border-radius` | `10px`  |
| `--dt-list-box-shadow`  | `0 2px 4px rgb(0 0 0 / 25%)`  |
| `--dt-list-section-padding` | `1rem` |
| `--dt-list-header-gap`  | `1.5em`   |
| `--dt-list-header-color` | `--primary-color` |
| `--dt-list-header-background-color`   |`--dt-tile-background-color / #fefefe`
| `--dt-list-toggleButton` | `0.1em solid rgb(0 0 0 / 0.2)`   |
| `--dt-list-action-section-background-color`   | `#ecf5fc`   |
| `--dt-list-action-section-margin`   | `30px 0`  |
| `--dt-list-action-section-padding`   | `20px`   |
| `--dt-list-field-picker-icon-size`   | `1rem`   |
| `--dt-list-hover-background-color` | `#ecf5fc`  |
| `--dt-list-link-color`  | `--primary-color`   |
| `--dt-list-sort-arrow-color` | `#808080`  |
| `--dt-list-sort-arrow-color-highlight`  | `#999999`   |


## Features
- [x] header text
- [x] Table column headers
- [x] Table row content
- [] Pagination
- [] All field types supported
- [] date formated properly
- [] Sortable table
- [] Fields Column Selector
- [] Bulk Editor
- [x] Show Archived Toggle
- [] current filter display
- [x] favorite start toggle
- [] draggable table columns
- [x] mobile view styling

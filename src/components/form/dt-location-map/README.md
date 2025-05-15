# Tags
Location field using Mapbox to search and geocode locations 

## Attributes
| Attribute | Description | Type | Default Value | Example Value | 
| --------- | ----------- | ---- | ------------- | ------------- |
| `name`    | Name of the field. Passed to `change` event to identify source of event. | `string` | - | - |
| `value`   | Selected values. Should be an array of Mapbox objects converted to JSON string. <br> **Note:** This value is updated on the component when internal value changes. | `{grid_meta_id:string, post_id:string, ..., label: string}[]` | | `JSON.stringify([{grid_meta_id:'12',post_id:'23',...,label:'New York City, USA'},{id:'2',label:'Option 2'}])` |
| `placeholder` | Placeholder text when no selection is made | `string` | - | - |
| `loading` | Show loading spinner | `boolean` | `false` | `<dt-tags loading>` |
| `saved`   | Show saved checkmark | `boolean` | `false` | `<dt-tags saved>` |
| `onchange` | Event triggered when value is changed. Makes available `event` variable that includes field name, old value, and new value in `event.details` | `event` | - | `onChange(event)` |
| `mapbox-token` | Mapbox token to be used for searches and showing map | `string` | - | - |
| `google-token` | Google Geocoding token to be used for searches and showing map | `string` | - | - |
| `label`   | Text to be displayed in label | `string` | - | - |
| `icon`    | URL to an icon to be displayed before the label | `string` | - | - |
| `private` | Whether field should be marked as private | `boolean` | `false` | '<dt-label private>` |
| `privateLabel` | Customize tooltip text for private icon hover state. Pass in correct language content. | `string` | - | - |

## Slots
| Name | Description |
| ---- | ----------- |
| `icon-start` | Icon to be displayed before label. Use if you want to embed an SVG directly on the page without an `img` tag |

## CSS Custom Properties

### `dt-location-map-item`

| Custom Properties                       | Default Value                           | 
|-----------------------------------------|-----------------------------------------|
| `--dt-form-border-color`                | `#cacaca`                               |
| `--dt-location-map-background-color`    | `#fefefe`                               |
| `--dt-location-map-text-color`          | `#000`                                  |
| `--dt-location-map-padding`             | `0.5rem`                                |
| `--dt-location-map-border`              | `1px solid #cacaca`                     |
| `--dt-location-map-border-radius`       | `0`                                     |
| `--dt-location-map-box-shadow`          | `inset 0 1px 2px hsl(0deg 0% 4% / 10%)` |
| `--dt-location-map-hover-background`    | `#f8f8f8`                               |
| `--dt-location-map-hover-border`        | `1px solid #b1b1b1`                     |
| `--dt-location-map-selected-background` | `#e6e6e6`                               |
| `--dt-location-map-selected-border`     | `1px solid #acacac`                     |
| `--dt-location-map-disabled-background` | `#e6e6e6`                               |
| `--dt-location-map-disabled-text`       | `#999`                                  |
| `--dt-location-map-placeholder-color`   | `#999`                                  |
| `--dt-location-map-item-height`         | `2.5rem`                                |
| `--dt-location-map-item-margin`         | `0.25rem`                               |

## Feature Status
- [x] label
- [x] value
- [x] placeholder
- [x] onchange
- [x] loading
- [ ] saved
- [x] disabled
- [x] empty box if no value
- [x] open location in map dialog
- [x] clear/delete location
- [x] add multiple locations
- [x] search mapbox locations
- [x] search google locations
- [x] select option (mouse)
- [x] select option (keyboard)
- [x] select existing location
- [x] focus next location after adding
- [x] add custom (non-geocoded) location
- [x] edit custom (non-geocoded) location
- [x] select from pin on map (new)
- [x] Localization & RTL

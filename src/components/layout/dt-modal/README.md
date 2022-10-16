~~# Alert

A dismissable message box.

## Attributes

| Attribute     | Description                                              | Type      | Default Value | Example Value               | 
|---------------|----------------------------------------------------------|-----------|---------------|-----------------------------|
| `context`     | Context color.                                           | `string`  | 'default'     | '<dt-tile theme="success">` |
| `dismissable` | Whether alert should be able to be dismissed             | `boolean` | `false`       | '<dt-tile dismissable>`     |
| `timeout`     | The number of milliseconds before the alert is dismissed | `number`  | '0'           | '<dt-tile timeout="10000">` |
| `show`        | Whether the alert is visible                             | `boolean` | `true`        | '<dt-tile show="false">`    |

## Slots

| Name    | Description             |
|---------|-------------------------|
| Default | Contents of the alert.  |

## CSS Custom Properties
| Custom Properties   | Default Value   |
|---------------------|-----------------|
| `--dt-modal-background-color`   |  `#fff`   |
| `--dt-modal-color`  | `#000`  |
| `--dt-modal-padding` | `1em`  |
| `--dt-modal-backdrop-color`   | `rgba(0, 0, 0, 0.25)` |
| `--dt-modal-animation`  | `fade-in .75s` |
| `--dt-modal-button-color`   | `#fff`  |
| `--dt-modal-button-background`  | `#000`  |

## Features

- [x] Preset color schemes.
- [x] Conditionally display based on boolean.
- [x] Dismissable by user.
- [x] Dismissable after timeout.

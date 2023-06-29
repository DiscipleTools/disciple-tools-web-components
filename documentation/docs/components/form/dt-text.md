# dt-text
Basic single line text input

## Properties

Inherits properties from [DtFormBase](../../architecture/base-classes#dtformbase).

| Property | Definition | Description | Default Value | Example Value | 
| -------- | ---------- | ----------- | ------------- | ------------- |
| type | `{ type: String }` | `type` attribute of `<input />` | `text` | `number` |
| placeholder | `{ type: String }` | Placeholder displayed when no value is entered | - | `Enter value` |
| value | `{ type: String, reflect: true }` | Value of field. Reflected back to attribute in order to select from DOM if needed. | - | `Text content` |

## Slots

Inherits slots from [DtFormBase](../../architecture/base-classes#dtformbase).

## CSS Custom Properties

Inherits custom properties from [DtFormBase](../../architecture/base-classes#dtformbase).

| Custom Properties   | Default Value   |
|---------------------|-----------------|
| `--dt-form-text-color`  | `#000`  |
| `--dt-text-background-color`  | `#fefefe` |
| `--dt-text-border-color`  | `#fefefe`   |
| `--dt-text-border-radius`   | `0`   |
| `--dt-text-input-box-shadow`  | `--dt-form-input-box-shadow`   |
| `--dt-form-padding`   | `0.5333333333rem`   |
| `--dt-form-transition` | `box-shadow .5s,border-color .25s ease-in-out`   |
| `--dt-text-disabled-background-color`   | `--dt-form-disabled-background-color`   |
| `--dt-text-placeholder-color` | `#999`  |
| `--dt-text-placeholder-transform` |  `none`   |
| `--dt-text-placeholder-font-size`   | `1rem`  |
|  `--dt-text-placeholder-font-weight`  |  `400`  |
| `--dt-text-placeholder-letter-spacing`  | `normal`  |
| `--dt-text-border-color-alert`  | `--alert-color`   |


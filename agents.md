# AI Agents Guide - Disciple.Tools Web Components

This file provides guidance to AI coding agents (like Claude Code, GitHub Copilot, etc.) when working with code in this repository.

## Project Overview

`@disciple.tools/web-components` is a library of standard web components built with [Lit](https://lit.dev/). These components are used across the [Disciple.Tools](https://github.com/DiscipleTools/disciple-tools-theme) ecosystem.

## Tech Stack

- **Framework**: [Lit](https://lit.dev/) (v3)
- **Language**: JavaScript (ES modules)
- **Documentation/Demo**: [Storybook](https://storybook.js.org/)
- **Testing**: [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) with [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Localization**: [@lit/localize](https://lit.dev/docs/localization/overview/)

## Common Commands

### Development & Build
```bash
npm install          # Install dependencies
npm start            # Start Vite dev server for local demo
npm run build        # Build components for production (dist/)
npm run analyze      # Generate custom-elements.json manifest
```

### Storybook
```bash
npm run storybook          # Start local Storybook instance (port 8080)
npm run storybook:build    # Build static Storybook site
```

### Linting & Formatting
```bash
npm run lint          # Run ESLint and Prettier checks
npm run format        # Fix linting and formatting issues
```

### Testing
```bash
npm run test          # Run tests once with coverage
npm run test:watch    # Run tests in watch mode
```

### Localization
```bash
npm run localize:extract    # Extract strings from code to XLIFF files
npm run localize:build      # Build localized JS templates from XLIFF
```

## Development Workflow

### Creating or Updating Components
1. **Standards**: Strictly follow the [Standards.md](./Standards.md) file for component structure and implementation details.
2. **Base Classes**: 
   - Most form components should extend `DtFormBase` (from `src/components/form/dt-form-base.js`).
   - Generic components should extend `DtBase` (from `src/components/dt-base.js`).
3. **Component Files**: A standard component directory (e.g., `src/components/form/dt-text/`) includes:
   - `*.js`: The component implementation.
   - `*.stories.js`: Storybook stories.
   - `*.test.js`: Unit tests.
   - `docs.mdx`: Component documentation.
4. **Icons**: Use `this.renderIcons()` (available in `DtFormBase`) instead of manual icon tags where possible.
5. **Localization**: Use the `msg()` function from `@lit/localize` for all user-facing strings.
6. **Responsive Design**: Ensure components work well for touch, mouse, and keyboard input and that they scale appropriately on different screen sizes.

### Code Style
- **Indentation**: 2 spaces (Standard for JS/Lit projects).
- **Naming**: 
  - Components: `dt-component-name` (custom element tag), `DtComponentName` (class name).
  - Files: `dt-component-name.js`.
- **Properties**: Use camelCase for properties in JS and kebab-case for attributes in HTML.
- **Documentation**: Use JSDoc for properties and methods.
- Don't add JavaScript when CSS or HTML can solve the problem
- Keep markup clean and readable

### CSS Preferences
- Use CSS variables from base classes (`--dt-color-primary`) instead of hard-coded values.
- For each component, inherit CSS variables from its base class (`DtFormBase`) and create additional CSS variables for component-specific styles 
  - Example: in `dt-text`, a border color should have a component-specific variable that falls back to the default: `var(--dt-text-border-color, var(--dt-form-border-color));`
- When editing an existing component, update the CSS variables according to the above 2 guidelines.
  - After any variables are changed in a component, update the `docs.mdx` file to reflect the changes.
- If the render function of a component uses input, select, or any other standard form elements, add a part attribute to it for advanced styling.
- Mobile-first responsive approach
  - Ensure all styles support touch input
- Ensure keyboard navigation support
  - Use tab index when appropriate to ensure keyboard navigation flows logically
- Prefer modern CSS (Grid, Flexbox, custom properties) over hacks
- Use relative units (rem, em) for typography and spacing
- Avoid !important except for utility overrides
- Keep specificity low and manageable

### Writing Stories
- For form components, set the title to be in the Components/Form/ directory, and use a human-friendly name for its title
- When writing stories, use the standard JSON object notation instead of Template.bind syntax.
```javascript
export const EnteredValue = {
  args: {
    value: 'Lorem Ipsum',
  },
};
```
- Use the render function to define the component markup and properties.
  - Use `ifDefined()` to prevent rendering of non-boolean properties that are undefined. `<dt-text id=${ifDefined(id)}`
  - Ensure at least all these standard properties are included and rendered:
    - id
    - name
    - label
    - value
    - disabled
    - required
    - requiredMessage
    - icon
    - iconAltText
    - private
      - This should replace isPrivate
      - When used in the HTML, it should be referenced as args.private and not destructured
    - privateLabel
    - loading
    - saved
    - error
    - slot
    - onChange
      - This should be set to `action('on-change')`
  - Set default values for the following properties:
    - `id = 'name',`
    - `name = 'field-name',`
    - `label = 'Field Name',`
    - `icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',`
    - `iconAltText = 'Icon Alt Text',`
  - The render function should not include a style tag with the theme CSS
  - For all component events, ensure the `action()` function from `@storybook/addon-actions` is used to log the event details to the Actions panel
    - Specify defaults for all events in the args of the component's story definition: `args: { onChange: action('on-change') }`
- Ensure that at least these standard stories are included at a minimum. There may be additional stories that are specific to the component's functionality beyond these:
  - Empty
    - No value set
  - EnteredValue / SelectedValue
    - Value set to an expected value
    - The exact name of this may change if the component implements different value types. Just ensure there is a test that includes a pre-set value
  - SvgIcon
    - Show label icon as an SVG
    - The value of the slot should be 'SvgIcon', not actual svg content
    - Set `icon` to null
  - AutoSave
    - The value of onChange should be onAutoSave from stories-utils.js
  - Disabled
    - Set disabled to true
  - PrivateField
    - Set private to true
    - The privateLabel should be set to a meaningful value
  - Loading
    - Set loading to true
    - Shows loading icon
  - Saved
    - Set saved to true
    - Shows saved checkmark icon
  - Error
    - Set error to sample error message
  - ErrorSlot
    - Set slot to ErrorSlot
    - Used for testing links in the error message
    - Set error to '[Should show link here]' to make sure it doesn't show
  - BasicForm
    - Set FormDecorator
    - Set a value
    - Used with the action panel to test the value submitted with forms
  - Required
    - Set FormDecorator
    - Set required to true
    - Used to ensure a blank value will trigger the required message on form submission
  - RequiredCustomMessage
    - Set FormDecorator
    - Set required to true
    - Set requiredMessage to 'Custom error message'
    - Used to ensure a blank value will trigger the required message on form submission
  - LocalizeRTL
    - Use LocaleDecorator
    - Set dir to 'rtl'
    - Set lang to 'ar'
    - Used to ensure RTL styles are applied correctly
  
### Component Documentation
- Use MDX to write component documentation.
- Use the `docs.mdx` file to document all component features and tech specs
- Add sections for:
  - Parameters
    - `<Controls />`
  - Slots
    - If there are no custom slots in the component, link to slots from the base class
  - Events
    - Subheadings for each event type
    - Add a description of the event details sent with the event
  - CSS Custom Properties
    - Link to inherited CSS variables from the base class
    - List all custom CSS variables defined in the component along with their default values
  - Parts
    - List all part names used in the component and a description of their purpose
- See `src/components/form/dt-text/docs.mdx` for an example.

## Testing Strategy
- Use `@open-wc/testing` for fixture-based testing.
- Use `@web/test-runner-commands` for simulating user interaction (typing, clicking).
- Ensure tests cover:
  - Default state
  - Property updates
  - Event dispatching (especially `change` events)
  - Accessibility (a11y)
- Add tests for any new features. Ensure they fail before the feature is implemented and pass when the feature is complete and enabled.
- Add stories to storybook for any new components or features.

## Useful Patterns
- **Boolean Attributes**: Always include `{ type: Boolean }` in static properties if the attribute should be a toggle.
- **Event Dispatching**: Use event details to provide change event details `this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }))` for form values.
```javascript
this.dispatchEvent(new CustomEvent('change', {
  detail: {
    field: this.name,
    oldValue: this.value,
    newValue: e.target.value, // use appropriate logic to determine what the new value is
  }
}
```
- **Slots**: Use standard slots or named slots as defined in `DtFormBase`.

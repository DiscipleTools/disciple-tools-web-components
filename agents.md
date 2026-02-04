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
- For each component, inherit CSS variables from its base class (`DtFormBase`) and create additional CSS variables for component-specific styles (e.g. `var(--dt-text-border-color, var(--dt-form-border-color));`)
- When editing an existing component, update the CSS variables according to the above 2 guidelines.
- Mobile-first responsive approach
- Prefer modern CSS (Grid, Flexbox, custom properties) over hacks
- Use relative units (rem, em) for typography and spacing
- Avoid !important except for utility overrides
- Keep specificity low and manageable

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
- **Event Dispatching**: Use `this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }))` for form values.
- **Slots**: Use standard slots or named slots as defined in `DtFormBase`.

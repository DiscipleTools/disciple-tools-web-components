# Disciple.Tools Web Components Library

Disciple.Tools Web Components is a Lit-based web components library providing standardized UI components for the [Disciple.Tools](https://github.com/DiscipleTools/disciple-tools-theme) ecosystem. The library includes form elements, layout components, and specialized tools built with modern web standards.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the information provided here.**

## Quick Start & Bootstrap

**CRITICAL REQUIREMENTS:**
- Node.js >=20.0.0 (verified working with v20.19.5)
- npm >=7.0.0 (verified working with v10.8.2)

**Essential Bootstrap Sequence:**
```bash
# 1. Install dependencies - NEVER CANCEL. Set timeout to 120+ seconds.
npm install
# Takes ~40 seconds, includes automatic build via prepublish hook

# 2. Verify installation with build
npm run build
# Takes ~1.5 seconds, creates dist/ directory with production files

# 3. Run tests to validate setup
npm run test  
# Takes ~40 seconds, runs 206 tests with 70%+ coverage. NEVER CANCEL. Set timeout to 90+ seconds.
```

## Development Workflow

### Local Development Server
```bash
# Start Vite development server 
npm start
# Serves on http://localhost:5173/, ready in ~200ms
# View demo components at root URL
```

### Storybook Development
```bash
# Start Storybook development server - NEVER CANCEL. Set timeout to 120+ seconds.
npm run storybook
# Takes ~30 seconds to start, serves on http://localhost:8080/
# Includes automatic custom elements manifest analysis

# Build Storybook for production - NEVER CANCEL. Set timeout to 180+ seconds.
npm run storybook:build  
# Takes ~18 seconds, outputs to storybook-static/
```

### Testing
```bash
# Run full test suite - NEVER CANCEL. Set timeout to 90+ seconds.
npm run test
# 206 tests, 6 skipped, ~40 seconds, 70%+ coverage

# Interactive test development - NEVER CANCEL.
npm run test:watch
# Watch mode with press F/D/M/Q/Enter controls
```

### Code Quality
```bash
# Lint code (will show existing issues - this is normal)
npm run lint
# Takes ~3 seconds, shows 113+ errors (development codebase)

# Auto-fix formatting issues
npm run format  
# Takes ~4 seconds, fixes auto-correctable issues
```

## Build & Distribution

### Production Build
```bash
# Build for distribution - NEVER CANCEL. Set timeout to 60+ seconds.
npm run build
# Takes ~1.5 seconds, creates multiple formats:
# - dist/index.js (IIFE for HTML script tags)
# - dist/index.es.js (ES modules)  
# - dist/index.umd.cjs (UMD/CommonJS)
# - Includes all 40+ locale files
```

### Custom Elements Analysis
```bash
# Generate custom elements manifest
npm run analyze
# Takes ~2 seconds, creates custom-elements.json
```

## Localization Workflow

### Extract Messages
```bash
# Extract translatable strings - NEVER CANCEL. Set timeout to 60+ seconds.
npm run localize:extract
# Takes ~3 seconds, extracts 18+ messages to xliff/ directory
```

### Build Localized Templates  
```bash
# Build locale templates - NEVER CANCEL. Set timeout to 60+ seconds.
npm run localize:build
# Takes ~3 seconds, generates src/i18n/generated/ files
# Shows missing translations (normal - uses fallbacks)
```

## Validation & Manual Testing

**ALWAYS validate changes by running through complete user scenarios:**

### Core Validation Scenarios
1. **Component Rendering**: Load http://localhost:5173/ and verify all form elements render correctly
2. **Interactive Testing**: Test text input, toggles, dropdowns, date pickers
3. **Built Components**: Test samples/html/ with built dist/index.js  
4. **Storybook Validation**: Verify components work in Storybook environment

### HTML Sample Testing
```bash
# Test built components in plain HTML
cd samples/html
python3 -m http.server 8000
# Visit http://localhost:8000/ to test dist/index.js integration
```

## Project Structure

### Key Directories
- **`/src/components/`** - Main component library
  - **`/src/components/form/`** - Form components (dt-text, dt-button, etc.)
  - **`/src/components/layout/`** - Layout components (dt-tile, dt-modal, etc.)
  - **`/src/components/icons/`** - Icon components
- **`/samples/`** - Usage examples for different frameworks
  - **`/samples/html/`** - Plain HTML usage example  
  - **`/samples/react-include/`** - React integration
  - **`/samples/vue-include/`** - Vue integration
  - **`/samples/lit-extend/`** - Lit extension patterns
- **`/.storybook/`** - Storybook configuration
- **`/documentation/`** - Docusaurus documentation site
- **`/xliff/`** - Localization files (40+ languages)

### Component Structure Pattern
Each component follows this structure (see `src/components/form/dt-text/`):
- **`component.js`** - Main component implementation
- **`component.stories.js`** - Storybook stories
- **`component.test.js`** - Unit tests  
- **`docs.mdx`** - Documentation

## CI/CD & GitHub Actions

### Test Pipeline (.github/workflows/test.yml)
- Runs on push/PR to master branch
- Node.js 20.x matrix
- Steps: checkout → setup-node → npm ci → npm test

### Publish Pipeline (.github/workflows/publish.yml)  
- Triggered on version tags (v*.*)
- Runs tests before publishing to npm
- Uses NPM_TOKEN secret

## Common Issues & Solutions

### Known Issues (Normal - Do Not Fix)
- **Linting errors**: 113+ errors in development codebase (existing code quality issues)
- **Multiple Lit versions warning**: Normal during development
- **Missing localization strings**: Uses English fallbacks automatically
- **samples/lit-extend dependency error**: Missing @disciple.tools/web-components resolution

### Build Troubleshooting
- **npm install fails**: Check Node.js version >= 20.0.0
- **Tests fail**: Ensure clean install with `npm ci`
- **Storybook fails**: Run `npm run analyze` first

## Standards & Development Guidelines

### Component Standards
- Follow patterns in **`Standards.md`** file
- Use **`DtFormBase`** for form components
- Include proper accessibility attributes
- Add localization support with `msg()` function

### Required Props Pattern
Standard properties for form components:
- `id`, `name`, `label`, `value`
- `disabled`, `required`, `requiredMessage`  
- `icon`, `iconAltText`
- `private`, `privateLabel`
- `loading`, `saved`, `error`

### Testing Requirements
- Test file for each component
- Coverage >70% (current: 70.58%)
- Use @open-wc/testing framework
- Include accessibility tests

## Performance Notes

**NEVER CANCEL operations - builds may take longer than expected:**
- **npm install**: 40 seconds (includes automatic build)
- **npm test**: 40 seconds (full test suite)  
- **npm run storybook**: 30 seconds (includes analysis)
- **npm run storybook:build**: 18 seconds (production build)
- **npm run build**: 1.5 seconds (very fast!)
- **npm run localize:** commands: 2-3 seconds each

**Set appropriate timeouts:**
- Install/test commands: 90-120 seconds minimum
- Storybook commands: 120-180 seconds minimum  
- Build commands: 60 seconds minimum
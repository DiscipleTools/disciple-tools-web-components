# Disciple Tools Web Component Library

These web components mostly follow the [open-wc](https://github.com/open-wc/open-wc) recommendations.

## Installation

Clone the Repo then run
```bash
npm install
```

## Demoing with Storybook
See the current Storybook [here](https://jade-chebakia-17493f.netlify.app/).

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

<!-- ## Usage

```html
<script type="module">
  import 'dt-text/dt-text.js';
</script>

<dt-text></dt-text>
``` -->

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

![Test Status](https://github.com/DiscipleTools/disciple-tools-web-components/actions/workflows/test.yml/badge.svg?event=push)

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

### Resources for writing tests
- [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/) - Overall testing framework
- [@web/test-runner-commands](https://modern-web.dev/docs/test-runner/commands/) - simulating keyboard/mouse input
- [ChaiJS](https://www.chaijs.com/api/bdd/) - Basic assertions
- [Chai DOM](https://github.com/nathanboktae/chai-dom) - DOM assertions

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Localization
Localization happens in 3 steps:
1. Use localized strings in code 
2. Extract all of the strings used in the code to XLIFF file
3. Build localized templates for use in code

### Using localized strings
See [Lit Localize docs](https://lit.dev/docs/localization/overview/#message-types) for full documentation.

When outputing text within a component that is not coming from the user (and would thus be translated by the user), use the `msg` function:

```
import {msg} from '@lit/localize';

class MyComp extends LitElement {
  render() {
    return msg(html`Hello <b>${this.who}</b>`);
  }
}
customElements.define('my-comp', MyComp);
```

The locale can either be passed into the component via attribute/property, or else it will attempt to read the direction and language from the nearest parent elements with `dir` and/or `lang` attributes.

### Extract Messages
See [Lit Localize docs](https://lit.dev/docs/localization/overview/#extracting-messages) for full documentation.

Run `lit-localize extract` in the console to generate XLIFF files into the `/xliff/` directory. These should be able to be imported into translation software for translators to set the values. 

The XLIFF files should be updated by translators and saved back into the space directory with correct translations.

### Build localized templates
See [Lit Localize docs](https://lit.dev/docs/localization/overview/#building-localized-templates) for full documentation.

Run `lit-localize build` to process XLIFF files into javascript files that are saved into `/i18n/generated/{locale}.js`. These files are used by the `msg` function to use the correct localized string based on the selected locale.

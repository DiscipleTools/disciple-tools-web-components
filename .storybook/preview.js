import { withCssFileTheme } from './themeDecorator.js';
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
setCustomElementsManifest(customElements);

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'mock-service-worker.js',
        {
          scope: '/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();

document.documentElement.setAttribute('lang', 'en');
document.documentElement.setAttribute('dir', 'ltr');

/** @type { import('@storybook/web-components').Preview } */
export default {
  parameters: {
    docs: {
      toc: {
        headingSelector: 'h1, h2',
      },
    },
  },
};

export const decorators = [
  withCssFileTheme({
    // These keys are the labels that will be displayed in the toolbar theme switcher
    // The values must match the CSS filenames in ./src/styles (without the .css suffix)
    themes: {
      light: 'light',
      dark: 'dark',
      dim: 'dim',
    },
    defaultTheme: 'light', // The key of your default theme
  }),
];

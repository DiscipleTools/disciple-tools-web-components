import { setCustomElementsManifest } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';
import customElements from '../custom-elements.json';
setCustomElementsManifest(customElements);

import '../src/styles/components.css';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'mock-service-worker.js',
        {
          scope: '/',
        },
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
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'dt-theme-light',
      dark: 'dt-theme-dark',
      dim: 'dt-theme-dim',
    },
    defaultTheme: 'light',
  }),
];

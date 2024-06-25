import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json' with { type: "json" };
import '../src/styles/light.css' with { type: "css" };

setCustomElementsManifest(customElements);

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'assets/mocks/mock-service-worker.js',
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

// …

registerServiceWorker();

document.documentElement.setAttribute('lang', 'en');
document.documentElement.setAttribute('dir', 'ltr');

export default {
  parameters: {
    docs: {
      toc: {
        headingSelector: 'h1, h2'
      },
    },
  },
};

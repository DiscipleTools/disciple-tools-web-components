import { useEffect } from '@storybook/preview-api';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { DecoratorFunction, Renderer } from '@storybook/types';

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

const DEFAULT_ELEMENT_SELECTOR = 'html';

const classStringToArray = (classString) => classString.split(' ').filter(Boolean);

export const withCssFileTheme = ({ themes, defaultTheme, parentSelector = DEFAULT_ELEMENT_SELECTOR }) => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (storyFn, context) => {
    const { themeOverride } = useThemeParameters();
    const selected = pluckThemeFromContext(context);

    useEffect(() => {
      const selectedThemeName = themeOverride || selected || defaultTheme;
      const head = document.querySelector('head');

      if (!head) {
        return;
      }

      // e.g. <link href="/src/styles/light.css" type="text/css" rel="stylesheet" data-theme="light">
      Object.entries(themes)
        .filter(([themeName]) => themeName !== selectedThemeName)
        .forEach(([themeName, className]) => {
          const link = head.querySelector(`link[data-theme="${themeName}"]`);
          if (link) {
            link.remove();
          }
        });

      const link = `<link href="/src/styles/${themes[selectedThemeName]}.css" type="text/css" rel="stylesheet" data-theme="${themes[selectedThemeName]}">`
      document.head.innerHTML += link;
    }, [themeOverride, selected, parentSelector]);

    return storyFn();
  };
};

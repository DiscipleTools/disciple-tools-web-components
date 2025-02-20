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

      let linkExists = false
      head.querySelectorAll('link[data-theme]').forEach((el) => {
        if (!linkExists && el.dataset.theme === selectedThemeName) {
          linkExists = true;
        } else {
          el.remove();
        }
      });

      if (!linkExists) {
        const link = `<link href="/${themes[selectedThemeName]}.css" type="text/css" rel="stylesheet" data-theme="${selectedThemeName}">`
        document.head.innerHTML += link;
      }
    }, [themeOverride, selected, parentSelector]);

    return storyFn();
  };
};

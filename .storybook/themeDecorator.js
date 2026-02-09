import { useEffect } from '@storybook/preview-api';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { DecoratorFunction, Renderer } from '@storybook/types';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

const DEFAULT_ELEMENT_SELECTOR = 'html';

const classStringToArray = classString =>
  classString.split(' ').filter(Boolean);

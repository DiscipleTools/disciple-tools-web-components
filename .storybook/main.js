const replace = require('@rollup/plugin-replace');
const path = require('path');
import remarkGfm from 'remark-gfm';

const config = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.js',
    '../src/components/*.stories.js',
  ],
  framework: {
    name: '@web/storybook-framework-web-components',
  },
  docs: {
    autodocs: true,
  },
  addons: [
    // Other Storybook addons
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-themes',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  staticDirs: ['../assets'],
  rollupFinal(config) {
    config.plugins.unshift(replace({
      include: ['src/**/*.stories.js'],
      preventAssignment: true,
      values: {
        'process.env.STORYBOOK_MAPBOX_TOKEN': `"${process?.env?.STORYBOOK_MAPBOX_TOKEN || 'dummytoken'}"`,
        'process.env.STORYBOOK_GOOGLE_GEOCODE_TOKEN': `"${process?.env?.STORYBOOK_GOOGLE_GEOCODE_TOKEN || 'dummytoken'}"`,
      },
    }));

    return config;
  },
};

export default config;

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
import remarkGfm from 'remark-gfm';

const config = {
  stories: [
    "../src/docs/**/*.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
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
  staticDirs: ['../assets', '../src/styles'],
};
export default config;

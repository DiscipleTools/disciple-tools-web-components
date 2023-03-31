const replace = require('@rollup/plugin-replace');

module.exports = {
  stories: [
    '../src/components/**/*.stories.js',
    '../src/components/*.stories.js',
  ],
  staticDirs: ['../assets'],
  rollupConfig(config) {
    config.plugins.unshift(replace({
      include: ['src/**/*.stories.js'],
      preventAssignment: true,
      values: {
        'process.env.STORYBOOK_MAPBOX_TOKEN': `"${process?.env?.STORYBOOK_MAPBOX_TOKEN || 'dummytoken'}"`,
        'process.env.STORYBOOK_GOOGLE_GEOCODE_TOKEN': `"${process?.env?.STORYBOOK_GOOGLE_GEOCODE_TOKEN || 'dummytoken'}"`,
      },
    }))

    return config;
  },
};

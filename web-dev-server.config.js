import * as dotenv from 'dotenv';
dotenv.config();
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
const replace = fromRollup(rollupReplace);
// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/src/components/dt-text/demo/',
  /** Use regular watch mode if HMR is not enabled. */
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
    {
      name: 'my-plugin',
      transform(context) {
        if (context.path === '/assets/mocks/mock-service-worker.js') {
          context.set('Service-Worker-Allowed', '/');
        }
      },
    },
    replace({
      include: ['src/**/*.stories.js'],
      'process.env.STORYBOOK_MAPBOX_TOKEN': `"${process?.env?.STORYBOOK_MAPBOX_TOKEN || 'dummytoken'}"`,
      'process.env.STORYBOOK_GOOGLE_GEOCODE_TOKEN': `"${process?.env?.STORYBOOK_GOOGLE_GEOCODE_TOKEN || 'dummytoken'}"`
    }),
  ],

  // See documentation for all available options
});

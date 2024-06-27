import { legacyPlugin } from '@web/dev-server-legacy';
import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

const filteredLogs = ['Running in dev mode', 'Lit is in dev mode'];

export default {
  testsFinishTimeout: 30000,
  /** Test files to run */
  files: [
    'src/**/*.test.js',
  ],
  nodeResolve: true,
  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },
  plugins: [
    vitePlugin(),

    // make sure this plugin is always last
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        // Inject lit's polyfill-support module into test files, which is required
        // for interfacing with the webcomponents polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          },
        ],
      },
    }),
  ],
};
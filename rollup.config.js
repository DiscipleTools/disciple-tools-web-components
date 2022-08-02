import resolve from '@rollup/plugin-node-resolve';
import {copy} from '@web/rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import multiInput from 'rollup-plugin-multi-input';

const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'build/node_modules' },
  ]
};

const config = {
  input: [
    './src/components/**/*.js',
    '!./src/components/**/*.stories.js',
    '!./src/components/**/*.test.js',
  ],
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    multiInput({
      relative: 'src/components',
    }),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
    copy(copyConfig),
  ],
  preserveEntrySignatures: false
};

export default config;

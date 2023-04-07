import { terser } from 'rollup-plugin-terser';
import summary from 'rollup-plugin-summary';

export default {
  input: [
    './src/services/index.js',
  ],
  output: {
    file: 'dist/services.min.js',
    format: 'iife',
    name: 'WebComponentServices',
  },
  plugins: [
    terser({
      ecma: 2020,
      warnings: true,
    }),
    summary(),
  ],
};

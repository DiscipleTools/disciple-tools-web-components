import { resolve } from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
  build: {
    // https://vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'DtWebComponents',
      formats: ['es', 'umd', 'iife'],
      fileName: (format, entryName) => {
        // make iife the default version in /dist/index.js
        if (format === 'iife') {
          return `${entryName}.js`;
        }
        return `${entryName}.${format}.${['cjs','umd'].includes(format) ? 'cjs' : 'js'}`;
      },
    },
    copyPublicDir: false,
  },
  define: {
    __LIB_VERSION__: JSON.stringify(pkg.version),
  },
})

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global";`,
      },
    },
  },
  resolve: {
    alias: {
      assets: '/src/assets/index.ts',
      components: '/src/components/',
      features: '/src/features/',
      pages: '/src/pages/',
      store: '/src/store/index.ts',
      utils: '/src/utils/',
    },
  },
});

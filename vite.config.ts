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
        additionalData: `@import "./src/assets/styles/global";`,
      },
    },
  },
  resolve: {
    alias: {
      assets: '/src/assets/index.ts',
      'components/layout': '/src/components/layout/index.tsx',
      'components/shared': '/src/components/shared/index.tsx',
      'components/ui': '/src/components/ui/index.tsx',
      features: '/src/features/index.ts',
      pages: '/src/pages/index.tsx',
      store: '/src/store/index.ts',
      'utils/constants': '/src/utils/constants/index.ts',
      'utils/helpers': '/src/utils/helpers/index.ts',
      'utils/types': '/src/utils/types/index.ts',
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@services': '/src/services',
      '@interfaces': '/src/interfaces',
      '@enums': '/src/enums',
      '@api': '/src/services/api',
      '~types': '/src/types'
    }
  }
});

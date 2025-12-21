import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'canias',
      filename: 'remoteEntry.js',
      exposes: {
        './SYST99': './src/pages/SYST99.vue',
      },
      shared: {
        vue: { version: '^3.5.24' },
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 5013,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    modulePreload: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5013,
    cors: true,
  },
});
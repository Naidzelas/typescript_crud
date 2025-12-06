import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'client',
      filename: 'remoteEntry.js',
      exposes: {
        './Clients': './src/pages/Clients.vue',
      },
      shared: ['vue'],
    }),
    tailwindcss(),
  ],
  server: {
    port: 5010,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    modulePreload: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5010,
    cors: true,
  },
});
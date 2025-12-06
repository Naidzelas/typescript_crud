import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './ImportClients': './src/components/ImportClients.vue',
      },
      shared: ['vue'],
    }),
  ],
  server: {
    port: 5012,
  },
});
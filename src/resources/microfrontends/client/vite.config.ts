import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

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
  ],
  server: {
    port: 5011,
  },
});
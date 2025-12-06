import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        "client": "http://localhost:5010/assets/remoteEntry.js",
        "admin": "http://localhost:5012/assets/remoteEntry.js",
      },
      shared: ['vue'],
    }),
  ],
  server: {
    port: 5011,
  },
});
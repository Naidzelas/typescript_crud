import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {
        client: 'http://localhost:5010/assets/remoteEntry.js',
        admin: 'http://localhost:5012/assets/remoteEntry.js',
      },
      shared: ['vue'],
    }),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
});
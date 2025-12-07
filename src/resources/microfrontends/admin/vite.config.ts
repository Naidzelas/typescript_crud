import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './UploadButton': './src/components/UploadButton.vue',
        './UpdatePostcodes': './src/components/UpdatePostcodes.vue',
      },
      shared: {
        vue: { version: '^3.5.24' },
        primevue: { version: '^4.5.1' },
        '@primeuix/themes': { version: '^2.0.2' },
        'primevue/config': { version: '^4.5.1' },
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 5012,
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
    port: 5012,
    cors: true,
  },
});
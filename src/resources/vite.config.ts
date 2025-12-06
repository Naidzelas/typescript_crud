import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host",
      remotes: {
        client: "http://localhost:5010/assets/remoteEntry.js",
        admin: "http://localhost:5012/assets/remoteEntry.js",
      },
      shared: {
        vue: { version: "^3.5.24" },
        primevue: { version: "^4.5.1" },
        "@primeuix/themes": { version: "^2.0.2" },
        "primevue/config": { version: "^4.5.1" },
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
  build: {
    target: "esnext",
    minify: false,
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ["quill", "chart.js", "chart.js/auto"],
    },
  },
});

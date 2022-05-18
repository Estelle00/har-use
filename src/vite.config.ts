import { resolve } from "path";
import { defineConfig } from "vite";
import createVueDoc from "./.vitepress/plugins/vite-plugin-doc";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  resolve: {
    alias: {
      "@har/use": fileURLToPath(new URL("./index.ts", import.meta.url)),
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    fs: {
      allow: [resolve(__dirname, "..")],
    },
  },
  plugins: [createVueDoc()],
});

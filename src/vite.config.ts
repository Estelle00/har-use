import { resolve } from "path";
import { defineConfig } from "vite";
import createVueDoc from "./.vitepress/plugins/vite-plugin-doc";

export default defineConfig(async () => {
  return {
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [resolve(__dirname, "..")],
      },
    },
    plugins: [createVueDoc()],
  };
});

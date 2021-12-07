import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";

console.log(path.resolve(__dirname, "../src/index.ts"));
export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      "@har/use": path.resolve(__dirname, "./src/index.ts"),
    },
  },
  plugins: [vue(), vueJsx()],
});

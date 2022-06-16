import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "url";
export default defineConfig(() => {
  return {
    publicDir: false,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@har/use": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [dts()],
  };
});

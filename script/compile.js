const { build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
build({
  mode: "production",
  build: {
    emptyOutDir: true,
    minify: false,
    brotliSize: false,
    outDir: "dist",
    rollupOptions: {
      input: ["src/index.ts"],
      output: [
        {
          format: "es",
          dir: "dist/es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        {
          format: "commonjs",
          dir: "dist/lib",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
      ],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    {
      name: "vite:external-node_modules",
      enforce: "pre",
      async resolveId(source, importer) {
        const result = await this.resolve(source, importer, {
          skipSelf: true,
          custom: { "node-resolve": {} },
        });

        if (result && /node_modules/.test(result.id)) {
          return false;
        }

        return null;
      },
    },
    vue(),
    vueJsx(),
  ],
});

import type { Plugin } from "vite";
import { getCache } from "./cache";
import { transformDemo, transformMain } from "./markdownToVue";
import {isDemo, isVirtualModule} from "./utils";
export interface Options {
  srcDir?: string;
}
export default function createVueDoc(options: Options = {}): Plugin {
  const { srcDir } = Object.assign(
    {
      srcDir: process.cwd(),
    },
    options
  );

  let vuePlugin: Plugin | undefined;
  return {
    name: "vite:vue-doc",
    enforce: "pre",
    // configResolved(resolverConfig) {
    //   vuePlugin = resolverConfig.plugins.find((p) => p.name === "vite:vue");
    // },
    resolveId(id: string) {
      if (isVirtualModule(id)) return id;
      return null;
    },
    load(id) {
      if (isVirtualModule(id)) {
        return getCache(id);
      }
      return null;
    },
    transform(code, id) {
      if (isVirtualModule(id)) return null;
      if (isDemo(id)) {
        return transformDemo(code, id);
      }
      if (!id.endsWith(".md")) return null;
      return transformMain(code);
    },
  };
}

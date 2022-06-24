// @ts-ignore
import type { Plugin } from "vite";
import { getCache } from "./cache";
import { transformDemo } from "./markdownToVue";
import {getVirtualPath, isDemo, isVirtualModule} from "./utils";
export default function createVueDoc(): Plugin {
  let vuePlugin: Plugin | undefined;
  return {
    name: "vite:vue-doc",
    enforce: "pre",
    configResolved(resolverConfig) {
      vuePlugin = resolverConfig.plugins.find((p) => p.name === "vite:vue");
    },
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
    },
    async handleHotUpdate(ctx) {
      const { file, read, server, timestamp, modules } = ctx;
      if (vuePlugin && isDemo(file)) {
        const updated = []
        const content = await read();
        const code = transformDemo(content, file);
        const virtualDemoPath = getVirtualPath(file);
        const mods = server.moduleGraph.getModulesByFile(virtualDemoPath);
        if (mods) {
          const ret = await vuePlugin.handleHotUpdate?.({
            file: virtualDemoPath,
            timestamp,
            modules: [...mods],
            server,
            read: () => getCache(virtualDemoPath),
          });
          updated.push(...(ret || []));
        }
      const ret = await vuePlugin.handleHotUpdate?.({
        file,
        timestamp,
        modules,
        server,
        read: () => code,
      });
      return [...updated, ...(ret || [])];
      }
      return undefined;
    },
  };
}

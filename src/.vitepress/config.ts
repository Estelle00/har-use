import { defineConfig } from "vitepress";
// @ts-ignore
import pkg from "../../package.json";
import path from "node:path";
import { pascalCase } from "change-case";
import { fileURLToPath, URL } from "url";
import createVueDoc from "./plugins/vite-plugin-doc";
import createMarkdown from "./markdown";

function insertStr(source: string, start: number, newStr: string) {
  return source.slice(0, start) + newStr + source.slice(start);
}
export default defineConfig({
  title: "har-use",
  lang: "zh-CN",
  outDir: "../public",
  base: "/har-use/",
  vue: {
    reactivityTransform: true,
  },
  vite: {
    resolve: {
      alias: {
        "@har/use": fileURLToPath(new URL("../index.ts", import.meta.url)),
        "@": fileURLToPath(new URL("..", import.meta.url)),
      },
    },
    plugins: [createVueDoc()],
  },
  markdown: {
    config: (md) => {
      createMarkdown(md);
      // md.core.ruler.push("script", (state) => {
      //   state.tokens.forEach((token) => {
      //     if (token.type === "html_block") {
      //       const rule = /<\s*script[^>]*\bsetup\b>/;
      //       const match = rule.exec(token.content);
      //       if (match) {
      //         token.tag = "setup";
      //         token.info = match[0];
      //       }
      //     }
      //   });
      // });
      // return;
      // md.core.ruler.push("file_import", (state) => {
      //   let imports: string = "";
      //   let setupToken: any;
      //   function insert(str: string) {
      //     setupToken.content = insertStr(
      //       setupToken.content,
      //       setupToken.info.length,
      //       str
      //     );
      //   }
      //   function insertSetupContent(str?: string) {
      //     if (setupToken) {
      //       if (imports) {
      //         insert(imports);
      //         imports = "";
      //       } else if (str) {
      //         insert(str);
      //       }
      //     } else {
      //       imports += str;
      //     }
      //   }
      //   state.tokens.forEach((token) => {
      //     if (token.tag === "setup") {
      //       setupToken = token;
      //       insertSetupContent();
      //       return;
      //     }
      //     const rule = /^@\[preview]\((.+)\)/;
      //     const match = rule.exec(token.content);
      //     if (match) {
      //       token.type = "file_import";
      //       const filePath = match[1];
      //       // const filename = match[1].replace(/['"]/g, "");
      //       const basename = path.basename(filePath, ".md");
      //       token.meta = {
      //         filePath,
      //         basename,
      //       };
      //       const componentName = pascalCase(`demo-${basename}`);
      //       insertSetupContent(`import ${componentName} from "${filePath}";\n`);
      //     }
      //   });
      //   if (!setupToken && imports) {
      //     setupToken = new state.Token("html_block", "script", 0);
      //     setupToken.content = `<script setup>${imports}</script>`;
      //     state.tokens.push(setupToken);
      //   }
      // });
      // md.renderer.rules.file_import = function (tokens, idx, env) {
      //   const token = tokens[idx];
      //   const { basename, filePath } = token.meta;
      //   const componentName = pascalCase(`demo-${basename}`);
      //   // @ts-ignore
      //   const code = md.render(`@[code](${filePath})`, { filePath: md.__path });
      //   return `<code-block>
      //     <cell-demo>
      //       <${componentName} />
      //     </cell-demo>
      //     <cell-code>
      //       ${code}
      //     </cell-code>
      //   </code-block>`;
      // };
    },
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: "最近更新时间",
    editLink: {
      pattern: "https://git.huianrong.com/frontend/har-use/src/:path",
      text: "编辑这个文档",
    },
    socialLinks: [
      {
        icon: "github",
        link: pkg.repository.url,
      },
    ],
    sidebar: [
      {
        text: "core",
        items: [
            {
              text: "useClickAway",
              link: "/useClickAway/",
            },
            {
              text: "useCountDown",
              link: "/useCountDown/",
            },
            {
              text: "useEventBus",
              link: "/useEventBus/",
            },
            {
              text: "useEventListener",
              link: "/useEventListener/",
            },
            {
              text: "useGlobalState",
              link: "/useGlobalState/",
            },
            {
              text: "useRect",
              link: "/useRect/",
            },
            {
              text: "useStorage",
              link: "/useStorage/",
            },
            {
              text: "useTitle",
              link: "/useTitle/",
            },
            {
              text: "useToggle",
              link: "/useToggle/",
            },
            {
              text: "useWindowSize",
              link: "/useWindowSize/",
            },
        ]
      },
      {
        text: "useRequest",
        items: [
          {
            text: "快速上手",
            link: "/useRequest/",
          },
          {
            text: "基础用法",
            link: "/useRequest/basic",
          },
        ]
      }
    ]
  },
});

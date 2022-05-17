import { defineConfig } from "vitepress";
// @ts-ignore
import base from "@vue/theme/config";
// @ts-ignore
import pkg from "../../package.json";
import path from "node:path";
import { pascalCase } from "change-case";
import Token from "markdown-it/lib/token";

function insertStr(source: string, start: number, newStr: string) {
  return source.slice(0, start) + newStr + source.slice(start);
}

export default defineConfig({
  title: "har-use",
  lang: "zh-CN",
  vue: {
    reactivityTransform: true
  },
  markdown: {
    config: (md) => {
      md.core.ruler.push("script", state => {
        state.tokens.forEach(token => {
          if (token.type === "html_block") {
            const rule =/<\s*script[^>]*\bsetup\b>/;
            const match = rule.exec(token.content);
            if (match) {
              token.tag = "setup";
              token.info = match[0];
            }
          }
        })
      })
      md.core.ruler.push("file_import", state => {
        let imports: string = "";
        let setupToken: any;
        function insert(str: string) {
          setupToken.content = insertStr(setupToken.content, setupToken.info.length, str);
        }
        function insertSetupContent(str?: string) {
          if (setupToken) {
            if (imports) {
              insert(imports);
              imports = "";
            } else if (str){
              insert(str);
            }
          } else {
            imports += str;
          }
        }
        state.tokens.forEach(token => {
          if (token.tag === "setup") {
            setupToken = token;
            insertSetupContent();
          }
          const content  = token.content;
          const rule = /^@import\s+(.+)(?:\n|$)/;
          const match = rule.exec(content);
          if (match) {
            token.type = "file_import";
            const filename = match[1].replace(/['"]/g, "");
            const basename = path.basename(filename, ".md");
            token.meta = {
              filename,
              basename
            }
            const componentName = pascalCase(`demo-${basename}`);
            insertSetupContent(`import ${componentName} from "${filename}";\n`);
          }
        });
        if (!setupToken) {
          const newToken = new Token("html_block", "setup", 0);
          newToken.content = `<script setup>${imports}</script>`;
          state.tokens.push(newToken);
        }
      })
      // @ts-ignore
      md.renderer.rules.file_import = function (tokens, idx) {
        const token = tokens[idx];
        const { basename } = token.meta;
        const componentName = pascalCase(`demo-${basename}`);
        return `<${componentName} />`
      }
      md.renderer.rules.table_open = function (tokens, idx) {
        return `<a-table class="component-api-table">`;
      }
      md.renderer.rules.thead_open = function (tokens, idx) {
        return `<a-thead>`;
      }
      md.renderer.rules.tbody_open = function (tokens, idx) {
        return `<a-tbody>`;
      }
      md.renderer.rules.tr_open = function (tokens, idx) {
        return `<a-tr>`;
      }
      md.renderer.rules.th_open = function (tokens, idx) {
        return `<a-th>`;
      }
      md.renderer.rules.td_open = function (tokens, idx) {
        return `<a-td>`;
      }
      md.renderer.rules.td_close = function (tokens, idx) {
        return `</a-td>`;
      }
      md.renderer.rules.th_close = function (tokens, idx) {
        return `</a-th>`;
      }
      md.renderer.rules.tr_close = function (tokens, idx) {
        return `</a-tr>`;
      }
      md.renderer.rules.thead_close = function (tokens, idx) {
        return `</a-thead>`;
      }
      md.renderer.rules.tbody_close = function (tokens, idx) {
        return `</a-tbody>`;
      }
      md.renderer.rules.table_close = function (tokens, idx) {
        return `</a-table>`;
      }
    },
  },
  themeConfig: {
    docsDir: "src",
    editLinks: true,
    editLinkText: "编辑这个文档",
    repo: pkg.repository.url,
    repoLabel: "gitlab",
    lastUpdated: true,
    nav: [
      {
        text: "核心方法",
        link: "/"
      },
    ],
    sidebar: {
      "/": [
        {
          text: "useCountDown",
          link: "/useCountDown/"
        },
        {
          text: "useToggle",
          link: "/useToggle/"
        },
      ]
    }
  }
});

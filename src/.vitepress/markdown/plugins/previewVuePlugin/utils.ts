import type Token from "markdown-it/lib/token";
import type MarkdownIt from "markdown-it";
import { pascalCase } from "change-case";

function insertStr(source: string, start: number, newStr: string) {
  return source.slice(0, start) + newStr + source.slice(start);
}
export function addScriptRuler(md: MarkdownIt) {
  md.core.ruler.push("script", (state) => {
    state.tokens.forEach((token) => {
      if (token.type === "html_block") {
        const rule = /<\s*script[^>]*\bsetup\b>/;
        const match = rule.exec(token.content);
        if (match) {
          token.tag = "setup";
          token.meta = match[0].length;
        }
      }
    });
  });
}

let SETUP_NUMBER = 14;
export function addFileImport(md: MarkdownIt) {
  md.core.ruler.push("file_import", (state) => {
    let setupToken: Token;
    let imports = "";
    state.tokens.forEach((token) => {
      if (token.tag === "setup") {
        setupToken = token;
      }
      const match =
        token.type === "inline" && token.content.match(/^@\[preview]\((.+)\)/);
      if (match) {
        token.type = "file_import";
        const filePath = match[1];
        const componentName = pascalCase(`demo-${filePath}`);
        token.meta = {
          filePath,
          componentName,
        };
        imports += `import ${componentName} from "${filePath}";\n`;
      }
    });
    // @ts-ignore
    if (setupToken) {
      setupToken.content = insertStr(
        setupToken.content,
        setupToken.meta,
        imports
      );
    } else {
      const newToken = new state.Token("html_block", "setup", 0);
      newToken.content = `<script setup>${imports}</script>`;
      state.tokens.push(newToken);
    }
  });

  md.renderer.rules.file_import = function (tokens, idx) {
    const token = tokens[idx];
    const { filePath, componentName } = token.meta;
    // @ts-ignore
    const code = md.render(`@[code](${filePath})`, { filePath: md.__path });
    if (!/\.vue$/.test(filePath)) {
      return code + "<!-- ";
    }
    return `<${componentName}>${code}</${componentName}>`;
  };
}

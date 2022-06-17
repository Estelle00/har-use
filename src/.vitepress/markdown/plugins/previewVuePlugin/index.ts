import { defineMarkdownPlugin } from "../../defineMarkdownPlugin";
import type Token from "markdown-it/lib/token";
import path from "node:path";
import { pascalCase } from "change-case";

function insertStr(source: string, start: number, newStr: string) {
  return source.slice(0, start) + newStr + source.slice(start);
}
export const previewVuePlugin = defineMarkdownPlugin((md) => {
  let setupToken: Token;
  md.core.ruler.push("script", (state) => {
    state.tokens.forEach((token) => {
      if (token.type === "html_block") {
        const rule = /<\s*script[^>]*\bsetup\b>/;
        const match = rule.exec(token.content);
        if (match) {
          token.meta = match[0].length;
          setupToken = token;
        }
      }
    });
    if (!setupToken) {
      setupToken = new state.Token("script", "", 0);
      setupToken.content = "<script setup></script>\n"
      setupToken.meta = 14;
      state.tokens.push(setupToken);
    }
  });

  function insert(str: string) {
    setupToken.content = insertStr(
      setupToken.content,
      setupToken.meta,
      str
    );
  }
  let hasImportBlockOpen = false;
  let importBlockIndex = 0;
  md.renderer.rules.paragraph_open = function (
    tokens,
    idx,
    options,
    env,
    self
  ) {
    const contentToken = tokens[idx + 1];
    const match =
      contentToken.type === "inline" &&
      contentToken.content.match(/^@\[preview]\((.+)\)/);
    if (!match) {
      return self.renderToken(tokens, idx, options);
    }
    importBlockIndex = idx;
    hasImportBlockOpen = true;
    const filePath = match[1];
    const basename = path.basename(filePath, ".md");
    const componentName = pascalCase(`demo-${basename}`);
    insert(`import ${componentName} from "${filePath}";\n`);
    // @ts-ignore
    const code = md.render(`@[code](${filePath})`, { filePath: md.__path });
    // const code = "md.render(`@[code](${filePath})`, { filePath: md.__path })";
    if (!/\.vue$/.test(filePath)) {
      return code + "<!-- ";
    }
    return `<code-block>
          <cell-demo>
            <${componentName} />
          </cell-demo>
          <cell-code>
            ${code}
          </cell-code>
        </code-block><!-- `;
  };
  md.renderer.rules.paragraph_close = function (
    tokens,
    idx,
    options,
    env,
    self
  ) {
    if (hasImportBlockOpen && importBlockIndex + 2 === idx) {
      hasImportBlockOpen = false;
      return " -->";
    }
    return self.renderToken(tokens, idx, options);
  };
});

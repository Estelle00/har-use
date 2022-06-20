import { defineMarkdownPlugin } from "../../defineMarkdownPlugin";
import path from "node:path";
import { pascalCase } from "change-case";
import { addFileImport, addScriptRuler } from "./utils";

export const previewVuePlugin = defineMarkdownPlugin((md) => {
  addScriptRuler(md);
  addFileImport(md);
  // let hasImportBlockOpen = false;
  // let importBlockIndex = 0;
  //
  // md.renderer.rules.paragraph_open = function (
  //   tokens,
  //   idx,
  //   options,
  //   env,
  //   self
  // ) {
  //   const contentToken = tokens[idx + 1];
  //   const match =
  //     contentToken.type === "inline" &&
  //     contentToken.content.match(/^@\[preview]\((.+)\)/);
  //   if (!match) {
  //     return self.renderToken(tokens, idx, options);
  //   }
  //   importBlockIndex = idx;
  //   hasImportBlockOpen = true;
  //   const filePath = match[1];
  //   const basename = path.basename(filePath, ".md");
  //   const componentName = pascalCase(`demo-${basename}`);
  //   const insert = insertImport(tokens);
  //   insert(`import ${componentName} from "${filePath}";\n`);
  //   // @ts-ignore
  //   const code = md.render(`@[code](${filePath})`, { filePath: md.__path });
  //   // const code = "md.render(`@[code](${filePath})`, { filePath: md.__path })";
  //   if (!/\.vue$/.test(filePath)) {
  //     return code + "<!-- ";
  //   }
  //   return `<${componentName}>${code}</${componentName}><!-- `;
  // };
  // md.renderer.rules.paragraph_close = function (
  //   tokens,
  //   idx,
  //   options,
  //   env,
  //   self
  // ) {
  //   if (hasImportBlockOpen && importBlockIndex + 2 === idx) {
  //     hasImportBlockOpen = false;
  //     return " -->";
  //   }
  //   return self.renderToken(tokens, idx, options);
  // };
});

import { defineMarkdownPlugin } from "../../defineMarkdownPlugin";
import { createImportCodeBlockRule } from "./createImportCodeBlockRule";
import { resolveImportCode } from "./resolveImportCode";
export interface ImportCodePluginOptions {
  handleImportPath?: (str: string) => string;
}
export const importCodePlugin = defineMarkdownPlugin<ImportCodePluginOptions>(
  (md, options = {}) => {
    // add import_code block rule
    md.block.ruler.before(
      "fence",
      "import_code",
      createImportCodeBlockRule(options),
      {
        alt: ["paragraph", "reference", "blockquote", "list"],
      }
    );

    // add import_code renderer rule
    md.renderer.rules.import_code = (tokens, idx, options, env, slf) => {
      const token = tokens[idx];
      console.log(env);
      // use imported code as token content
      const { importFilePath, importCode } = resolveImportCode(token.meta, env);
      token.content = importCode;

      // extract imported files to env
      if (importFilePath) {
        const importedFiles = env.importedFiles || (env.importedFiles = []);
        importedFiles.push(importFilePath);
      }

      // render the import_code token as a fence token
      return md.renderer.rules.fence!(tokens, idx, options, env, slf);
    };
  }
);

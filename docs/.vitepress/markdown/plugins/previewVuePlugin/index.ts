import { defineMarkdownPlugin } from "../../defineMarkdownPlugin";
import { addFileImport, addScriptRuler } from "./utils";

export const previewVuePlugin = defineMarkdownPlugin((md) => {
  addScriptRuler(md);
  addFileImport(md);
});

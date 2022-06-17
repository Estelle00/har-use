import MarkdownIt from "markdown-it";
import { tablePlugin } from "./plugins/tablePlugin";
import { importCodePlugin } from "./plugins/importCodePlugin";
import { previewVuePlugin } from "./plugins/previewVuePlugin";
import type { ImportCodePluginOptions } from "./plugins/importCodePlugin";
export default function createMarkdown(md: MarkdownIt) {
  md.use(previewVuePlugin);
  md.use(tablePlugin);
  md.use<ImportCodePluginOptions>(importCodePlugin);
}

import { MarkdownIt } from "./plugins/previewVuePlugin/utils";

type PluginWithOptions<T = any> = (md: MarkdownIt, options?: T) => void;
export function defineMarkdownPlugin<T = never>(Fn: PluginWithOptions<T>) {
  return Fn;
}

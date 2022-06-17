import type { PluginWithOptions } from "markdown-it";

export function defineMarkdownPlugin<T = never>(Fn: PluginWithOptions<T>) {
  return Fn;
}

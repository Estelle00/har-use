import { watch } from "vue";
import type { WatchOptions } from "vue";
import type { ConfigurableEventFilter } from "./filters";
import { bypassFilter, createFilterWrapper } from "./filters";

export type WatchWithFilterOptions = WatchOptions & ConfigurableEventFilter;

export function watchWithFilter(
  source: any,
  cb: any,
  options: WatchWithFilterOptions = {}
) {
  const { eventFilter = bypassFilter, ...watchOptions } = options;
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}

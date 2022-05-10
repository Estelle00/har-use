import { watch } from "vue";
import type { WatchOptions } from "vue";
import {
  bypassFilter,
  ConfigurableEventFilter,
  createFilterWrapper,
} from "./filters";

export interface WatchWithFilterOptions<T>
  extends WatchOptions<T>,
    ConfigurableEventFilter {}
export function watchWithFilter<T extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchWithFilterOptions<T> = {}
) {
  const { eventFilter = bypassFilter, ...watchOptions } = options;
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}

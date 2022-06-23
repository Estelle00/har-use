import { watch } from "vue";
import type {
  WatchOptions,
  WatchStopHandle,
  WatchSource,
  WatchCallback,
} from "vue";
import { bypassFilter, createFilterWrapper } from "./filters";
import type {
  MapSources,
  MultiWatchSources,
  WatchWithFilterOptions,
} from "./types";

// export function watchWithFilter<
//   T extends MultiWatchSources,
//   Immediate extends Readonly<boolean> = false
// >(
//   source: [...T],
//   cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
//   options?: WatchWithFilterOptions<Immediate>
// ): WatchStopHandle;
//
// export function watchWithFilter<T, Immediate extends Readonly<boolean> = false>(
//   source: WatchSource<T>,
//   cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
//   options?: WatchWithFilterOptions<Immediate>
// ): WatchStopHandle;

// export function watchWithFilter<
//   T extends object,
//   Immediate extends Readonly<boolean> = false
// >(
//   source: T,
//   cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
//   options?: WatchWithFilterOptions<Immediate>
// ): WatchStopHandle;

// export function watchWithFilter<
//   T extends Readonly<MultiWatchSources>,
//   Immediate extends Readonly<boolean> = false
// >(
// source: T,
//   cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
//   options: WatchWithFilterOptions<Immediate> = {}
// ): WatchStopHandle;

export function watchWithFilter(
  source: any,
  cb: any,
  options: WatchWithFilterOptions = {}
) {
  const { eventFilter = bypassFilter, ...watchOptions } = options;
  return watch(
    source,
    createFilterWrapper(eventFilter, cb as any),
    watchOptions
  );
}

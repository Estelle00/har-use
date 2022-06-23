import type { WatchSource, WatchOptions, WatchStopHandle, Ref } from "vue";
import type { ConfigurableEventFilter } from "./filters";
import type { Fn } from "@har-use/utils";
export type WatchWithFilterOptions<Immediate = boolean> =
  WatchOptions<Immediate> & ConfigurableEventFilter;

export type MultiWatchSources = (WatchSource<unknown> | object)[];

export type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : T[K] extends object
    ? Immediate extends true
      ? T[K] | undefined
      : T[K]
    : never;
};

export type Return = {
  stop: WatchStopHandle;
  pause: Fn;
  resume: Fn;
  isActive: Ref<boolean>;
};

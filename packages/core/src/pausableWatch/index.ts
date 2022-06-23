import { pausableFilter } from "./filters";
import { watchWithFilter } from "./watchWithFilter";
import type { WatchCallback, WatchSource } from "vue";
import type {
  MapSources,
  MultiWatchSources,
  Return,
  WatchWithFilterOptions,
} from "./types";

export function pausableWatch<
  T extends MultiWatchSources,
  Immediate extends Readonly<boolean> = false
>(
  source: [...T],
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchWithFilterOptions<Immediate>
): Return;

export function pausableWatch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchWithFilterOptions<Immediate>
): Return;

export function pausableWatch<
  T extends object,
  Immediate extends Readonly<boolean> = false
>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchWithFilterOptions<Immediate>
): Return;

// 控制监听开关
export function pausableWatch<
  T extends Readonly<MultiWatchSources>,
  Immediate extends Readonly<boolean> = false
>(
  source: T,
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options: WatchWithFilterOptions<Immediate> = {}
): Return {
  const { eventFilter: filter, ...watchOptions } = options;
  const { isActive, pause, resume, eventFilter } = pausableFilter(filter);
  const stop = watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter,
  });
  return {
    stop,
    pause,
    resume,
    isActive,
  };
}

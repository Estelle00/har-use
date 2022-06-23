import type { WatchOptions } from "vue";
import type { ConfigurableEventFilter } from "./filters";
export declare type WatchWithFilterOptions = WatchOptions & ConfigurableEventFilter;
export declare function watchWithFilter(source: any, cb: any, options?: WatchWithFilterOptions): import("vue").WatchStopHandle;

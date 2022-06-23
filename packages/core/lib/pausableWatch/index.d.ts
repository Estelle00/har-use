import type { WatchWithFilterOptions } from "./watchWithFilter";
export declare function pausableWatch(source: any, cb: any, options?: WatchWithFilterOptions): {
    stop: import("vue").WatchStopHandle;
    pause: () => void;
    resume: () => void;
    isActive: import("vue").Ref<boolean>;
};

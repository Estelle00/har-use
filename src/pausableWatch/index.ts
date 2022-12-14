import { pausableFilter } from "./filters";
import { watchWithFilter, WatchWithFilterOptions } from "./watchWithFilter";

// 控制监听开关
export function pausableWatch<T extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchWithFilterOptions<T> = {}
) {
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

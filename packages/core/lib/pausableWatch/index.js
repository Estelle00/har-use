import { pausableFilter } from "./filters";
import { watchWithFilter } from "./watchWithFilter";
// 控制监听开关
export function pausableWatch(source, cb, options = {}) {
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

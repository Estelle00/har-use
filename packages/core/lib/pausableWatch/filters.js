import { useToggle } from "../useToggle";
export const bypassFilter = (invoke) => {
    return invoke();
};
export function createFilterWrapper(filter, fn) {
    function wrapper(...args) {
        filter(() => fn.apply(this, args), { fn, thisArg: this, args });
    }
    return wrapper;
}
export function pausableFilter(cb = bypassFilter) {
    const [isActive, toggle] = useToggle(true);
    function pause() {
        toggle(false);
    }
    function resume() {
        toggle(true);
    }
    const eventFilter = (...args) => {
        if (isActive.value) {
            cb(...args);
        }
    };
    return {
        isActive,
        pause,
        resume,
        eventFilter,
    };
}

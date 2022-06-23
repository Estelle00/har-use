import { getCurrentInstance, nextTick, onBeforeMount } from "vue";
export function tryOnBeforeMount(fn, sync = true) {
    if (getCurrentInstance()) {
        onBeforeMount(fn);
    }
    else if (sync) {
        fn();
    }
    else {
        nextTick(fn);
    }
}

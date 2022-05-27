import { Fn } from "../type";
import { getCurrentInstance, nextTick, onBeforeMount } from "vue";

export function tryOnBeforeMount(fn: Fn, sync = true) {
  if (getCurrentInstance()) {
    onBeforeMount(fn);
  } else if (sync) {
    fn();
  } else {
    nextTick(fn);
  }
}

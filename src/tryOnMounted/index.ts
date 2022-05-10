import { Fn } from "../type";
import { getCurrentInstance, nextTick, onMounted } from "vue";

export function tryOnMounted(fn: Fn, sync = true) {
  if (getCurrentInstance()) {
    onMounted(fn);
  } else if (sync) {
    fn();
  } else {
    nextTick(fn);
  }
}

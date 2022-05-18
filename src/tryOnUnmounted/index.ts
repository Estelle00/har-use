import { Fn } from "../type";
import { getCurrentInstance, onUnmounted } from "vue";

export function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) {
    onUnmounted(fn);
  }
}

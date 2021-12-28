import { Fn } from "../type";
import { getCurrentInstance, onUnmounted } from "vue-demi";

export function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) {
    onUnmounted(fn);
  }
}

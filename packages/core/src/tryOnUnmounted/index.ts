import type { Fn } from "@har-use/utils";
import { getCurrentInstance, onUnmounted } from "vue";

export function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) {
    onUnmounted(fn);
  }
}

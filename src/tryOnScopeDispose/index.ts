import type { Fn } from "../type";
import { getCurrentScope, onScopeDispose } from "vue";

export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

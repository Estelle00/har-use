import { Ref, watch, isRef, unref } from "vue-demi";
import { onMountedOrActivated } from "../onMountedOrActivated";
import { tryOnScopeDispose } from "../tryOnScopeDispose";

type TargetRef = EventTarget | Ref<EventTarget | undefined>;
export type UseEventListenerOptions = {
  target?: TargetRef;
  capture?: boolean;
  passive?: boolean;
};
export function useEventListener(
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions
) {
  const { target = window, capture = false, passive = false } = options;
  let attached: boolean;
  function add(target?: TargetRef) {
    const element = unref(target);
    if (element && !attached) {
      element.addEventListener(type, listener, { capture, passive });
      attached = true;
    }
  }
  function remove(target?: TargetRef) {
    const element = unref(target);
    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  }
  tryOnScopeDispose(() => remove(target));
  onMountedOrActivated(() => add(target));
  if (isRef(target)) {
    watch(target, (val, oldValue) => {
      remove(oldValue);
      add(val);
    });
  }
}

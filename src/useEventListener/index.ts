import { Ref, watch, isRef, unref } from "vue";
import { onMountedOrActivated } from "../onMountedOrActivated";
import { tryOnScopeDispose } from "../tryOnScopeDispose";
import { inBrowser } from "../utils";
import { GeneralEventListener } from "../type";

type TargetRef = EventTarget | Ref<EventTarget | undefined>;
export type UseEventListenerOptions = {
  // 绑定事件的元素 default: window
  target?: TargetRef;
  // 是否在事件捕获阶段触发 default: false
  capture?: boolean;
  // 设置为 `true` 时，表示 `listener` 永远不会调用 `preventDefault` default: false
  passive?: boolean;
};
export function useEventListener<EventType = Event>(
  // 监听的事件类型
  type: string,
  // 事件回调函数
  listener: GeneralEventListener<EventType>,
  // 可选的配置项
  options: UseEventListenerOptions = {}
) {
  if (!inBrowser) {
    return;
  }
  const { target = window, capture = false, passive = false } = options;
  let attached: boolean;
  function add(target?: TargetRef) {
    const element = unref(target);
    if (element && !attached) {
      element.addEventListener(type, listener as any, { capture, passive });
      attached = true;
    }
  }
  function remove(target?: TargetRef) {
    const element = unref(target);
    if (element && attached) {
      element.removeEventListener(type, listener as any, capture);
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

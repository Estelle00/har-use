import { watch } from "vue";
import { tryOnScopeDispose } from "@har-use/core";
import { inBrowser, unrefElement, noop } from "@har-use/utils";
import type { GeneralEventListener, MaybeElementRef } from "@har-use/utils";
// todo 类型推断不够完善后续优化
export type UseEventListenerOptions = {
  // 绑定事件的元素 default: window
  target?: MaybeElementRef;
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
  let cleanup = noop;
  const stopWatch = watch(
    () => unrefElement(target as unknown as MaybeElementRef),
    (el) => {
      if (!el) return;
      el.addEventListener(type, listener as any, { capture, passive });
      cleanup = () => el.removeEventListener(type, listener as any, capture);
    },
    {
      immediate: true,
      flush: "post",
    }
  );
  function stop() {
    stopWatch();
    cleanup();
  }
  tryOnScopeDispose(stop);
  return stop;
}

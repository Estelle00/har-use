import { Plugin } from "../types";
import { onUnmounted, ref } from "vue-demi";
import { createPageVisibility, EventHookOff, useEventHook } from "@har/use";
const { on, trigger } = useEventHook();
const usePolling: Plugin<any, any[]> = (
  instance,
  { pollingInterval, pollingWhenHidden = true }
) => {
  if (!pollingInterval) {
    return {};
  }
  const timerRef = ref<NodeJS.Timeout>();
  const off = ref<EventHookOff>();
  const stopPolling = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
      timerRef.value = undefined;
    }
    off.value?.();
  };
  const visible = createPageVisibility((val) => {
    if (val) trigger();
  });
  onUnmounted(() => {
    stopPolling();
  });
  return {
    onBefore: stopPolling,
    onFinally() {
      if (!pollingWhenHidden && !visible.value) {
        off.value = on(() => {
          instance.refresh();
        });
        return;
      }
      timerRef.value = setTimeout(() => {
        instance.refresh();
      }, pollingInterval);
    },
    onCancel: stopPolling,
  };
};
export default usePolling;

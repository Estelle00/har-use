import { Plugin } from "../types";
import { ref } from "vue";
import { createPageVisibility } from "@har/use";
import { EventBusOff, useEventBus } from "@har/use";
const { on, trigger } = useEventBus();
const usePolling: Plugin<any, any[]> = (
  instance,
  { pollingInterval, pollingWhenHidden = true }
) => {
  if (!pollingInterval) {
    return {};
  }
  const timerRef = ref<NodeJS.Timeout>();
  const off = ref<EventBusOff>();
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

import { Plugin } from "../types";
import { onUnmounted, ref, watch } from "vue-demi";
import {
  EventHookOff,
  useEventHook,
  useEventListener,
  useGlobalState,
} from "@har/use";
const { on, trigger } = useEventHook();
function isDocumentVisible() {
  return document.visibilityState !== "hidden";
}
function useVisibility() {
  const visible = useGlobalState(function () {
    const visible = ref(isDocumentVisible());
    useEventListener(
      "visibilitychange",
      function () {
        visible.value = isDocumentVisible();
      },
      {
        target: document,
      }
    );
    return visible;
  });
  watch(
    () => visible.value,
    (val) => {
      if (val) {
        trigger();
      }
    }
  );
  return visible;
}

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
  const visible = useVisibility();
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

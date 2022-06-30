import { ref } from "vue";
import { definePlugin } from "../definePlugin";
export default definePlugin((instance, { retryCount, retryInterval }) => {
  if (!retryCount) {
    return {};
  }
  const timerRef = ref<number>();
  const countRef = ref(0);
  const triggerByRetry = ref(false);
  const stopRetry = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
      timerRef.value = undefined;
    }
  };
  return {
    onBefore() {
      if (!triggerByRetry.value) {
        countRef.value = 0;
      }
      triggerByRetry.value = false;
      stopRetry();
    },
    onSuccess() {
      countRef.value = 0;
    },
    onError() {
      countRef.value += 1;
      if (retryCount === -1 || countRef.value <= retryCount) {
        const timeout =
          retryInterval ?? Math.min(1000 * 2 ** countRef.value, 30000);
        timerRef.value = setTimeout(() => {
          triggerByRetry.value = true;
          instance.refresh();
        }, timeout);
      } else {
        countRef.value = 0;
      }
    },
    onCancel() {
      countRef.value = 0;
      stopRetry();
    },
  };
});

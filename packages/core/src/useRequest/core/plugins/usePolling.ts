import { ref } from "vue";
import { definePlugin } from "../definePlugin";

export default definePlugin((instance, { pollingInterval }) => {
  if (!pollingInterval) {
    return {};
  }
  const timerRef = ref<number>();
  const stopPolling = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
      timerRef.value = undefined;
    }
  };
  return {
    onBefore: stopPolling,
    onFinally() {
      timerRef.value = setTimeout(() => {
        instance.refresh();
      }, pollingInterval);
    },
    onCancel: stopPolling,
  };
});

import { ref } from "vue";
import { definePlugin } from "../definePlugin";

export default definePlugin((instance, { loadingDelay }) => {
  if (!loadingDelay) {
    return {};
  }
  const timerRef = ref<number>();
  const cancelTimeout = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
      timerRef.value = undefined;
    }
  };
  return {
    onBefore() {
      cancelTimeout();
      instance.loading.value = false;
      timerRef.value = setTimeout(() => {
        instance.loading.value = true;
      }, loadingDelay);
    },
    onFinally: cancelTimeout,
    onCancel: cancelTimeout,
  };
});

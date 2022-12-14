import type { DebouncedFunc } from "lodash";
import { ref } from "vue";
import throttle from "lodash/throttle";
import { definePlugin } from "../definePlugin";
export default definePlugin((instance, { throttleWait, throttleOptions }) => {
  if (!throttleWait) {
    return {};
  }
  const throttleRef = ref<DebouncedFunc<any>>();
  const _originRunAsync = instance.runAsync;
  throttleRef.value = throttle(
    (callback: () => void) => {
      callback();
    },
    throttleWait,
    throttleOptions
  );
  instance.runAsync = (...arg) => {
    return new Promise((resolve, reject) => {
      throttleRef.value?.(() => {
        _originRunAsync(...arg)
          .then(resolve)
          .catch(reject);
      });
    });
  };
  return {
    onCancel() {
      throttleRef.value?.cancel();
    },
  };
});

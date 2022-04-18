import { Plugin } from "../types";
import type { DebouncedFunc } from "lodash-es";
import { ref } from "vue-demi";
import throttle from "lodash-es/throttle";
const useThrottle: Plugin<any, any[]> = (
  instance,
  { throttleWait, throttleOptions }
) => {
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
};
export default useThrottle;

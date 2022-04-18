import { Plugin } from "../types";
import type { DebouncedFunc } from "lodash-es";
import { ref } from "vue-demi";
import debounce from "lodash-es/debounce";

const useDebounce: Plugin<any, any[]> = (
  instance,
  { debounceWait, debounceOptions }
) => {
  if (!debounceWait) {
    return {};
  }
  const debounceRef = ref<DebouncedFunc<any>>();
  const _originRunAsync = instance.runAsync;
  debounceRef.value = debounce(
    (callback: () => void) => {
      callback();
    },
    debounceWait,
    debounceOptions
  );
  instance.runAsync = (...arg) => {
    return new Promise((resolve, reject) => {
      debounceRef.value?.(() => {
        _originRunAsync(...arg)
          .then(resolve)
          .catch(reject);
      });
    });
  };
  return {
    onCancel() {
      debounceRef.value?.cancel();
    },
  };
};
export default useDebounce;

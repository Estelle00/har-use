import { Plugin } from "../types";
import { ref, watch } from "vue-demi";

const useReady: Plugin<any, any[]> = (
  instance,
  { ready = ref(true), defaultParams = [], manual }
) => {
  watch(
    () => ready.value,
    (val) => {
      if (!manual && val) {
        instance.refresh();
        // instance.run(...(instance.state.params || defaultParams || []));
      }
    }
  );
  return {
    onBefore() {
      if (!ready.value) {
        return {
          stopNow: true,
        };
      }
    },
  };
};
export default useReady;

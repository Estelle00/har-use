import { Plugin } from "../types";
import { onUnmounted, ref, watch } from "vue-demi";

const useReady: Plugin<any, any[]> = (
  instance,
  { ready = ref(true), defaultParams = [], manual }
) => {
  const unwatch = watch(
    () => ready.value,
    (val) => {
      if (!manual && val) {
        instance.run(...defaultParams);
      }
    }
  );
  onUnmounted(unwatch);
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

import { Plugin } from "../types";
import { ref, watch } from "vue";

const useRefreshDeps: Plugin<any, any[]> = (instance, { refreshDeps }) => {
  if (refreshDeps) {
    const deps = ref(refreshDeps);
    watch(
      deps,
      () => {
        instance.refresh();
      },
      {
        deep: true,
      }
    );
  }
  return {};
};
export default useRefreshDeps;

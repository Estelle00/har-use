import { Plugin } from "../types";
import { watch } from "vue";
const useRefreshDeps: Plugin<any, any[]> = (instance, { refreshDeps }) => {
  if (refreshDeps) {
    watch(
      () => {
        if (Array.isArray(refreshDeps)) {
          return refreshDeps;
        }
        return instance.state.params;
      },
      () => {
        instance.refresh();
      }
    );
  }
  return {};
};
export default useRefreshDeps;

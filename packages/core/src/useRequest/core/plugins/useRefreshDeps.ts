import { ref, watch } from "vue";
import { definePlugin } from "../definePlugin";
export default definePlugin((instance, { refreshDeps }) => {
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
});

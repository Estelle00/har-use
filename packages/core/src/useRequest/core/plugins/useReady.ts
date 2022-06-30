import { ref, watch } from "vue";
import { definePlugin } from "../definePlugin";
export default definePlugin(
  (instance, { ready = ref(true), manual, defaultParams }) => {
    watch(
      ready,
      (val) => {
        if (!manual && val) {
          instance.run(...defaultParams);
        }
      },
      {
        flush: "sync",
      }
    );
    return {
      onBefore() {
        if (!ready.value) {
          return {
            isBreak: true,
          };
        }
      },
    };
  }
);

import { useGlobalState, tryOnMounted } from "@har-use/core";
import { ref } from "vue";
import type { Ref } from "vue";
import { inBrowser } from "@har-use/utils";
import { useEventListener } from "../useEventListener";

export const useWindowSize = useGlobalState<{
  width: Ref<number>;
  height: Ref<number>;
}>(() => {
  const width = ref(0);
  const height = ref(0);
  if (inBrowser) {
    const update = () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    };
    tryOnMounted(update);
    useEventListener("resize", update, {
      target: window,
      passive: true,
    });
  }
  return {
    width,
    height,
  };
});

import { useGlobalState } from "../useGlobalState";
import { Ref, ref } from "vue-demi";
import { inBrowser } from "../utils";
import { useEventListener } from "../useEventListener";
import { tryOnMounted } from "../tryOnMounted";

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

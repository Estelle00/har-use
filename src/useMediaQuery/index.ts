import { ref } from "vue";
import { tryOnBeforeMount, tryOnScopeDispose } from "@har/use";

export function useMediaQuery(query: string) {
  const isSupported = Boolean(window && "matchMedia" in window);
  let mediaQuery: MediaQueryList;
  const matches = ref(false);
  function update() {
    console.log(1, query);
    if (!isSupported) return;
    if (!mediaQuery) mediaQuery = window.matchMedia(query);
    matches.value = mediaQuery.matches;
  }
  tryOnBeforeMount(() => {
    update();
    if (!mediaQuery) return;
    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", update);
    } else {
      mediaQuery.addListener(update);
    }
    tryOnScopeDispose(() => {
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", update);
      } else {
        mediaQuery.removeListener(update);
      }
    });
  });
  return matches;
}

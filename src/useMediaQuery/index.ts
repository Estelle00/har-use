import { ref } from "vue";
import {
  json2MediaQueryString,
  Json2MediaQueryType,
  tryOnBeforeMount,
  tryOnScopeDispose,
} from "@har/use";

export function useMediaQuery(query: Json2MediaQueryType) {
  const isSupported = Boolean(window && "matchMedia" in window);
  let mediaQuery: MediaQueryList;
  const matches = ref(false);
  function update() {
    if (!isSupported) return;
    if (!mediaQuery)
      mediaQuery = window.matchMedia(json2MediaQueryString(query));
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

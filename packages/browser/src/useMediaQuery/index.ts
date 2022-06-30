import { ref } from "vue";
import { inBrowser, json2MediaQueryString } from "@har-use/utils";
import type { Json2MediaQueryType } from "@har-use/utils";
import { tryOnBeforeMount, tryOnScopeDispose } from "@har-use/core";

export function useMediaQuery(query: Json2MediaQueryType) {
  if (!inBrowser) return;
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

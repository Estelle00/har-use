import { ref, watch } from "vue";
import isString from "lodash/isString";
import { MayBeRef } from "../type";
export interface UseTitleOptions {
  template?: string;
}
export function useTitle(
  newTitle: MayBeRef<string | null | undefined> = null,
  options: UseTitleOptions = {}
) {
  const { template = "%s" } = options;
  const title = ref(newTitle ?? document.title ?? null);
  watch(
    title,
    (t, o) => {
      if (isString(t) && t !== o) {
        document.title = template.replace("%s", t);
      }
    },
    {
      immediate: true,
    }
  );
  return title;
}

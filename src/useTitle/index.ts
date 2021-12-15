import { ref, Ref, watch } from "vue-demi";
import isString from "lodash/isString";

type MayBeRef<T> = T | Ref<T>;
export function useTitle(newTitle: MayBeRef<string | null | undefined> = null) {
  const title = ref(newTitle ?? document.title ?? null);
  watch(
    title,
    (t, o) => {
      if (isString(t) && t !== o) {
        document.title = t;
      }
    },
    {
      immediate: true,
    }
  );
  return title;
}

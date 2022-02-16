import { useEventListener } from "../useEventListener";
import { ref, watch } from "vue-demi";

function isDocumentVisible() {
  return document.visibilityState !== "hidden";
}

export function createPageVisibility(callback: (val: boolean) => void) {
  const visible = ref(isDocumentVisible());
  useEventListener(
    "visibilitychange",
    function () {
      visible.value = isDocumentVisible();
    },
    {
      target: document,
    }
  );
  watch(
    () => visible.value,
    (val) => {
      callback(val);
    }
  );
  return visible;
}

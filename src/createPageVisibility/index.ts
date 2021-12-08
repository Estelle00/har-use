import { useEventListener, useGlobalState } from "@har/use";
import { ref, watch } from "vue-demi";

function isDocumentVisible() {
  return document.visibilityState !== "hidden";
}
export function createPageVisibility(callback: (val: boolean) => void) {
  const visible = useGlobalState(function () {
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
    return visible;
  });
  watch(
    () => visible.value,
    (val) => {
      callback(val);
    }
  );
  return visible;
}

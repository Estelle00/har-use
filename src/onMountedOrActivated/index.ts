import { onActivated, onMounted, nextTick } from "vue-demi";

export function onMountedOrActivated(hook: () => any) {
  let mounted: boolean;
  onMounted(() => {
    hook();
    nextTick(() => (mounted = true));
  });
  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}

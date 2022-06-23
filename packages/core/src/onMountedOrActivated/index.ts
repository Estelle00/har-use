import { onActivated, onMounted, nextTick } from "vue";

export function onMountedOrActivated(hook: () => void) {
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

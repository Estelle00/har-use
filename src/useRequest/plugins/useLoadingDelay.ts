import { Plugin } from "../types";
import { ref } from "vue";

const useLoadingDelay: Plugin<any, any[]> = (instance, { loadingDelay }) => {
  if (!loadingDelay) {
    return {};
  }
  const timerRef = ref<NodeJS.Timeout>();
  const cancelTimeout = () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value);
      timerRef.value = undefined;
    }
  };
  return {
    onBeforeRequest() {
      cancelTimeout();
      instance.setState({
        loading: false,
      });
      timerRef.value = setTimeout(() => {
        instance.setState({
          loading: true,
        });
      }, loadingDelay);
    },
    onFinally: cancelTimeout,
    onCancel: cancelTimeout,
  };
};
export default useLoadingDelay;

import { Options, Plugin, Service } from "./types";
import { computed, onMounted, onUnmounted, ref } from "vue-demi";
import useFetch from "./useFetch";

export default function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
) {
  const serviceRef = ref<Service<TData, TParams>>(service);
  const fetchInstance = useFetch(serviceRef, options, plugins);

  const { state, refresh, refreshAsync, run, runAsync, mutate } = fetchInstance;
  onMounted(() => {
    if (!options.manual) {
      const params = state.params || [];
      run(...(params as TParams));
    }
  });
  onUnmounted(() => {
    fetchInstance.cancel();
  });
  console.log(state);
  return {
    loading: computed(() => state.loading),
    data: computed(() => state.data),
    error: computed(() => state.error),
    params: computed(() => state.params),
    refresh,
    refreshAsync,
    run,
    runAsync,
    mutate,
  };
}

import { Options, Plugin, Service, RequestResult } from "./types";
import { computed, onMounted, onUnmounted } from "vue-demi";
import useFetch from "./useFetch";

export default function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
): RequestResult<TData, TParams> {
  const { state, refresh, refreshAsync, run, runAsync, mutate, cancel } =
    useFetch(service, options, plugins);
  onMounted(() => {
    if (!options.manual) {
      const params = state.params || [];
      run(...(params as TParams));
    }
  });
  onUnmounted(() => {
    cancel();
  });
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
    cancel,
  };
}

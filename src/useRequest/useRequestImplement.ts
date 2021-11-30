import { Options, Service, Plugin } from "./types";
import { filterObjectKeys } from "./utils";
import { onMounted, ref, onUnmounted } from "vue";
import useFetch from "./useFetch";
export default function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
) {
  const { manual } = options;
  const fetchOptions = filterObjectKeys(options, "defaultParams");
  const serviceRef = ref<Service<TData, TParams>>(service);
  const fetchInstance = useFetch(serviceRef, fetchOptions, plugins);

  const { state, refresh, refreshAsync, run, runAsync } = fetchInstance;
  onMounted(() => {
    if (!manual) {
      const params = state.params || [];
      run(...(params as TParams));
    }
  });
  onUnmounted(() => {
    fetchInstance.cancel();
  });
  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
    params: state.params || [],
    refresh,
    refreshAsync,
    run,
    runAsync,
  };
}

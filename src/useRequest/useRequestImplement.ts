import { Options, Plugin, Service, RequestResult } from "./types";
import { computed } from "vue-demi";
import useFetch from "./useFetch";
import { tryOnMounted } from "../tryOnMounted";
import { tryOnScopeDispose } from "../tryOnScopeDispose";

export default function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
): RequestResult<TData, TParams> {
  const { state, refresh, refreshAsync, run, runAsync, mutate, cancel } =
    useFetch(service, options, plugins);
  if (!options.manual) {
    tryOnMounted(() => {
      const params = state.params || [];
      run(...(params as TParams));
    });
  }
  tryOnScopeDispose(cancel);
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

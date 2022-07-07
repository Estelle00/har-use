import { Options, PluginImplementType, Service } from "./types";
import useFetch from "./useFetch";
import { tryOnMounted, tryOnUnmounted } from "@har/use";

export default function useRequestImplement<
  TData,
  TParams extends unknown[] = []
>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: PluginImplementType<TData, TParams>[] = []
) {
  const { defaultParams = [] } = options;
  const instance = useFetch<TData, TParams>(service, options);
  instance.plugins.value = plugins.map((i) => i(instance, options));
  if (!options.manual) {
    tryOnMounted(() => {
      const params = instance.params.value || defaultParams;
      instance.run(...params);
    });
  }
  tryOnUnmounted(instance.cancel);
  return {
    loading: instance.loading,
    data: instance.data,
    error: instance.error,
    params: instance.params,
    run: instance.run,
    runAsync: instance.runAsync,
    refresh: instance.refresh,
    refreshAsync: instance.refreshAsync,
    mutate: instance.mutate,
    cancel: instance.cancel,
  } as const;
}

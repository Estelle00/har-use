import { Options, Service, Plugin } from "./types";
import useRequestImplement from "./useRequestImplement";
import useLoadingDelay from "./plugins/useLoadingDelay";
import useCache from "./plugins/useCache";
export function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
) {
  return useRequestImplement<TData, TParams>(service, options, [
    useCache,
    useLoadingDelay,
    ...(plugins || []),
  ] as Plugin<TData, TParams>[]);
}

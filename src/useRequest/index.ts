import { Options, Service, Plugin } from "./types";
import useRequestImplement from "./useRequestImplement";
import useLoadingDelay from "./plugins/useLoadingDelay";
import useCache from "./plugins/useCache";
import usePolling from "./plugins/usePolling";
import useReady from "./plugins/useReady";
export function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
) {
  return useRequestImplement<TData, TParams>(service, options, [
    useCache,
    useLoadingDelay,
    usePolling,
    useReady,
    ...(plugins || []),
  ] as Plugin<TData, TParams>[]);
}

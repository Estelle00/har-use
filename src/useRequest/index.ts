import { Options, Service, Plugin } from "./types";
import useRequestImplement from "./useRequestImplement";
import useLoadingDelay from "./plugins/useLoadingDelay";
import usePolling from "./plugins/usePolling";
import useReady from "./plugins/useReady";
import useDebounce from "./plugins/useDebounce";
import useThrottle from "./plugins/useThrottle";
import useRetry from "./plugins/useRetry";
export * from "./types";
export function useRequest<TData, TParams extends any[]>(
  service: Service<TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
) {
  return useRequestImplement<TData, TParams>(service, options, [
    // useCache,
    useLoadingDelay,
    usePolling,
    useReady,
    useDebounce,
    useThrottle,
    useRetry,
    ...(plugins || []),
  ] as Plugin<TData, TParams>[]);
}

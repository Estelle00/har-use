import { Options, Service } from "./types";
import useRequestImplement from "./useRequestImplement";
import useLoadingDelay from "./plugins/useLoadingDelay";
import usePolling from "./plugins/usePolling";
import useReady from "./plugins/useReady";
import useDebounce from "./plugins/useDebounce";
import useThrottle from "./plugins/useThrottle";
import useRetry from "./plugins/useRetry";
import useRefreshDeps from "./plugins/useRefreshDeps";
import useCache from "@/useRequest/core/plugins/useCache";
export * from "./types";
export function useRequest<TData, TParams extends unknown[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>
) {
  return useRequestImplement<TData, TParams>(service, options, [
    useLoadingDelay,
    useRetry,
    useDebounce,
    usePolling,
    useThrottle,
    useRefreshDeps,
    useReady,
    useCache,
  ]);
}

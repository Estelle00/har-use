import { Options, Service } from "./core/types";
import useRequestImplement from "./core/useRequestImplement";
import useLoadingDelay from "./core/plugins/useLoadingDelay";
import usePolling from "./core/plugins/usePolling";
import useReady from "./core/plugins/useReady";
import useDebounce from "./core/plugins/useDebounce";
import useThrottle from "./core/plugins/useThrottle";
import useRetry from "./core/plugins/useRetry";
import useRefreshDeps from "./core/plugins/useRefreshDeps";
export * from "./core/types";
export function useRequest<TData = any, TParams extends unknown[] = any>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>
) {
  return useRequestImplement<TData, TParams>(service, options, [
    useRefreshDeps,
    useLoadingDelay,
    usePolling,
    useReady,
    useDebounce,
    useThrottle,
    useRetry,
  ]);
}

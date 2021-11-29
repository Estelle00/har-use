import { Options, Service, Plugin } from "./types";
import useRequestImplement from "./useRequestImplement";
export function useRequest<TData, TParams extends unknown[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
  ] as Plugin<TData, TParams>[]);
}

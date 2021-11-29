import { Options, Service, Plugin } from "./types";
export default function useRequestImplement<TData, TParams extends unknown[]>(service: Service<TData, TParams>, options?: Options<TData, TParams>, plugins?: Plugin<TData, TParams>[]): {
    loading: boolean;
    data: TData | undefined;
    error: Error | undefined;
    params: TParams | never[];
    refresh: () => void;
    refreshAsync: () => Promise<TData>;
    run: (...params: TParams) => void;
    runAsync: (...params: TParams) => Promise<TData>;
};

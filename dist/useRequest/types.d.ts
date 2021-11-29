import { ShallowReactive } from "vue";
export declare type Service<TData, TParams extends unknown[]> = (...args: TParams) => Promise<TData>;
export interface Options<TData, TParams extends unknown[]> {
    manual?: boolean;
    onBefore?: (params: TParams) => void;
    onSuccess?: (data: TData, params: TParams) => void;
    onError?: (e: Error, params: TParams) => void;
    onFinally?: (params: TParams, data?: TData | undefined, e?: Error) => void;
    [key: string]: unknown;
}
export interface FetchState<TData, TParams extends unknown[]> {
    loading: boolean;
    params?: TParams;
    data?: TData;
    error?: Error;
}
export interface PluginReturn<TData, TParams extends unknown[]> {
    onBefore?: (params: TParams) => ({
        stopNow?: boolean;
        returnNow?: boolean;
    } & Partial<FetchState<TData, TParams>>) | void;
    onRequest?: (service: Service<TData, TParams>, params: TParams) => {
        servicePromise?: Promise<TData>;
    };
    onSuccess?: (data: TData, params: TParams) => void;
    onError?: (e: Error, params: TParams) => void;
    onFinally?: (params: TParams, data?: TData, e?: Error) => void;
    onCancel?: () => void;
    onMutate?: (data: TData) => void;
}
export interface StateResult<TData, TParams extends unknown[]> {
    state: ShallowReactive<FetchState<TData, TParams>>;
    setState: (state: Partial<FetchState<TData, TParams>>) => void;
}
export interface FetchResult<TData, TParams extends unknown[]> {
    state: StateResult<TData, TParams>["state"];
    refresh: () => void;
    refreshAsync: () => Promise<TData>;
    run: (...params: TParams) => void;
    runAsync: (...params: TParams) => Promise<TData>;
    cancel: () => void;
}
export declare type Plugin<TData, TParams extends unknown[]> = (fetchInstance: FetchResult<TData, TParams>, options: Options<TData, TParams>) => PluginReturn<TData, TParams>;

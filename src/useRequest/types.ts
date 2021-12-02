import { ShallowReactive } from "vue";

export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData>;

export interface Options<TData, TParams extends any[]> {
  manual?: boolean; // 初始化是否立即执行

  onBefore?: (params: TParams) => void; // service 执行前
  onSuccess?: (data: TData, params: TParams) => void; // service resolve时触发
  onError?: (e: Error, params: TParams) => void; // service reject时触发
  onFinally?: (params: TParams, data?: TData | undefined, e?: Error) => void; // service执行完成是触发

  defaultParams?: TParams;

  // cache
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;

  // loading delay
  loadingDelay?: number;
}

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error;
}

export interface PluginReturn<TData, TParams extends any[]> {
  onInit?: (instance: FetchResult<TData, TParams>) => void;
  onBeforeRequest?: (instance: FetchResult<TData, TParams>) => void;
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | void;
  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams
  ) => {
    servicePromise?: Promise<TData>;
  };
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  onCancel?: () => void;
  onMutate?: (data: TData, params: TParams) => void;
}
type PartialState<TData, TParams extends any[]> = Partial<
  FetchState<TData, TParams>
>;
export interface StateResult<TData, TParams extends any[]> {
  state: ShallowReactive<FetchState<TData, TParams>>;
  setState: (state: PartialState<TData, TParams>) => void;
}
export interface FetchResult<TData, TParams extends any[]> {
  state: StateResult<TData, TParams>["state"];
  refresh: () => void;
  refreshAsync: () => Promise<TData>;
  run: (...params: TParams) => void;
  runAsync: (...params: TParams) => Promise<TData>;
  cancel: () => void;
  setState: (s: PartialState<TData, TParams>) => void;
  mutate: (data: TData | ((oldData?: TData) => TData | undefined)) => void;
}

export type Plugin<TData, TParams extends any[]> = (
  // fetchInstance: FetchResult<TData, TParams>,
  options: Options<TData, TParams>
) => PluginReturn<TData, TParams>;

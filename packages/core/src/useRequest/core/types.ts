import type { ComputedRef, Ref, ShallowRef, UnwrapNestedRefs } from "vue";
import type { DebounceSettings, ThrottleSettings } from "lodash";

export type Service<TData, TParams extends unknown[]> = (
  ...args: TParams
) => Promise<TData>;

export type BaseOptions<TData, TParams extends unknown[]> = {
  manual?: boolean; // 初始化是否立即执行
  defaultParams?: TParams;
  formatResult?: (data: any) => TData;

  onBefore?: (params: TParams) => void; // service 执行前
  onSuccess?: (data: TData, params: TParams) => void; // service resolve时触发
  onError?: (e: Error, params: TParams) => void; // service reject时触发
  onFinally?: (params: TParams, data?: TData | undefined, e?: Error) => void; // service执行完成是触发
};
export type CacheType = {
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;
};
export type DebounceType = {
  // debounce
  debounceWait?: number;
  debounceOptions?: DebounceSettings;
};
export type LoadingDelayType = {
  // loading delay
  loadingDelay?: number;
};
export type PollingType = {
  pollingInterval?: number;
  // pollingWhenHidden?: boolean;
};
export type ReadyType = {
  ready?: Ref<boolean> | ComputedRef<boolean>;
};
export type RefreshDepsType = {
  refreshDeps?: ReadonlyArray<any>;
};
export type RetryType = {
  retryCount?: number;
  retryInterval?: number;
};
export type ThrottleType = {
  throttleWait?: number;
  throttleOptions?: ThrottleSettings;
};
export type Options<TData, TParams extends unknown[]> = BaseOptions<
  TData,
  TParams
> &
  CacheType &
  DebounceType &
  LoadingDelayType &
  PollingType &
  ReadyType &
  RefreshDepsType &
  RetryType &
  ThrottleType;
export interface FetchState<TData, TParams> {
  loading: Ref<boolean>;
  params: Ref<TParams>;
  data: ShallowRef<TData | undefined>;
  error: ShallowRef<Error | undefined>;
}
export interface PluginReturn<TData, TParams extends unknown[]> {
  // onInit?: (
  //   options: Options<TData, TParams>
  // ) => Partial<FetchState<TData, TParams>> | void;
  onBefore?: (params: TParams) =>
    | ({
        isBreak?: boolean;
        breakResult?: any;
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
export type PluginImplementType<TData, TParams extends unknown[]> = (
  fetchInstance: FetchResult<TData, TParams>,
  options: Options<TData, TParams>
) => PluginReturn<TData, TParams>;

export type PartialState<TData, TParams extends unknown[]> = Partial<
  UnwrapNestedRefs<FetchState<TData, TParams>>
>;
export interface FetchFunction<TData, TParams extends unknown[]> {
  refresh: () => void;
  refreshAsync: () => Promise<TData>;
  run: (...params: TParams) => void;
  runAsync: (...params: TParams) => Promise<TData>;
  cancel: () => void;
  mutate: (data: TData | ((oldData?: TData) => TData)) => void;
}
export interface RequestResult<TData, TParams extends unknown[]>
  extends FetchState<TData, TParams>,
    FetchFunction<TData, TParams> {}
export interface FetchResult<TData, TParams extends unknown[]>
  extends RequestResult<TData, TParams> {
  plugins: Ref<PluginReturn<TData, TParams>[]>;
}

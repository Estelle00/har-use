import { ComputedRef, Ref, ShallowReactive } from "vue";
import type { DebounceSettings, ThrottleSettings } from "lodash-es";

export type Service<TParams extends unknown[]> = (
  ...args: TParams
) => Promise<unknown>;
export interface CacheType {
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;
}

export interface Options<TData, TParams> extends CacheType {
  manual?: boolean; // 初始化是否立即执行

  onBefore?: (params: TParams) => void; // service 执行前
  onSuccess?: (data: TData, params: TParams) => void; // service resolve时触发
  onError?: (e: Error, params: TParams) => void; // service reject时触发
  onFinally?: (params: TParams, data?: TData | undefined, e?: Error) => void; // service执行完成是触发

  defaultParams?: TParams;

  formatResult?: (data: any) => TData;

  // loading delay
  loadingDelay?: number;

  //refreshDeps
  refreshDeps?: ReadonlyArray<any>;

  // polling
  pollingInterval?: number;
  pollingWhenHidden?: boolean;

  ready?: Ref<boolean> | ComputedRef<boolean>;

  // debounce
  debounceWait?: number;
  debounceOptions?: DebounceSettings;

  // throttle
  throttleWait?: number;
  throttleOptions?: ThrottleSettings;

  // retry
  retryCount?: number;
  retryInterval?: number;
  [key: string]: any;
}
export interface FetchState<TData, TParams> {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error;
}
export interface PluginReturn<TData, TParams extends unknown[]> {
  onInit?: (
    options: Options<TData, TParams>
  ) => Partial<FetchState<TData, TParams>> | void;
  onBeforeRequest?: (instance: FetchResult<TData, TParams>) => void;
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | void;
  // onRequest?: (
  //   service: Service<TParams>,
  //   params: TParams
  // ) => {
  //   servicePromise?: Promise<TData>;
  // };
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  onCancel?: () => void;
  onMutate?: (data: TData, params: TParams) => void;
}
type PartialState<TData, TParams> = Partial<FetchState<TData, TParams>>;
export interface StateResult<TData, TParams> {
  state: ShallowReactive<FetchState<TData, TParams>>;
  setState: (state: PartialState<TData, TParams>) => void;
}
export interface FetchResult<TData, TParams extends unknown[]> {
  state: StateResult<TData, TParams>["state"];
  refresh: () => void;
  refreshAsync: () => Promise<TData>;
  run: (...params: TParams) => void;
  runAsync: (...params: TParams) => Promise<TData>;
  cancel: () => void;
  setState: (s: PartialState<TData, TParams>) => void;
  mutate: (data: TData | ((oldData?: TData) => TData | undefined)) => void;
}

export type Plugin<TData, TParams extends unknown[]> = (
  fetchInstance: FetchResult<TData, TParams>,
  options: Options<TData, TParams>
) => PluginReturn<TData, TParams>;

export interface RequestResult<TData, TParams extends unknown[]>
  extends Omit<FetchResult<TData, TParams>, "setState" | "state"> {
  loading: ComputedRef<boolean>;
  data: ComputedRef<TData | undefined>;
  params: ComputedRef<TParams | undefined>;
  error: ComputedRef<Error | undefined>;
}

import { Ref, ref, shallowReactive, ShallowReactive, toRaw } from "vue";
import {
  CacheType,
  FetchResult,
  FetchState,
  Options,
  Plugin,
  PluginReturn,
  Service,
} from "./types";
import { getCache, Listener, setCache, subscribe } from "./utils/cache";
import { getCachePromise, setCachePromise } from "./utils/cachePromise";

function useState<TData, TParams extends any[]>(
  fetchState: FetchState<TData, TParams>
): [
  ShallowReactive<FetchState<TData, TParams>>,
  (s: Partial<FetchState<TData, TParams>>) => void
] {
  const state = shallowReactive<FetchState<TData, TParams>>(fetchState);
  function setState(s: Partial<FetchState<TData, TParams>>) {
    Object.assign(state, s);
  }
  return [state, setState];
}

export function usePlugins<TData, TParams extends any[]>(
  plugins: Plugin<TData, TParams>[],
  instance: FetchResult<TData, TParams>,
  options: Options<TData, TParams>
) {
  // 初始化插件
  const pluginImpls = plugins.map((p) => p(instance, options));
  function runPluginHandler(
    event: keyof PluginReturn<TData, TParams>,
    ...rest: any[]
  ) {
    const r = pluginImpls
      .map((i) => {
        // @ts-ignore
        return i[event]?.(...rest);
      })
      .filter(Boolean);
    return Object.assign({}, ...r);
  }
  // runPluginHandler("onInit", instance);
  return runPluginHandler;
}

function useSubscribe(key: string, callback: Listener) {
  const unsubscribe = ref<() => void>();
  function on() {
    unsubscribe.value = subscribe(key, callback);
  }
  function off() {
    unsubscribe.value && unsubscribe.value();
  }
  return [on, off];
}

function useCache<TData, TParams extends unknown[]>(
  { cacheKey, cacheTime = 5 * 60 * 1000, staleTime = 0 }: CacheType,
  setState: (s: Partial<FetchState<TData, TParams>>) => void
): [
  () => TData | false | void,
  (service: Service<TParams>, args: TParams) => Promise<TData>,
  (data: TData, params: TParams) => void
] {
  function getServicePromise(
    service: Service<TParams>,
    args: TParams
  ): Promise<any> {
    return service(...args);
  }
  if (!cacheKey) {
    return [() => {}, getServicePromise, () => {}];
  }
  const subscribeRef = ref();
  const promiseRef = ref();
  const cacheData = getCache(cacheKey);
  if (cacheData) {
    setState({
      data: cacheData.data,
      params: cacheData.params,
    });
  }
  // 启动缓存发送变化时同步更新data
  subscribeRef.value = useSubscribe(cacheKey, (data) => {
    setState({ data });
  });
  subscribeRef.value[0]();
  function onChange(data: TData, params: TParams) {
    const [on, off] = subscribeRef.value!;
    off();
    setCache(cacheKey!, cacheTime, data, params);
    on();
  }
  function onBefore() {
    const d = getCache(cacheKey!);
    if (d && (staleTime === -1 || Date.now() - d.time <= staleTime)) {
      return d.data;
    }
    return false;
  }
  function onRequest(service: Service<TParams>, args: TParams): Promise<any> {
    const cachePromise = getCachePromise(cacheKey!);
    if (cachePromise && cachePromise !== promiseRef.value) {
      return cachePromise;
    }
    const servicePromise = getServicePromise(service, args);
    promiseRef.value = servicePromise;
    setCachePromise(cacheKey!, servicePromise);
    return servicePromise;
  }
  return [onBefore, onRequest, onChange];
}

export default function useFetch<TData, TParams extends any[]>(
  service: Service<TParams>,
  options: Options<TData, TParams>,
  plugins: Plugin<TData, TParams>[]
): FetchResult<TData, TParams> {
  const initState = {
    loading: !options.manual && (options?.ready?.value ?? true),
    params: options.defaultParams || undefined,
    data: undefined,
    error: undefined,
  };
  const [state, setState] = useState<TData, TParams>(initState);

  // cache
  const { cacheKey, cacheTime, staleTime } = options;
  const [onCacheBefore, onCacheRequest, onCacheChange] = useCache<
    TData,
    TParams
  >({ cacheKey, cacheTime, staleTime }, setState);
  const count = ref(0);
  const result = {
    state,
    runAsync,
    run,
    refresh,
    refreshAsync,
    cancel,
    setState,
    mutate,
  };

  // 初始化插件
  const runPluginHandler = usePlugins(plugins, result, options);
  async function runAsync(...params: TParams): Promise<TData> {
    count.value++;
    const currentCount = toRaw(count.value);
    const cache = onCacheBefore();
    if (cache) {
      return Promise.resolve(cache);
    }
    const {
      stopNow = false,
      returnNow = false,
      ...others
    } = runPluginHandler("onBefore", params);
    if (stopNow) {
      return new Promise(() => {});
    }
    if (returnNow) {
      // runPluginHandler("onSuccess", others.data, params);
      // runPluginHandler("onFinally", params, others.data, state.error);
      return Promise.resolve(others.data);
    }
    options.onBefore?.(params);
    try {
      setState({
        loading: true,
        params,
        ...others,
      });
      // 特殊场景使用，不推荐业务插件接入
      runPluginHandler("onBeforeRequest");
      const result = await onCacheRequest(service, params);
      let res: TData;
      if (currentCount !== count.value) {
        return new Promise(() => {});
      }
      if (options.formatResult) {
        res = options.formatResult(result);
      } else {
        res = result;
      }
      setState({
        data: res,
        error: undefined,
        loading: false,
      });
      options.onSuccess?.(res, params);
      runPluginHandler("onSuccess", res, params);
      onCacheChange(res, params);
      return res;
    } catch (error) {
      if (currentCount !== count.value) {
        return new Promise(() => {});
      }
      setState({
        error: error as Error,
        loading: false,
      });
      options.onError?.(error as Error, params);
      runPluginHandler("onError", error, params);
      throw error;
    } finally {
      const { data, error } = state;
      options.onFinally?.(params, data, error);
      runPluginHandler("onFinally", params, data, error);
    }
  }
  function run(...params: TParams) {
    // 运行插件重写方法
    result.runAsync(...params).catch((e) => {
      if (!options.onError) {
        console.error(e);
      }
    });
  }
  function refresh() {
    run(...(state.params as TParams));
  }
  function refreshAsync() {
    return runAsync(...(state.params as TParams));
  }
  function cancel() {
    count.value++;
    setState({
      loading: false,
    });
    runPluginHandler("onCancel");
  }
  // 直接修改data；
  function mutate(data: TData | ((oldData?: TData) => TData | undefined)) {
    // @ts-ignore
    const targetData = typeof data === "function" ? data(state.data) : data;
    runPluginHandler("onMutate", targetData, state.params);
    onCacheChange(targetData, state.params!);
    setState({
      data: targetData,
    });
  }
  return result;
}

import { Ref, ref, shallowReactive, ShallowReactive, toRaw } from "vue-demi";
import {
  FetchResult,
  FetchState,
  Options,
  Plugin,
  PluginReturn,
  Service,
} from "./types";

function useState<TData, TParams extends any[]>(
  options: Options<TData, TParams> = {}
): [
  ShallowReactive<FetchState<TData, TParams>>,
  (s: Partial<FetchState<TData, TParams>>) => void
] {
  const state = shallowReactive<FetchState<TData, TParams>>({
    loading: !options.manual && (options?.ready?.value ?? true),
    params: options.defaultParams || undefined,
    data: undefined,
    error: undefined,
  });
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

export default function useFetch<TData, TParams extends any[]>(
  serviceRef: Ref<Service<TData, TParams>>,
  options: Options<TData, TParams>,
  plugins: Plugin<TData, TParams>[]
): FetchResult<TData, TParams> {
  const [state, setState] = useState<TData, TParams>(options);
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
      let { servicePromise } = runPluginHandler(
        "onRequest",
        serviceRef.value,
        params
      );
      if (!servicePromise) {
        servicePromise = serviceRef.value(...params);
      }
      const res = await servicePromise;
      if (currentCount !== count.value) {
        return new Promise(() => {});
      }
      setState({
        data: res,
        error: undefined,
        loading: false,
      });
      options.onSuccess?.(res, params);
      runPluginHandler("onSuccess", res, params);
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
    setState({
      data: targetData,
    });
  }
  return result;
}

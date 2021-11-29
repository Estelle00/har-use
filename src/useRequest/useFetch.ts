import { shallowReactive, Ref, ref, toRaw, ShallowReactive } from "vue";
import {
  FetchState,
  FetchResult,
  Options,
  Plugin,
  PluginReturn,
  Service,
} from "./types";

function useState<TData, TParams extends unknown[]>(
  options: Options<TData, TParams> = {}
): [
  ShallowReactive<FetchState<TData, TParams>>,
  (s: Partial<FetchState<TData, TParams>>) => void
] {
  const state = shallowReactive<FetchState<TData, TParams>>({
    loading: !options.manual,
    params: undefined,
    data: undefined,
    error: undefined,
  });
  function setState(s: Partial<FetchState<TData, TParams>> = {}) {
    Object.assign(state, s);
  }
  return [state, setState];
}
export default function useFetch<TData, TParams extends unknown[]>(
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
  };
  // 初始化插件
  const pluginImpls = plugins.map((p) => p(result, options));
  function runPluginHandler(
    event: keyof PluginReturn<TData, TParams>,
    ...rest: unknown[]
  ) {
    // @ts-ignore
    const r = pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }
  async function runAsync(...params: TParams): Promise<TData> {
    count.value++;
    const currentCount = toRaw(count.value);
    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = runPluginHandler("onBefore", params);
    if (stopNow) {
      return new Promise(() => {});
    }
    setState({
      loading: true,
      params,
      ...state,
    });
    if (returnNow) {
      return state.data;
    }
    options.onBefore?.(params);
    try {
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
    }
  }
  function run(...params: TParams) {
    runAsync(...params).catch((e) => {
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
  return result;
}

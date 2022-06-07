import { Ref, ref, shallowRef, unref } from "vue";
import type {
  FetchResult,
  FetchState,
  Options,
  PluginReturn,
  Service,
} from "./types";
import { resolvedPromise } from "./utils";
import { PartialState } from "./types";
import { isFunction, isObject } from "@/utils";
function useState<TData, TParams extends unknown[]>(
  fetchState: FetchState<TData, TParams>
) {
  return (newState: PartialState<TData, TParams>) => {
    Object.keys(newState).forEach((key) => {
      fetchState[key].value = newState[key];
    });
  };
}
export default function useFetch<TData, TParams extends unknown[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams>
) {
  const loading = ref(!options.manual && (options?.ready?.value ?? true));
  const params = ref() as Ref<TParams>;
  const data = shallowRef<TData>();
  const error = shallowRef(undefined);
  const setState = useState<TData, TParams>({
    loading,
    params,
    data,
    error,
  });
  const plugins = ref([]) as FetchResult<TData, TParams>["plugins"];

  function runPluginHandler(
    event: keyof PluginReturn<TData, TParams>,
    ...rest: any[]
  ) {
    const r = plugins.value
      .map((i) => {
        // @ts-ignore
        return i[event]?.(...rest);
      })
      .filter(Boolean);
    return Object.assign({}, ...r);
  }

  const count = ref(0);
  async function runAsync(...args: TParams): Promise<TData> {
    setState({
      loading: true,
      params: args,
    });
    count.value += 1;
    const currentCount = unref(count);
    const { isBreak = false, breakResult = resolvedPromise() } =
      runPluginHandler("onBefore", params);
    if (isBreak) {
      return breakResult;
    }
    options.onBefore?.(args);
    try {
      let { servicePromise } = runPluginHandler(
        "onRequest",
        service,
        params.value
      );
      if (!servicePromise) {
        servicePromise = service(...params.value);
      }
      let res = await servicePromise;
      if (currentCount !== count.value) {
        return resolvedPromise();
      }
      if (options.formatResult) {
        res = options.formatResult(res);
      }
      setState({
        data: res,
        error: undefined,
        loading: false,
      });
      options.onSuccess?.(res, args);
      runPluginHandler("onSuccess", res, params.value);
      return res;
    } catch (e) {
      if (currentCount !== count.value) {
        return resolvedPromise();
      }
      setState({
        error: e,
        loading: false,
      });
      options.onError?.(error.value!, args);
      runPluginHandler("onError", error.value, args);
      throw error;
    } finally {
      options.onFinally?.(args, data.value, error.value);
      runPluginHandler("onFinally", params.value, data.value, error.value);
    }
  }
  function run(...params: TParams) {
    // 运行插件重写方法
    runAsync(...params).catch((e) => {
      if (!options.onError) {
        console.error(e);
      }
    });
  }
  function refresh() {
    run(...params.value);
  }
  function refreshAsync() {
    return runAsync(...params.value);
  }
  function cancel() {
    count.value++;
    setState({
      loading: false,
    });
    runPluginHandler("onCancel");
  }
  // 直接修改data；
  function mutate(x: TData | ((oldData?: TData) => TData)) {
    const targetData = isFunction(x) ? x(data.value) : x;
    const _targetData = isObject(targetData)
      ? Object.assign({}, targetData)
      : targetData;
    runPluginHandler("onMutate", _targetData, params.value);
    setState({
      data: _targetData,
    });
  }

  return {
    loading,
    params,
    data,
    error,
    run,
    runAsync,
    refresh,
    refreshAsync,
    cancel,
    mutate,
    plugins,
  } as const;
}

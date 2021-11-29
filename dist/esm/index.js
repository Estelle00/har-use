import { ref, shallowReactive, toRaw, onMounted, onUnmounted } from 'vue';

function filterObjectKeys(data, keys) {
  if (typeof keys === "string") {
    keys = [keys];
  }
  return Object.keys(data).reduce((newData, key) => {
    if (!keys.includes(key)) {
      newData[key] = data[key];
    }
    return newData;
  }, {});
}

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function useState(options = {}) {
  const state = shallowReactive({
    loading: !options.manual,
    params: void 0,
    data: void 0,
    error: void 0
  });
  function setState(s = {}) {
    Object.assign(state, s);
  }
  return [state, setState];
}
function useFetch(serviceRef, options, plugins) {
  const [state, setState] = useState(options);
  const count = ref(0);
  const result = {
    state,
    runAsync,
    run,
    refresh,
    refreshAsync,
    cancel
  };
  const pluginImpls = plugins.map((p) => p(result, options));
  function runPluginHandler(event, ...rest) {
    const r = pluginImpls.map((i) => {
      var _a;
      return (_a = i[event]) == null ? void 0 : _a.call(i, ...rest);
    }).filter(Boolean);
    return Object.assign({}, ...r);
  }
  function runAsync(...params) {
    return __async(this, null, function* () {
      var _b, _c, _d, _e;
      count.value++;
      const currentCount = toRaw(count.value);
      const _a = runPluginHandler("onBefore", params), {
        stopNow = false,
        returnNow = false
      } = _a, state2 = __objRest(_a, [
        "stopNow",
        "returnNow"
      ]);
      if (stopNow) {
        return new Promise(() => {
        });
      }
      setState(__spreadValues({
        loading: true,
        params
      }, state2));
      if (returnNow) {
        return state2.data;
      }
      (_b = options.onBefore) == null ? void 0 : _b.call(options, params);
      try {
        let { servicePromise } = runPluginHandler("onRequest", serviceRef.value, params);
        if (!servicePromise) {
          servicePromise = serviceRef.value(...params);
        }
        const res = yield servicePromise;
        if (currentCount !== count.value) {
          return new Promise(() => {
          });
        }
        setState({
          data: res,
          error: void 0,
          loading: false
        });
        (_c = options.onSuccess) == null ? void 0 : _c.call(options, res, params);
        runPluginHandler("onSuccess", res, params);
        return res;
      } catch (error) {
        if (currentCount !== count.value) {
          return new Promise(() => {
          });
        }
        setState({
          error,
          loading: false
        });
        (_d = options.onError) == null ? void 0 : _d.call(options, error, params);
        runPluginHandler("onError", error, params);
        throw error;
      } finally {
        const { data, error } = state2;
        (_e = options.onFinally) == null ? void 0 : _e.call(options, params, data, error);
      }
    });
  }
  function run(...params) {
    runAsync(...params).catch((e) => {
      if (!options.onError) {
        console.error(e);
      }
    });
  }
  function refresh() {
    run(...state.params);
  }
  function refreshAsync() {
    return runAsync(...state.params);
  }
  function cancel() {
    count.value++;
    setState({
      loading: false
    });
    runPluginHandler("onCancel");
  }
  return result;
}

function useRequestImplement(service, options = {}, plugins = []) {
  const { manual } = options;
  const fetchOptions = filterObjectKeys(options, "defaultParams");
  const serviceRef = ref(service);
  const fetchInstance = useFetch(serviceRef, fetchOptions, plugins);
  const { state, refresh, refreshAsync, run, runAsync } = fetchInstance;
  onMounted(() => {
    if (!manual) {
      const params = state.params || [];
      run(...params);
    }
  });
  onUnmounted(() => {
    fetchInstance.cancel();
  });
  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
    params: state.params || [],
    refresh,
    refreshAsync,
    run,
    runAsync
  };
}

function useRequest(service, options, plugins) {
  return useRequestImplement(service, options, [
    ...plugins || []
  ]);
}

export { useRequest };

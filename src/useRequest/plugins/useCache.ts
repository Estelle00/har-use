import { Plugin } from "../types";
import { getCache, Listener, setCache, subscribe } from "../utils/cache";
import { ref } from "vue";
import { getCachePromise, setCachePromise } from "../utils/cachePromise";

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
const useCache: Plugin<any, any[]> = ({
  cacheKey,
  cacheTime = 5 * 60 * 1000,
  staleTime = 0,
}) => {
  if (!cacheKey) {
    return {};
  }
  const promiseRef = ref();
  const subscribeRef = ref();

  function changeCache(data: any, params: any[]) {
    const [on, off] = subscribeRef.value;
    // 先关闭当前实例订阅避免重复触发
    off();
    setCache(cacheKey!, cacheTime, data, params);
    on();
  }

  return {
    onInit(instance) {
      const cacheData = getCache(cacheKey);
      if (cacheData) {
        instance.setState({
          data: cacheData.data,
          params: cacheData.params,
        });
      }
      // 启动缓存发送变化时同步更新data
      subscribeRef.value = useSubscribe(cacheKey, (data) => {
        instance.setState({
          data,
        });
      });
      subscribeRef.value[0]();
    },
    onBefore() {
      const cacheData = getCache(cacheKey);
      if (cacheData) {
        const { data } = cacheData;
        if (staleTime === -1 || Date.now() - cacheData.time <= staleTime) {
          return {
            returnNow: true,
            data,
          };
        } else {
          return {
            data,
          };
        }
      }
    },
    onRequest(service, args) {
      let servicePromise = getCachePromise(cacheKey);
      if (servicePromise && servicePromise !== promiseRef.value) {
        return {
          servicePromise,
        };
      }
      servicePromise = service(...args);
      promiseRef.value = servicePromise;
      setCachePromise(cacheKey, servicePromise);
      return {
        servicePromise,
      };
    },
    onSuccess: changeCache,
    onMutate: changeCache,
  };
};

export default useCache;

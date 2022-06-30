import { definePlugin } from "../definePlugin";
import { createCache } from "@har-use/utils";
import { getCachePromise, setCachePromise } from "@har-use/utils";
import { ref } from "vue";
import { tryOnScopeDispose } from "../../../tryOnScopeDispose";

const { getCache, setCache, subscribe } = createCache(
  Symbol("useRequestCache")
);

export default definePlugin(
  (instance, { cacheKey, cacheTime = 5 * 60 * 1000, staleTime = -1 }) => {
    if (!cacheKey) return {};
    const promiseRef = ref();
    const subscribeRef = ref();
    function subscribeCache() {
      return subscribe(cacheKey!, (data) => {
        instance.data.value = data;
      });
    }
    subscribeRef.value = subscribeCache();
    tryOnScopeDispose(() => {
      subscribeRef.value();
    });
    function setDataToCache(data: any, params = instance.params.value) {
      subscribeRef.value();
      setCache(cacheKey!, data, cacheTime, params);
      subscribeRef.value = subscribeCache();
    }
    return {
      onBefore() {
        const cache = getCache(cacheKey);
        if (!cache) {
          return {};
        } else {
          instance.data.value = cache.data;
          if (staleTime === -1 || Date.now() - cache.time <= staleTime) {
            instance.loading.value = false;
            return {
              isBreak: true,
              breakResult: cache.data,
            };
          }
        }
      },
      onRequest(service, params) {
        let servicePromise = getCachePromise(cacheKey);
        if (!servicePromise || servicePromise === promiseRef.value) {
          servicePromise = service(...params);
          promiseRef.value = servicePromise;
          setCachePromise(cacheKey, servicePromise);
        }
        return {
          servicePromise,
        };
      },
      onSuccess(data, params) {
        setDataToCache(data, params);
      },
      onMutate(data) {
        setDataToCache(data);
      },
    };
  }
);

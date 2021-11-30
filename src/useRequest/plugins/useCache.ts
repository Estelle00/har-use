import { Plugin } from "../types";
import { getCache, setCache } from "../utils/cache";
import { ref } from "vue";
import { getCachePromise, setCachePromise } from "../utils/cachePromise";

const useCache: Plugin<any, any[]> = ({
  cacheKey,
  cacheTime = 5 * 60 * 1000,
  staleTime = 0,
}) => {
  const promiseRef = ref();
  return {
    onInit(instance) {
      if (!cacheKey) return {};
      const cacheData = getCache(cacheKey);
      if (cacheData) {
        instance.setState({
          data: cacheData.data,
          params: cacheData.params,
        });
      }
    },
    onBefore() {
      const cacheData = cacheKey && getCache(cacheKey);
      if (cacheData) {
        const { data } = cacheData;
        if (staleTime === -1 || Date.now() - cacheData.time <= staleTime) {
          return {
            loading: false,
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
      if (!cacheKey) return {};
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
    onSuccess(data, params) {
      if (cacheKey) setCache(cacheKey, cacheTime, data, params);
    },
    onMutate(data, params) {
      if (cacheKey) {
        setCache(cacheKey, cacheTime, data, params);
      }
    },
  };
};

export default useCache;

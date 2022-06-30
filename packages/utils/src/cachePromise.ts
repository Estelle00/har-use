import type { CacheKey } from "./types";
import { createCache } from "./cache";
const { getCache, setCache, deleteCache } = createCache(Symbol("promise"));
export function getCachePromise(key: CacheKey) {
  return getCache(key)?.data;
}
export function setCachePromise(key: CacheKey, promise: Promise<any>) {
  setCache(key, promise);
  promise.finally(() => {
    deleteCache(key);
  });
}

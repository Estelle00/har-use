import type { CacheKey } from "../../utils";
const cachePromise = new Map<CacheKey, Promise<any>>();

export function getCachePromise(key: CacheKey) {
  return cachePromise.get(key);
}
export function setCachePromise(key: CacheKey, promise: Promise<any>) {
  cachePromise.set(key, promise);
  promise.finally(() => {
    cachePromise.delete(key);
  });
}

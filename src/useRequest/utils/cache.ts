type Timer = ReturnType<typeof setTimeout>;
export type CacheKey = string | number;
type CacheValue = {
  data: any;
  params: any;
  timer: Timer | undefined;
  time: number;
};
const cache = new Map<CacheKey, CacheValue>();
function setCache(key: CacheKey, cacheTime: number, data: any, params: any[]) {
  const currentCache = cache.get(key);
  if (currentCache?.timer) {
    clearTimeout(currentCache.timer);
  }
  let timer: Timer | undefined = undefined;
  if (cacheTime > -1) {
    timer = setTimeout(function () {
      cache.delete(key);
    }, cacheTime);
  }
  cache.set(key, {
    data,
    params,
    timer,
    time: Date.now(),
  });
}
function getCache(key: CacheKey) {
  return cache.get(key);
}

export { setCache, getCache };

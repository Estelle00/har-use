type Timer = ReturnType<typeof setTimeout>;
export type CacheKey = string | number;
export type CacheValue = {
  data: any;
  params: any;
  timer: Timer | undefined;
  time: number;
};
const cache = new Map<CacheKey, CacheValue>();
export type Listener = (data: any) => void;
const listeners: Record<string, Listener[]> = {};
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
  // trigger listeners
  if (listeners[key]) {
    listeners[key].forEach((item) => item(data));
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
function subscribe(key: string, listener: Listener) {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);
  return function unsubscribe() {
    const index = listeners[key].indexOf(listener);
    listeners[key].splice(index, 1);
  };
}
export { setCache, getCache, subscribe };

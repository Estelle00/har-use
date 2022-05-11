type Timer = ReturnType<typeof setTimeout>;
export type CacheKey = string | number;
export type CacheValue = {
  data: any;
  params: any;
  timer: Timer | undefined;
  time: number;
};
export type CacheListener = (data: any) => void;
const instanceCache = new Map<CacheKey | symbol, Cache>();

class Cache {
  cache = new Map<CacheKey, CacheValue>();
  listeners: Record<CacheKey, CacheListener[]> = {};
  setCache(key: CacheKey, cacheTime: number, data: any, params: any[]) {
    const currentCache = this.cache.get(key);
    if (currentCache?.timer) {
      clearTimeout(currentCache.timer);
    }
    let timer: Timer | undefined = undefined;
    if (cacheTime > -1) {
      timer = setTimeout(() => {
        this.cache.delete(key);
      }, cacheTime);
    }
    // trigger listeners
    if (this.listeners[key]) {
      this.listeners[key].forEach((item) => item(data));
    }
    this.cache.set(key, {
      data,
      params,
      timer,
      time: Date.now(),
    });
  }
  getCache(key: CacheKey) {
    return this.cache.get(key);
  }
  subscribe(key: string, listener: CacheListener) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(listener);
    return () => {
      const index = this.listeners[key].indexOf(listener);
      this.listeners[key].splice(index, 1);
    };
  }
}
export function createCache(name: CacheKey | symbol) {
  const cacheInstance = instanceCache.get(name);
  if (cacheInstance) return cacheInstance;
  const instance = new Cache();
  instanceCache.set(name, instance);
  return instance;
}

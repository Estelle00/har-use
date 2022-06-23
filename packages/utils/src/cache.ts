type Timer = ReturnType<typeof setTimeout>;
export type CacheKey = string | number | symbol;
export type CacheValue = {
  data: any;
  params: any;
  timer: Timer | undefined;
  time: number;
};
export type CacheListener = (data: any, params: any[]) => void;
export type ReturnCache = {
  getCache: Cache["getCache"];
  setCache: Cache["setCache"];
  subscribe: Cache["subscribe"];
  deleteCache: Cache["deleteCache"];
};
const instanceCache = new Map<CacheKey, ReturnCache>();
class Cache {
  cache = new Map<CacheKey, CacheValue>();
  listeners: Record<CacheKey, CacheListener[]> = {};
  setCache(key: CacheKey, data: any, cacheTime = -1, params: any[] = []) {
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
      this.listeners[key].forEach((item) => item(data, params));
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
  deleteCache(key: CacheKey) {
    this.cache.delete(key);
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
export function createCache(name: CacheKey) {
  const cacheInstance = instanceCache.get(name);
  if (cacheInstance) return cacheInstance;
  const instance = new Cache();
  const returnData = {
    getCache: instance.getCache.bind(instance),
    setCache: instance.setCache.bind(instance),
    subscribe: instance.subscribe.bind(instance),
    deleteCache: instance.deleteCache.bind(instance),
  };
  instanceCache.set(name, returnData);
  return returnData;
}

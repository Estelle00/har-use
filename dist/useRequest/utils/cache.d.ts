declare type Timer = ReturnType<typeof setTimeout>;
export declare type CacheKey = string | number;
declare type CacheValue = {
    data: unknown;
    params: unknown;
    timer: Timer | undefined;
    time: number;
};
export declare function setCache(key: CacheKey, cacheTime: number, data: unknown, params: unknown): void;
export declare function getCache(key: CacheKey): CacheValue | undefined;
export {};

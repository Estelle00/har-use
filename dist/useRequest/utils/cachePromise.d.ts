import { CacheKey } from "./cache";
export declare function getCachePromise(key: CacheKey): Promise<unknown> | undefined;
export declare function setCachePromise(key: CacheKey, promise: Promise<unknown>): void;

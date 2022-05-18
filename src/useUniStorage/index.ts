import type { MayBeRef, StorageLike } from "../type";
import { useStorage } from "../useStorage";
import type { StorageOptions } from "../useStorage";
const storage: StorageLike = {
  getItem(key) {
    const { keys } = uni.getStorageInfoSync();
    return keys.includes(key) ? uni.getStorageSync(key) : null;
  },
  setItem(key, value) {
    uni.setStorageSync(key, value);
  },
  removeItem(key) {
    uni.removeStorageSync(key);
  },
};
export function useUniStorage<
  T extends string | number | boolean | object | null
>(key: string, initialValue: MayBeRef<T>, options: StorageOptions<T> = {}) {
  return useStorage<T>(key, initialValue, storage, options);
}

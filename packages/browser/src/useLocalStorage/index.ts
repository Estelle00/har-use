import { useStorage } from "@har-use/core";
import type { MayBeRef } from "@har-use/utils";
import type { StorageOptions } from "@har-use/core";
import { inBrowser } from "@har-use/utils";

export function useLocalStorage<
  T extends string | number | boolean | object | null
>(key: string, initialValue: MayBeRef<T>, options: StorageOptions<T> = {}) {
  if (!inBrowser) return;
  return useStorage(
    key,
    initialValue,
    {
      setItem(key, value) {
        localStorage.setItem(key, value);
      },
      getItem(key) {
        return localStorage.getItem(key);
      },
      removeItem(key) {
        localStorage.removeItem(key);
      },
    },
    options
  );
}

import type { Ref } from "vue";
export type Fn = () => void;
export type MayBeRef<T> = T | Ref<T>;
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

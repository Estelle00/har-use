import type { Ref } from "vue";

export type CacheKey = string | number | symbol;
export type GeneralEventListener<E = Event> = {
  (evt: E): void;
};
export type Fn = () => void;
export type MayBeRef<T> = T | Ref<T>;
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

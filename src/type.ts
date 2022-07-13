import type { Ref } from "vue";
export interface GeneralEventListener<E = Event> {
  (evt: E): void;
}
export type Fn = () => void;
export type MayBeRef<T> = T | Ref<T>;
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
export type RemovableRef<T> = Omit<Ref<T>, "value"> & {
  get value(): T;
  set value(value: T | null | undefined);
};

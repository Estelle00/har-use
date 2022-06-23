import type { Ref } from "vue";
export interface GeneralEventListener<E = Event> {
    (evt: E): void;
}
export declare type Fn = () => void;
export declare type MayBeRef<T> = T | Ref<T>;
export interface StorageLike {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}

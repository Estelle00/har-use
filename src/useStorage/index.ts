import type { MayBeRef, StorageLike, RemovableRef } from "@/type";
import { nextTick, ref, unref } from "vue";
import { typeOf, createCache } from "@/utils";
import { pausableWatch } from "@/pausableWatch";
import { tryOnScopeDispose } from "@/tryOnScopeDispose";
const { setCache, subscribe, deleteCache } = createCache(Symbol("useStorage"));
export interface Serializer<T> {
  read: (v: string) => T;
  write: (v: T) => string;
}
export interface StorageOptions<T> {
  deep?: boolean;
  serializer?: Serializer<T>;
}
enum Type {
  set = "set",
  map = "map",
  date = "date",
  boolean = "boolean",
  string = "string",
  object = "object",
  array = "array",
  number = "number",
}
type GuestType = keyof typeof Type | "any";
function guessType(data: any): GuestType {
  const type = typeOf(data);
  if (type in Type) {
    return type as GuestType;
  }
  return "any";
}
function parse(val: any) {
  try {
    return JSON.parse(val);
  } catch (e) {
    return "";
  }
}
// todo any问题后面处理 复杂对象待处理
export const storageSerializers: Record<GuestType, Serializer<any>> = {
  set: {
    read: (v) => new Set(parse(v)),
    write: (v) => JSON.stringify(Array.from(v)),
  },
  map: {
    read: (v) => new Set(parse(v)),
    write: (v) => JSON.stringify(Array.from(v).entries()),
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString(),
  },
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v),
  },
  number: {
    read: (v) => Number(v),
    write: (v) => String(v),
  },
  string: {
    read: (v) => v,
    write: (v) => String(v),
  },
  object: {
    read: (v) => parse(v),
    write: (v) => JSON.stringify(v),
  },
  array: {
    read: (v) => parse(v),
    write: (v) => JSON.stringify(v),
  },
  any: {
    read: (v) => v,
    write: (v) => String(v),
  },
};
export function useStorage<T extends string | number | boolean | object | null>(
  key: string,
  initialValue: MayBeRef<T>,
  storage: StorageLike | undefined,
  options: StorageOptions<T> = {}
): RemovableRef<T> {
  const { deep = true } = options;
  const data = ref(initialValue) as RemovableRef<T>;
  if (!storage) return data;
  const rawInit = unref(initialValue);
  const type = guessType(initialValue);
  const serializer = options.serializer ?? storageSerializers[type];
  const { pause, resume } = pausableWatch(
    data,
    (v: T) => {
      write(v);
    },
    {
      deep,
    }
  );

  function write(v: T) {
    if (v === null) {
      storage!.removeItem(key);
      deleteCache(key);
    } else {
      const d = serializer.write(v);
      storage!.setItem(key, d);
      setCache(key, d);
    }
  }
  const unsubscribe = subscribe(key, read);
  tryOnScopeDispose(unsubscribe);
  function read(newValue?: any) {
    pause();
    const rawVal = newValue ?? storage!.getItem(key);
    if (rawVal === null) {
      data.value = rawInit;
      storage!.setItem(key, serializer.write(rawInit));
    } else {
      data.value = serializer.read(rawVal);
    }
    nextTick(resume);
  }
  read();
  return data;
}

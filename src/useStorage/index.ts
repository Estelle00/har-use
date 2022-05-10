import type { MayBeRef, StorageLike } from "../type";
import { ref, unref } from "vue";
import { typeOf } from "../utils";
import { watchPusable } from "../watchPausable";

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
}
type GuestType = keyof typeof Type | "any";
function guessType(data: any): GuestType {
  const type = typeOf(data);
  if (type in Type) {
    return type as GuestType;
  }
  return "any";
}
// todo any问题后面处理 复杂对象待处理
export const StorageSerializers: Record<GuestType, Serializer<any>> = {
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v)),
  },
  map: {
    read: (v) => new Set(JSON.parse(v)),
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
  string: {
    read: (v) => v,
    write: (v) => String(v),
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v),
  },
  array: {
    read: (v) => JSON.parse(v),
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
) {
  const { deep = true } = options;
  const data = ref(initialValue);
  if (!storage) return data;
  const rawInit = unref(initialValue);
  const type = guessType(rawInit);
  const serializer = options.serializer ?? StorageSerializers[type];
  const { pause, resume } = watchPusable(data, (v: T) => write(v), {
    deep,
  });

  function write(v: T) {
    if (v === null) {
      storage!.removeItem(key);
    } else {
      storage!.setItem(key, serializer.write(v));
    }
  }
  function init() {
    pause();
    const rawVal = storage!.getItem(key);
    if (rawVal === null) {
      data.value = rawInit;
      storage!.setItem(key, serializer.write(rawInit));
    } else {
      data.value = serializer.read(rawVal);
    }
    resume();
  }
  init();
  return data;
}

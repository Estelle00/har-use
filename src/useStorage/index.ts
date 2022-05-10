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
  set,
  map,
  date,
  boolean,
  string,
  object,
  array,
}
type GuestType = keyof typeof Type | "any";
function guessType(data: any): GuestType {
  const type = typeOf(data);
  if (type in Type) {
    return type as GuestType;
  }
  return "any";
}
// todo any问题后面处理
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
  const { resume: resumeWatch, pause: pauseWatch } = watchPusable(
    data,
    (v: T) => write(v),
    {
      deep,
    }
  );

  function write(v: T) {
    if (v === null) {
      storage!.removeItem(key);
    } else {
      storage!.setItem(key, serializer.write(v));
    }
  }
  function read() {
    pauseWatch();
    try {
      const rawVal = storage!.getItem(key);
      if (rawVal === null) {
        storage!.setItem(key, serializer.write(rawInit));
        return rawInit;
      }
      if (typeOf(rawVal) !== "string") return rawInit;
      return serializer.read(key);
    } finally {
      resumeWatch();
    }
  }
  function update() {
    data.value = read();
  }
  update();
  return data;
}

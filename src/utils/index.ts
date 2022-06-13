export * from "./cache";
export const inBrowser = typeof window !== "undefined";
export const isWindow = (val: unknown): val is Window => val === window;
export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : setTimeout(fn, 1000 / 60);
}
export function cancelRaf(id: number) {
  inBrowser ? cancelAnimationFrame(id) : clearTimeout(id);
}
export function typeOf(data: any) {
  return {}.toString
    .call(data)
    .match(/\[object (\w+)]/)![1]
    .toLowerCase();
}

export function tryParse(data: any) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}
// 驼峰转连字符
export function camel2hyphen(str: string) {
  return str
    .replace(/[A-Z]/g, function (match) {
      return "-" + match.toLowerCase();
    })
    .toLowerCase();
}

function isDimension(feature: string) {
  const re = /[height|width]$/;
  return re.test(feature);
}
type Obj2MediaQueryType = Record<string, unknown>;
export function obj2MediaQueryString(query: Obj2MediaQueryType) {
  const features = Object.keys(query);
  return features.reduce((prev, current, index) => {
    let value = query[current];
    const key = camel2hyphen(current);
    if (isDimension(key) && typeOf(value) === "number") {
      value += "px";
    }
    if (value === true) {
      prev += key;
    } else if (value === false) {
      prev += "not " + key;
    } else {
      prev += `(${key}: ${value})`;
    }
    if (index < features.length - 1) {
      prev += " and ";
    }
    return prev;
  }, "");
}

export type Json2MediaQueryType =
  | Obj2MediaQueryType
  | Obj2MediaQueryType[]
  | string;
// JOSN转media query参数
export function json2MediaQueryString(query: Json2MediaQueryType) {
  const type = typeOf(query);
  if (type === "object") {
    return obj2MediaQueryString(query as Obj2MediaQueryType);
  }
  if (Array.isArray(query)) {
    return query
      .map(function (q) {
        return obj2MediaQueryString(q);
      })
      .join(", ");
  }
  return query as string;
}

export function isFunction(fn: unknown): fn is Function {
  return fn instanceof Function;
}
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === "object";
}
export function noop() {}

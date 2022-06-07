export function filterObjectKeys(
  data: Record<string, any>,
  keys: string | string[]
) {
  if (typeof keys === "string") {
    keys = [keys];
  }
  return Object.keys(data).reduce((newData, key) => {
    if (!keys.includes(key)) {
      newData[key] = data[key];
    }
    return newData;
  }, {} as Record<string, any>);
}
export function resolvedPromise() {
  return new Promise<any>(() => {});
}

export const inBrowser = typeof window !== "undefined";
export const isWindow = (val: unknown): val is Window => val === window;

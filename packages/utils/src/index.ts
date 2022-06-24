export * from "./types";
export * from "./cache";
export * from "./EventBus";
export * from "./unrefElement";
export const inBrowser = typeof window !== "undefined";
export const isWindow = (val: unknown): val is Window => val === window;

export function typeOf(data: any) {
  return {}.toString
    .call(data)
    .match(/\[object (\w+)]/)![1]
    .toLowerCase();
}

export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : setTimeout(fn, 1000 / 60);
}
export function cancelRaf(id: number) {
  inBrowser ? cancelAnimationFrame(id) : clearTimeout(id);
}
export function noop() {}

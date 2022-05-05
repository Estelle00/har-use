export const inBrowser = typeof window !== "undefined";
export const isWindow = (val: unknown): val is Window => val === window;
const hasRequestAnimFrame = !!requestAnimationFrame;
export function raf(fn: FrameRequestCallback): number {
  return hasRequestAnimFrame
    ? requestAnimationFrame(fn)
    : setTimeout(fn, 1000 / 60);
}
export function cancelRaf(id: number) {
  hasRequestAnimFrame ? cancelAnimationFrame(id) : clearTimeout(id);
}

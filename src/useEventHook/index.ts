type Listener<T> = (p?: T) => void;
export type EventHookOff = () => void;
export type EventHookOn<T = unknown> = (fn: Listener<T>) => EventHookOff;
export type EventHookTrigger<T = unknown> = (params?: T) => void;

export interface EventHook<T = unknown> {
  on: EventHookOn<T>;
  trigger: EventHookTrigger<T>;
}
export function useEventHook<T = unknown>(): EventHook<T> {
  const fns: Listener<T>[] = [];
  function on(fn: Listener<T>) {
    fns.push(fn);
    return function () {
      const index = fns.indexOf(fn);
      if (index > -1) {
        fns.splice(index, 1);
      }
    };
  }
  function trigger(param?: T) {
    fns.forEach((fn) => fn(param));
  }
  return {
    on,
    trigger,
  };
}

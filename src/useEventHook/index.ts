type Listener<T> = (p: T) => void;
export type EventHookOff<T = any> = (param: T) => void;
export type EventHookOn<T = any> = (fn: (params: T) => void) => EventHookOff;
export type EventHookTrigger<T = any> = (params: T) => void;

export interface EventHook<T = any> {
  on: EventHookOn<T>;
  trigger: EventHookTrigger<T>;
}
export function useEventHook<T = any>(): EventHook<T> {
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
  function trigger(param: T) {
    fns.forEach((fn) => fn(param));
  }
  return {
    on,
    trigger,
  };
}

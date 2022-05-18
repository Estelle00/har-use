type Listener<T> = (p?: T) => void;
export type EventBusOff = () => void;
export type EventBusOn<T = unknown> = (fn: Listener<T>) => EventBusOff;
export type EventBusTrigger<T = unknown> = (params?: T) => void;

export interface EventBus<T = unknown> {
  on: EventBusOn<T>;
  trigger: EventBusTrigger<T>;
}
export function useEventBus<T = unknown>(): EventBus<T> {
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

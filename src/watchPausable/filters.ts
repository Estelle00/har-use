import { useToggle } from "../useToggle";
import type { Fn } from "../type";

export interface ConfigurableEventFilter {
  eventFilter?: EventFilter;
}

export type FunctionArgs<Args extends any[] = any[], Return = void> = (
  ...args: Args
) => Return;

export interface FunctionWrapperOptions<
  Args extends any[] = any[],
  This = any
> {
  fn: FunctionArgs<Args, This>;
  args: Args;
  thisArg: This;
}

export type EventFilter<Args extends any[] = any[], This = any> = (
  invoke: Fn,
  options: FunctionWrapperOptions<Args, This>
) => void;
export const bypassFilter: EventFilter = (invoke: Fn) => {
  return invoke();
};
export function createFilterWrapper<T extends FunctionArgs>(
  filter: EventFilter,
  fn: T
) {
  function wrapper(this: any, ...args: any[]) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }

  return wrapper as any as T;
}
export function pusableFilter(cb = bypassFilter) {
  const [isActive, toggle] = useToggle(true);
  function pause() {
    toggle(false);
  }
  function resume() {
    toggle(true);
  }
  const eventFilter: EventFilter = (...args) => {
    if (isActive.value) {
      cb(...args);
    }
  };
  return {
    isActive,
    pause,
    resume,
    eventFilter,
  };
}

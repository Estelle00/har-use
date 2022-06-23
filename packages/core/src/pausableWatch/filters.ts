import { useToggle } from "../useToggle";
import type { Fn } from "@har-use/utils";

export interface ConfigurableEventFilter {
  eventFilter?: EventFilter;
}

export type FunctionArgs<Args extends unknown[] = unknown[], Return = void> = (
  ...args: Args
) => Return;

export interface FunctionWrapperOptions<
  Args extends unknown[] = unknown[],
  This = unknown
> {
  fn: FunctionArgs<Args, This>;
  args: Args;
  thisArg: This;
}

export type EventFilter<Args extends unknown[] = unknown[], This = unknown> = (
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
  function wrapper(this: unknown, ...args: unknown[]) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper as T;
}

export function pausableFilter(cb = bypassFilter) {
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
  } as const;
}

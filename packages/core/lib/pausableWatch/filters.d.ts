import type { Fn } from "@har-use/utils";
export interface ConfigurableEventFilter {
    eventFilter?: EventFilter;
}
export declare type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;
export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
    fn: FunctionArgs<Args, This>;
    args: Args;
    thisArg: This;
}
export declare type EventFilter<Args extends any[] = any[], This = any> = (invoke: Fn, options: FunctionWrapperOptions<Args, This>) => void;
export declare const bypassFilter: EventFilter;
export declare function createFilterWrapper<T extends FunctionArgs>(filter: EventFilter, fn: T): T;
export declare function pausableFilter(cb?: EventFilter<any[], any>): {
    isActive: import("vue").Ref<boolean>;
    pause: () => void;
    resume: () => void;
    eventFilter: EventFilter<any[], any>;
};

import { shallowReactive } from "vue-demi";

export function useGlobalState<T>(factory: () => T) {
  const state = shallowReactive({
    initialized: false,
    obj: undefined as undefined | T,
  });
  if (!state.initialized) {
    state.obj = factory();
    state.initialized = true;
  }
  return state.obj as T;
}

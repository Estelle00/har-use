import { effectScope } from "vue";

export function useGlobalState<T>(factory: () => T): () => T {
  let state: T;
  let initialized = false;
  const scope = effectScope(true);
  return () => {
    if (!initialized) {
      state = scope.run(factory)!;
      initialized = true;
    }
    return state;
  };
}

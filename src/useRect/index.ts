import { Ref, unref } from "vue";
import { isWindow } from "@/utils";

type Target = Element | Window;
function makeDOMRect(width: number, height: number) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  } as DOMRect;
}
export function useRect(target: Target | Ref<Target | undefined>) {
  const element = unref(target);
  if (isWindow(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return makeDOMRect(width, height);
  }
  if (element?.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return makeDOMRect(0, 0);
}

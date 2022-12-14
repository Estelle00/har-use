import { ComponentPublicInstance, unref } from "vue";
import { MayBeRef } from "@/type";

export type MaybeElement =
  | HTMLElement
  | SVGAElement
  | ComponentPublicInstance
  | undefined
  | null;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  MayBeRef<T>;
export type UnrefElementReturn<T extends MaybeElement = MaybeElement> =
  T extends ComponentPublicInstance
    ? Exclude<MaybeElement, ComponentPublicInstance>
    : T | undefined;
export function unrefElement<T extends MaybeElement>(
  elRef: MaybeElementRef<T>
): UnrefElementReturn<T> {
  const plain = unref(elRef);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}

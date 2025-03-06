import { N, O } from "@auaust/primitive-kit";
import { ColorChannels } from "~/types";

export function isRgbChannel(value: unknown): value is number {
  return N.is(value) && N.isBetween(value, 0, 255);
}

export function isAlphaChannel(value: unknown): value is number {
  return N.is(value) && N.isBetween(value, 0, 1);
}

export function isColorChannels(value: unknown): value is ColorChannels {
  return (
    O.is(value, false) &&
    isRgbChannel(value.r) &&
    isRgbChannel(value.g) &&
    isRgbChannel(value.b) &&
    isAlphaChannel(value.a)
  );
}

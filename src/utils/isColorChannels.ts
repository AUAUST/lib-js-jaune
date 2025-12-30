import { O } from "@auaust/primitive-kit";
import type { ColorChannels } from "~/types";
import { isAlphaChannel, isRgbChannel } from "~/utils";

export function isColorChannels(value: unknown): value is ColorChannels {
  return (
    O.is(value, false) &&
    isRgbChannel(value.r) &&
    isRgbChannel(value.g) &&
    isRgbChannel(value.b) &&
    isAlphaChannel(value.a ?? 1)
  );
}

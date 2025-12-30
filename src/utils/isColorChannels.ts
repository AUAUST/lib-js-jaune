import { isObject } from "@auaust/primitive-kit/objects";
import type { ColorChannels } from "~/types";
import { isAlphaChannel, isRgbChannel } from "~/utils";

export function isColorChannels(value: unknown): value is ColorChannels {
  return (
    isObject(value, false) &&
    isRgbChannel(value.r) &&
    isRgbChannel(value.g) &&
    isRgbChannel(value.b) &&
    isAlphaChannel(value.a ?? 1)
  );
}

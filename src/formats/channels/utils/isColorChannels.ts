import { isObject } from "@auaust/toolkit/guard";

import { isAlphaChannel } from "#formats/channels/utils/isAlphaChannel";
import { isRgbChannel } from "#formats/channels/utils/isRgbChannel";
import type { ColorChannels } from "#formats/channels/types/ColorChannels";

/**
 * Whether the value is an object whose `r`, `g` and `b` are RGB channels and
 * whose `a`, when present, is an alpha channel.
 */
export function isColorChannels(value: unknown): value is ColorChannels {
  if (!isObject(value)) {
    return false;
  }

  const {
    r,
    g,
    b,
    a = 1,
  }: Partial<Record<keyof ColorChannels, unknown>> = value;

  return (
    isRgbChannel(r) && isRgbChannel(g) && isRgbChannel(b) && isAlphaChannel(a)
  );
}

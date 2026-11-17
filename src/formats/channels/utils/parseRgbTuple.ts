import { clamp } from "@auaust/toolkit/math";

import { createColor } from "#color/utils/createColor";
import { rgbChannelMax } from "#formats/channels/constants";
import { isRgbTuple } from "#formats/channels/utils/isRgbTuple";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";

function toCoord(channel: number): number {
  return clamp(channel, 0, rgbChannelMax) / rgbChannelMax;
}

/**
 * The `srgb` color of a tuple, channels clamped to 0–255 and alpha to 0–1, or
 * `undefined` when `value` is not an `RgbTuple`.
 */
export function parseRgbTuple(value: unknown): Color | undefined {
  if (!isRgbTuple(value)) {
    return;
  }

  const [r, g, b, a] = value;

  return createColor(srgb, [toCoord(r), toCoord(g), toCoord(b)], a);
}

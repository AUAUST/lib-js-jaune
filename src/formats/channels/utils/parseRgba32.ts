import { isSafeInteger } from "@auaust/toolkit/guard";

import { createColor } from "#color/utils/createColor";
import { rgbChannelMax } from "#formats/channels/constants";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";

const rgba32Max = 0xff_ff_ff_ff;

/**
 * The `srgb` color of a `0xRRGGBBAA` number, or `undefined` when `value` is not
 * an integer within 0 and `0xffffffff`.
 */
export function parseRgba32(value: number): Color | undefined {
  if (!isSafeInteger(value) || value < 0 || value > rgba32Max) {
    return;
  }

  return createColor(
    srgb,
    [
      ((value >>> 24) & rgbChannelMax) / rgbChannelMax,
      ((value >>> 16) & rgbChannelMax) / rgbChannelMax,
      ((value >>> 8) & rgbChannelMax) / rgbChannelMax,
    ],
    (value & rgbChannelMax) / rgbChannelMax,
  );
}

import { freeze } from "@auaust/toolkit/object";

import { toRgbTuple } from "#formats/channels/utils/toRgbTuple";
import type { Color } from "#color/types/Color";
import type { RgbChannels } from "#formats/channels/types/RgbChannels";

/**
 * The frozen channels of `color` gamut-mapped to `srgb`: rounded 0–255 `r`, `g`
 * and `b`, and its alpha as `a`.
 */
export function toRgbChannels(color: Color): RgbChannels {
  const [r, g, b, a] = toRgbTuple(color);

  return freeze({
    r,
    g,
    b,
    a,
  });
}

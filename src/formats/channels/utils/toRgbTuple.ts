import { clamp, round } from "@auaust/toolkit/math";
import { freeze } from "@auaust/toolkit/object";

import { rgbChannelMax } from "#formats/channels/constants";
import { toGamut } from "#gamut/utils/toGamut";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";
import type { RgbTuple } from "#formats/channels/types/RgbTuple";

function toChannel(coord: number): number {
  return clamp(round(coord * rgbChannelMax), 0, rgbChannelMax) + 0;
}

/**
 * The frozen tuple of `color` gamut-mapped to `srgb`: rounded 0–255 channels
 * and its alpha.
 */
export function toRgbTuple(color: Color): RgbTuple {
  const {
    coords: [r, g, b],
    alpha,
  } = toGamut(color, srgb);

  return freeze([toChannel(r), toChannel(g), toChannel(b), alpha] as const);
}

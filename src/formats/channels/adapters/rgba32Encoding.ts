import { round } from "@auaust/toolkit/math";
import { freeze } from "@auaust/toolkit/object";

import { rgbChannelMax } from "#formats/channels/constants";
import { clipCoordsToGamut } from "#gamut/utils/clipCoordsToGamut";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { ColorEncoding } from "#color/ports/ColorEncoding";

const scratch: [number, number, number] = [0, 0, 0];

function toByte(value: number): number {
  return round(value * rgbChannelMax);
}

const encoding: ColorEncoding<number> = {
  space: srgb,
  encode(coords, alpha) {
    const [r, g, b] = clipCoordsToGamut(srgb, coords, scratch);

    return (
      ((toByte(r) << 24) |
        (toByte(g) << 16) |
        (toByte(b) << 8) |
        toByte(alpha)) >>>
      0
    );
  },
};

/**
 * Encodes `srgb` coordinates as `0xRRGGBBAA`, an unsigned 32-bit number, clipping
 * channels to the gamut instead of mapping them.
 */
export const rgba32Encoding = freeze(encoding);

import { createSpace } from "#space/utils/createSpace";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import { linearChannelToSrgb } from "#spaces/rgb/utils/linearChannelToSrgb";
import { srgbChannelToLinear } from "#spaces/rgb/utils/srgbChannelToLinear";

/**
 * Gamma-encoded sRGB, bounded by its own [0, 1] cube.
 */
export const srgb = createSpace({
  id: "srgb",
  channels: srgbLinear.channels,
  base: srgbLinear,
  gamut: "self",
  toBase(coords, out) {
    out[0] = srgbChannelToLinear(coords[0]);
    out[1] = srgbChannelToLinear(coords[1]);
    out[2] = srgbChannelToLinear(coords[2]);

    return out;
  },
  fromBase(coords, out) {
    out[0] = linearChannelToSrgb(coords[0]);
    out[1] = linearChannelToSrgb(coords[1]);
    out[2] = linearChannelToSrgb(coords[2]);

    return out;
  },
});

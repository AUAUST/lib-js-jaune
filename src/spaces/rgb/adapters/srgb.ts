import { createSpace } from "#space/utils/createSpace";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import { linearChannelToSrgb } from "#spaces/rgb/utils/linearChannelToSrgb";
import { srgbChannelToLinear } from "#spaces/rgb/utils/srgbChannelToLinear";
import { transferChannels } from "#spaces/rgb/utils/transferChannels";

/**
 * Gamma-encoded sRGB, bounded by its own [0, 1] cube.
 */
export const srgb = createSpace({
  id: "srgb",
  channels: srgbLinear.channels,
  base: srgbLinear,
  gamut: "self",
  toBase: (coords, out) => transferChannels(srgbChannelToLinear, coords, out),
  fromBase: (coords, out) => transferChannels(linearChannelToSrgb, coords, out),
});

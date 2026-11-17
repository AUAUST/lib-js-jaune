import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import {
  displayP3LinearToXyzD65,
  xyzD65ToDisplayP3Linear,
} from "#spaces/rgb/constants";
import { linearChannelToSrgb } from "#spaces/rgb/utils/linearChannelToSrgb";
import { srgbChannelToLinear } from "#spaces/rgb/utils/srgbChannelToLinear";
import { transferChannels } from "#spaces/rgb/utils/transferChannels";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";

/**
 * Display P3 with the sRGB transfer function, bounded by its own [0, 1] cube.
 */
export const displayP3 = createSpace({
  id: "display-p3",
  channels: srgbLinear.channels,
  base: xyzD65,
  gamut: "self",
  toBase(coords, out) {
    transferChannels(srgbChannelToLinear, coords, out);

    return multiplyMatrix(displayP3LinearToXyzD65, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD65ToDisplayP3Linear, coords, out);

    return transferChannels(linearChannelToSrgb, out, out);
  },
});

import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import {
  displayP3LinearToXyzD65,
  xyzD65ToDisplayP3Linear,
} from "#spaces/rgb/constants";
import { linearChannelToSrgb } from "#spaces/rgb/utils/linearChannelToSrgb";
import { srgbChannelToLinear } from "#spaces/rgb/utils/srgbChannelToLinear";
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
    out[0] = srgbChannelToLinear(coords[0]);
    out[1] = srgbChannelToLinear(coords[1]);
    out[2] = srgbChannelToLinear(coords[2]);

    return multiplyMatrix(displayP3LinearToXyzD65, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD65ToDisplayP3Linear, coords, out);
    out[0] = linearChannelToSrgb(out[0]);
    out[1] = linearChannelToSrgb(out[1]);
    out[2] = linearChannelToSrgb(out[2]);

    return out;
  },
});

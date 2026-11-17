import { abs, pow, sign } from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import {
  a98RgbGamma,
  a98RgbLinearToXyzD65,
  xyzD65ToA98RgbLinear,
} from "#spaces/rgb/constants";
import { transferChannels } from "#spaces/rgb/utils/transferChannels";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";

function toLinear(value: number): number {
  return sign(value) * pow(abs(value), a98RgbGamma);
}

function toEncoded(value: number): number {
  return sign(value) * pow(abs(value), 1 / a98RgbGamma);
}

/**
 * A98 RGB (Adobe RGB 1998), bounded by its own [0, 1] cube.
 */
export const a98Rgb = createSpace({
  id: "a98-rgb",
  channels: srgbLinear.channels,
  base: xyzD65,
  gamut: "self",
  toBase(coords, out) {
    transferChannels(toLinear, coords, out);

    return multiplyMatrix(a98RgbLinearToXyzD65, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD65ToA98RgbLinear, coords, out);

    return transferChannels(toEncoded, out, out);
  },
});

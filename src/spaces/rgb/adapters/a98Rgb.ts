import { abs, pow, sign } from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import {
  a98RgbGamma,
  a98RgbLinearToXyzD65,
  xyzD65ToA98RgbLinear,
} from "#spaces/rgb/constants";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";

function signedPow(value: number, exponent: number): number {
  return sign(value) * pow(abs(value), exponent);
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
    out[0] = signedPow(coords[0], a98RgbGamma);
    out[1] = signedPow(coords[1], a98RgbGamma);
    out[2] = signedPow(coords[2], a98RgbGamma);

    return multiplyMatrix(a98RgbLinearToXyzD65, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD65ToA98RgbLinear, coords, out);
    out[0] = signedPow(out[0], 1 / a98RgbGamma);
    out[1] = signedPow(out[1], 1 / a98RgbGamma);
    out[2] = signedPow(out[2], 1 / a98RgbGamma);

    return out;
  },
});

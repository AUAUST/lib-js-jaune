import { abs, pow, sign } from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import {
  prophotoRgbEncodedThreshold,
  prophotoRgbGamma,
  prophotoRgbLinearSlope,
  prophotoRgbLinearThreshold,
  prophotoRgbLinearToXyzD50,
  xyzD50ToProphotoRgbLinear,
} from "#spaces/rgb/constants";
import { xyzD50 } from "#spaces/xyz/adapters/xyzD50";

function toLinear(value: number): number {
  const magnitude = abs(value);

  if (magnitude < prophotoRgbEncodedThreshold) {
    return value / prophotoRgbLinearSlope;
  }

  return sign(value) * pow(magnitude, prophotoRgbGamma);
}

function toEncoded(value: number): number {
  const magnitude = abs(value);

  if (magnitude < prophotoRgbLinearThreshold) {
    return value * prophotoRgbLinearSlope;
  }

  return sign(value) * pow(magnitude, 1 / prophotoRgbGamma);
}

/**
 * ProPhoto RGB on the D50 white point, bounded by its own [0, 1] cube.
 */
export const prophotoRgb = createSpace({
  id: "prophoto-rgb",
  channels: srgbLinear.channels,
  base: xyzD50,
  gamut: "self",
  toBase(coords, out) {
    out[0] = toLinear(coords[0]);
    out[1] = toLinear(coords[1]);
    out[2] = toLinear(coords[2]);

    return multiplyMatrix(prophotoRgbLinearToXyzD50, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD50ToProphotoRgbLinear, coords, out);
    out[0] = toEncoded(out[0]);
    out[1] = toEncoded(out[1]);
    out[2] = toEncoded(out[2]);

    return out;
  },
});

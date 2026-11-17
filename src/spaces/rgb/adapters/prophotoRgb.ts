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
import { transferChannels } from "#spaces/rgb/utils/transferChannels";
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
    transferChannels(toLinear, coords, out);

    return multiplyMatrix(prophotoRgbLinearToXyzD50, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD50ToProphotoRgbLinear, coords, out);

    return transferChannels(toEncoded, out, out);
  },
});

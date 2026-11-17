import { abs, pow, sign } from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import {
  rec2020Alpha,
  rec2020Beta,
  rec2020Gamma,
  rec2020LinearSlope,
  rec2020LinearToXyzD65,
  xyzD65ToRec2020Linear,
} from "#spaces/rgb/constants";
import { transferChannels } from "#spaces/rgb/utils/transferChannels";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";

function toLinear(value: number): number {
  const magnitude = abs(value);

  if (magnitude < rec2020Beta * rec2020LinearSlope) {
    return value / rec2020LinearSlope;
  }

  return (
    sign(value) *
    pow((magnitude + rec2020Alpha - 1) / rec2020Alpha, 1 / rec2020Gamma)
  );
}

function toEncoded(value: number): number {
  const magnitude = abs(value);

  if (magnitude < rec2020Beta) {
    return value * rec2020LinearSlope;
  }

  return (
    sign(value) *
    (rec2020Alpha * pow(magnitude, rec2020Gamma) - (rec2020Alpha - 1))
  );
}

// @debt The a98-rgb, prophoto-rgb and rec2020 transfer functions are private to their adapters while sRGB's are public utils; give every transfer function the same owner and visibility.
/**
 * ITU-R BT.2020 RGB, bounded by its own [0, 1] cube.
 */
export const rec2020 = createSpace({
  id: "rec2020",
  channels: srgbLinear.channels,
  base: xyzD65,
  gamut: "self",
  toBase(coords, out) {
    transferChannels(toLinear, coords, out);

    return multiplyMatrix(rec2020LinearToXyzD65, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD65ToRec2020Linear, coords, out);

    return transferChannels(toEncoded, out, out);
  },
});

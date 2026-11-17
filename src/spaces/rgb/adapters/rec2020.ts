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

/**
 * ITU-R BT.2020 RGB, bounded by its own [0, 1] cube.
 */
// @debt Each RGB kernel repeats its per-channel transfer loop; a shared channel-mapping helper would remove the duplication jscpd reports.
export const rec2020 = createSpace({
  id: "rec2020",
  channels: srgbLinear.channels,
  base: xyzD65,
  gamut: "self",
  toBase(coords, out) {
    out[0] = toLinear(coords[0]);
    out[1] = toLinear(coords[1]);
    out[2] = toLinear(coords[2]);

    return multiplyMatrix(rec2020LinearToXyzD65, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD65ToRec2020Linear, coords, out);
    out[0] = toEncoded(out[0]);
    out[1] = toEncoded(out[1]);
    out[2] = toEncoded(out[2]);

    return out;
  },
});

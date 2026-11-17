import { cbrt } from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { cieEpsilon, cieKappa, d50White } from "#spaces/lab/constants";
import { xyzD50 } from "#spaces/xyz/adapters/xyzD50";

/**
 * CIE Lab on the D50 white point, unbounded.
 */
export const lab = createSpace({
  id: "lab",
  channels: [
    {
      name: "l",
      range: [0, 100],
      isHue: false,
    },
    {
      name: "a",
      range: [-125, 125],
      isHue: false,
    },
    {
      name: "b",
      range: [-125, 125],
      isHue: false,
    },
  ],
  base: xyzD50,
  toBase(coords, out) {
    const fy = (coords[0] + 16) / 116;
    const fx = coords[1] / 500 + fy;
    const fz = fy - coords[2] / 200;
    const fx3 = fx ** 3;
    const fz3 = fz ** 3;

    out[0] = (
      (fx3 > cieEpsilon ? fx3 : (116 * fx - 16) / cieKappa) * d50White[0]
    );

    out[1] = (
      (coords[0] > cieKappa * cieEpsilon ? fy ** 3 : coords[0] / cieKappa) *
      d50White[1]
    );

    out[2] = (
      (fz3 > cieEpsilon ? fz3 : (116 * fz - 16) / cieKappa) * d50White[2]
    );

    return out;
  },
  fromBase(coords, out) {
    const fx = compress(coords[0] / d50White[0]);
    const fy = compress(coords[1] / d50White[1]);
    const fz = compress(coords[2] / d50White[2]);

    out[0] = 116 * fy - 16;
    out[1] = 500 * (fx - fy);
    out[2] = 200 * (fy - fz);

    return out;
  },
});

function compress(value: number): number {
  return value > cieEpsilon ? cbrt(value) : (cieKappa * value + 16) / 116;
}

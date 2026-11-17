import { cbrt } from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import {
  lmsToOklab,
  lmsToXyzD65,
  oklabToLms,
  xyzD65ToLms,
} from "#spaces/oklab/constants";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";

/**
 * OKLab, the perceptually uniform Lab space; unbounded.
 */
export const oklab = createSpace({
  id: "oklab",
  channels: [
    {
      name: "l",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "a",
      range: [-0.4, 0.4],
      isHue: false,
    },
    {
      name: "b",
      range: [-0.4, 0.4],
      isHue: false,
    },
  ],
  base: xyzD65,
  toBase(coords, out) {
    multiplyMatrix(oklabToLms, coords, out);
    out[0] **= 3;
    out[1] **= 3;
    out[2] **= 3;

    return multiplyMatrix(lmsToXyzD65, out, out);
  },
  fromBase(coords, out) {
    multiplyMatrix(xyzD65ToLms, coords, out);
    out[0] = cbrt(out[0]);
    out[1] = cbrt(out[1]);
    out[2] = cbrt(out[2]);

    return multiplyMatrix(lmsToOklab, out, out);
  },
});

import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";
import { bradfordD50ToD65, bradfordD65ToD50 } from "#spaces/xyz/constants";

/**
 * CIE XYZ relative to the D50 white point, adapted from D65 with Bradford.
 */
export const xyzD50 = createSpace({
  id: "xyz-d50",
  channels: xyzD65.channels,
  base: xyzD65,
  toBase: (coords, out) => multiplyMatrix(bradfordD50ToD65, coords, out),
  fromBase: (coords, out) => multiplyMatrix(bradfordD65ToD50, coords, out),
});

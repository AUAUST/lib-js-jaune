import { createSpace } from "#space/utils/createSpace";
import { multiplyMatrix } from "#space/utils/multiplyMatrix";
import { srgbLinearToXyzD65, xyzD65ToSrgbLinear } from "#spaces/rgb/constants";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";

/**
 * Linear-light sRGB, bounded by its own [0, 1] cube.
 */
export const srgbLinear = createSpace({
  id: "srgb-linear",
  channels: [
    {
      name: "r",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "g",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "b",
      range: [0, 1],
      isHue: false,
    },
  ],
  base: xyzD65,
  gamut: "self",
  toBase: (coords, out) => multiplyMatrix(srgbLinearToXyzD65, coords, out),
  fromBase: (coords, out) => multiplyMatrix(xyzD65ToSrgbLinear, coords, out),
});

import { describe, test } from "vitest";

import {
  a98Rgb,
  displayP3,
  prophotoRgb,
  rec2020,
  srgb,
} from "@auaust/jaune/rgb";
import { convertCoords } from "@auaust/jaune/space";
import { xyzD65 } from "@auaust/jaune/xyz";

import { expectCoordsClose } from "#tests/src/space/utils/expectCoordsClose";

describe("wide-gamut RGB spaces", () => {
  test("convert sRGB red to Display P3", () => {
    expectCoordsClose(
      convertCoords(srgb, displayP3, [1, 0, 0], [0, 0, 0]),
      [0.9175, 0.2003, 0.1386],
      1e-4,
    );
  });

  test.each([displayP3, a98Rgb, prophotoRgb, rec2020])(
    "round-trip $id through xyzD65",
    (space) => {
      const out: [number, number, number] = [0, 0, 0];

      convertCoords(space, xyzD65, [0.2, 0.5, 0.8], out);

      expectCoordsClose(
        convertCoords(xyzD65, space, out, out),
        [0.2, 0.5, 0.8],
        1e-9,
      );
    },
  );
});

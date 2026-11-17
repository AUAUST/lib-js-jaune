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
  test.each([
    { space: displayP3, red: [0.9175, 0.2003, 0.1386] },
    { space: a98Rgb, red: [0.8586, 0, 0] },
    { space: prophotoRgb, red: [0.7022, 0.2757, 0.1035] },
    { space: rec2020, red: [0.792, 0.231, 0.0738] },
  ] as const)("convert sRGB red to $space.id", ({ space, red }) => {
    expectCoordsClose(
      convertCoords(srgb, space, [1, 0, 0], [0, 0, 0]),
      red,
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

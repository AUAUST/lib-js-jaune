import { describe, test } from "vitest";

import { oklab, oklch } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";
import { convertCoords } from "@auaust/jaune/space";

import { expectCoordsClose } from "#tests/src/space/utils/expectCoordsClose";

describe("perceptual spaces", () => {
  test("convert sRGB white to OKLab", () => {
    expectCoordsClose(
      convertCoords(srgb, oklab, [1, 1, 1], [0, 0, 0]),
      [1, 0, 0],
      1e-4,
    );
  });

  test("convert sRGB red to OKLCH", () => {
    expectCoordsClose(
      convertCoords(srgb, oklch, [1, 0, 0], [0, 0, 0]),
      [0.628, 0.2577, 29.234],
      1e-3,
    );
  });
});

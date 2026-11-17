import { describe, expect, test } from "vitest";

import { lab, lch } from "@auaust/jaune/lab";
import { srgb } from "@auaust/jaune/rgb";
import { convertCoords } from "@auaust/jaune/space";

import { expectCoordsClose } from "#tests/src/space/utils/expectCoordsClose";

describe("lab and lch", () => {
  test("convert sRGB white and red to lab", () => {
    expectCoordsClose(
      convertCoords(srgb, lab, [1, 1, 1], [0, 0, 0]),
      [100, 0, 0],
      1e-3,
    );

    expectCoordsClose(
      convertCoords(srgb, lab, [1, 0, 0], [0, 0, 0]),
      [54.29, 80.8, 69.89],
      0.05,
    );
  });

  test("give gray hue 0 in lch and round-trip to lab", () => {
    const gray = convertCoords(srgb, lab, [0.5, 0.5, 0.5], [0, 0, 0]);
    const out = convertCoords(lab, lch, gray, [0, 0, 0]);

    expect(out[2]).toBe(0);
    expect(lch.isAchromatic?.(out)).toBe(true);
    expectCoordsClose(convertCoords(lch, lab, out, [0, 0, 0]), gray, 1e-9);
  });
});

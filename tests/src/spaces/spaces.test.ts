import { describe, expect, test } from "vitest";

import { srgb } from "@auaust/jaune/rgb";
import { convertCoords } from "@auaust/jaune/space";
import { xyzD50, xyzD65 } from "@auaust/jaune/xyz";

import { expectCoordsClose } from "#tests/src/space/utils/expectCoordsClose";

const d50White = [0.96429_56764_29567_7, 1, 0.82510_46025_10460_2] as const;

describe("built-in spaces", () => {
  test("convert sRGB white to the D50 white and back", () => {
    const out: [number, number, number] = [0, 0, 0];

    expectCoordsClose(
      convertCoords(srgb, xyzD50, [1, 1, 1], out),
      d50White,
      1e-4,
    );

    expectCoordsClose(convertCoords(xyzD50, srgb, out, out), [1, 1, 1], 1e-4);
  });

  test("convert in place like into a separate tuple", () => {
    const coords: [number, number, number] = [0.2, 0.4, 0.9];
    const separate = convertCoords(srgb, xyzD65, coords, [0, 0, 0]);

    expect(convertCoords(srgb, xyzD65, coords, coords)).toEqual(separate);
  });

  test("round-trip out-of-gamut sRGB", () => {
    const out: [number, number, number] = [0, 0, 0];

    convertCoords(srgb, xyzD65, [-0.2, 0.5, 1.3], out);

    expectCoordsClose(
      convertCoords(xyzD65, srgb, out, out),
      [-0.2, 0.5, 1.3],
      1e-9,
    );
  });

  test("bound sRGB by itself", () => {
    expect(srgb.gamut).toBe(srgb);
  });
});

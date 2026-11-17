import { describe, expect, test } from "vitest";

import { srgb } from "@auaust/jaune/rgb";
import { convertCoords, createSpace } from "@auaust/jaune/space";
import { xyzD50, xyzD65 } from "@auaust/jaune/xyz";

const d50White = [0.96429_56764_29567_7, 1, 0.82510_46025_10460_2] as const;

function expectClose(
  actual: readonly number[],
  expected: readonly number[],
  digits: number,
) {
  for (const [index, value] of actual.entries()) {
    expect(value).toBeCloseTo(expected[index] ?? Number.NaN, digits);
  }
}

describe("built-in spaces", () => {
  test("convert sRGB white to the D50 white and back", () => {
    const out: [number, number, number] = [0, 0, 0];

    expectClose(convertCoords(srgb, xyzD50, [1, 1, 1], out), d50White, 4);
    expectClose(convertCoords(xyzD50, srgb, out, out), [1, 1, 1], 4);
  });

  test("convert in place like into a separate tuple", () => {
    const coords: [number, number, number] = [0.2, 0.4, 0.9];
    const separate = convertCoords(srgb, xyzD65, coords, [0, 0, 0]);

    expect(convertCoords(srgb, xyzD65, coords, coords)).toEqual(separate);
  });

  test("round-trip out-of-gamut sRGB", () => {
    const out: [number, number, number] = [0, 0, 0];

    convertCoords(srgb, xyzD65, [-0.2, 0.5, 1.3], out);
    expectClose(convertCoords(xyzD65, srgb, out, out), [-0.2, 0.5, 1.3], 9);
  });

  test("bound sRGB by itself", () => {
    expect(srgb.gamut).toBe(srgb);
  });

  test("refuse a custom root", () => {
    const root = createSpace({
      id: "custom",
      channels: xyzD65.channels,
      base: undefined,
      toBase: (_coords, out) => out,
      fromBase: (_coords, out) => out,
    });

    expect(() => convertCoords(srgb, root, [0, 0, 0], [0, 0, 0])).toThrow(
      TypeError,
    );
  });
});

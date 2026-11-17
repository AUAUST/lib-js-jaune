import { describe, expect, test } from "vitest";

import { hsl, hwb } from "@auaust/jaune/hsl";
import { srgb } from "@auaust/jaune/rgb";
import { convertCoords } from "@auaust/jaune/space";

function expectClose(actual: readonly number[], expected: readonly number[]) {
  for (const [index, value] of actual.entries()) {
    expect(value).toBeCloseTo(expected[index] ?? Number.NaN, 9);
  }
}

describe("hsl and hwb", () => {
  test("convert pure red and back", () => {
    const out: [number, number, number] = [0, 0, 0];

    expectClose(convertCoords(srgb, hsl, [1, 0, 0], out), [0, 1, 0.5]);
    expectClose(convertCoords(hsl, srgb, out, out), [1, 0, 0]);
    expectClose(convertCoords(srgb, hwb, [1, 0, 0], out), [0, 0, 0]);
    expectClose(convertCoords(hwb, srgb, out, out), [1, 0, 0]);
  });

  test("give mid gray hue 0 and saturation 0", () => {
    const out = convertCoords(srgb, hsl, [0.5, 0.5, 0.5], [0, 0, 0]);

    expectClose(out, [0, 0, 0.5]);
    expect(hsl.isAchromatic?.(out)).toBe(true);
  });

  test("bound both by sRGB", () => {
    expect(hsl.gamut).toBe(srgb);
    expect(hwb.gamut).toBe(srgb);
  });
});

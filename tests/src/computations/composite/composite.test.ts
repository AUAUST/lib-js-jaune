import { describe, expect, test } from "vitest";

import { convert, createColor } from "@auaust/jaune/color";
import { composite } from "@auaust/jaune/composite";
import { hsl } from "@auaust/jaune/hsl";
import { srgb, srgbLinear } from "@auaust/jaune/rgb";

const red = createColor(srgb, [1, 0, 0]);
const black = createColor(srgb, [0, 0, 0]);
const white = createColor(srgb, [1, 1, 1]);

function expectCoords(actual: readonly number[], expected: readonly number[]) {
  for (const [index, value] of actual.entries()) {
    expect(value).toBeCloseTo(expected[index] ?? NaN);
  }
}

describe("composite", () => {
  test("paint a translucent source over an opaque backdrop", () => {
    const halfRed = createColor(srgb, [1, 0, 0], 0.5);
    const result = composite(halfRed, black);

    expectCoords(result.coords, [0.5, 0, 0]);
    expect(result.alpha).toBe(1);

    const linear = convert(
      composite(halfRed, black, { space: srgbLinear }),
      srgb,
    );

    expect(linear.coords[0]).toBeGreaterThan(0.5);
  });

  test("keep the backdrop under a fully transparent source", () => {
    const backdrop = createColor(srgb, [0.2, 0.4, 0.6], 0.7);
    const result = composite(createColor(srgb, [1, 0, 0], 0), backdrop);

    expectCoords(result.coords, backdrop.coords);
    expect(result.alpha).toBeCloseTo(0.7);

    const empty = composite(
      createColor(srgb, [1, 0, 0], 0),
      createColor(srgb, [0, 1, 0], 0),
    );

    expect(empty.alpha).toBe(0);
    expectCoords(empty.coords, [0, 0, 0]);
  });

  test("apply separable blend modes", () => {
    expectCoords(
      composite(white, red, { blend: "multiply" }).coords,
      [1, 0, 0],
    );

    expectCoords(composite(black, red, { blend: "screen" }).coords, [1, 0, 0]);

    expectCoords(
      composite(red, red, { blend: "difference" }).coords,
      [0, 0, 0],
    );
  });

  test("clip the luminosity blend into the gamut", () => {
    expectCoords(
      composite(white, red, { blend: "luminosity" }).coords,
      [1, 1, 1],
    );
  });

  test("reject a non-RGB space", () => {
    expect(() => composite(red, black, { space: hsl })).toThrow(TypeError);
  });
});

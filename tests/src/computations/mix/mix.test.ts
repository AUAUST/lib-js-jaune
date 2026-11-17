import { describe, expect, test } from "vitest";

import { rgba32Encoding } from "@auaust/jaune/channels";
import { convert, createColor, type Color } from "@auaust/jaune/color";
import { average, createGradient, gradient, mix } from "@auaust/jaune/mix";
import { oklab, oklch } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";

const red = createColor(srgb, [1, 0, 0]);
const blue = createColor(srgb, [0, 0, 1]);
const black = createColor(srgb, [0, 0, 0]);
const white = createColor(srgb, [1, 1, 1]);
const gray = createColor(srgb, [0.5, 0.5, 0.5]);

function expectCoords(actual: readonly number[], expected: readonly number[]) {
  for (const [index, value] of actual.entries()) {
    expect(value).toBeCloseTo(expected[index] ?? NaN, 4);
  }
}

function expectSameColor(actual: Color, expected: Color) {
  expectCoords(actual.coords, convert(expected, actual.space).coords);
  expect(actual.alpha).toBeCloseTo(expected.alpha);
}

describe("mix", () => {
  test("match CSS color-mix in oklab", () => {
    const result = mix(red, blue);

    expect(result.space).toBe(oklab);
    expectCoords(result.coords, [0.53998, 0.0962, -0.09284]);
  });

  test("take the long hue path on request", () => {
    const shorter = mix(red, blue, 0.5, { space: oklch }).coords[2];

    const longer = mix(red, blue, 0.5, { space: oklch, hue: "longer" })
      .coords[2];

    expect(Math.abs(longer - shorter)).toBeCloseTo(180, 4);
  });

  test("keep the chromatic hue next to gray", () => {
    const result = mix(gray, red, 0.5, { space: oklch });

    expect(result.coords[2]).toBeCloseTo(convert(red, oklch).coords[2]);
  });
});

describe("gradient", () => {
  test("yield encoded colors from the first stop to the last", () => {
    const colors = [
      ...gradient([black, white], { count: 3, encoding: rgba32Encoding }),
    ];

    expect(colors).toHaveLength(3);
    expect(colors[0]).toBe(0x00_00_00_ff);
    expect(colors[2]).toBe(0xff_ff_ff_ff);

    const [, hinted = 0] = gradient([black, white], {
      count: 3,
      encoding: rgba32Encoding,
      hint: 0.25,
    });

    const [, middle = 0] = colors;

    expect(hinted >>> 24).toBeGreaterThan(middle >>> 24);
  });

  test("place stops evenly or at their positions", () => {
    const evenly = [...gradient([red, white, blue], { count: 5 })];

    expectSameColor(evenly[2] ?? red, white);

    const positioned = [...gradient([red, [white, 0.25], blue], { count: 5 })];

    expectSameColor(positioned[1] ?? red, white);
  });

  test("reject invalid counts, stops and positions", () => {
    expect(() => gradient([red, blue], { count: 1 })).toThrow(RangeError);
    expect(() => gradient([red], { count: 3 })).toThrow(RangeError);

    expect(() => {
      return gradient(
        [
          [red, 0.6],
          [blue, 0.4],
        ],
        { count: 3 },
      );
    }).toThrow(RangeError);
  });

  test("sample the same coordinates as the iterator", () => {
    const sampler = createGradient([black, white]);
    const out: [number, number, number] = [0, 0, 0];
    const [, middle] = gradient([black, white], { count: 3 });

    sampler.sample(0.5, out);
    expectCoords(out, middle?.coords ?? []);

    sampler.sample(1.5, out);
    expectCoords(out, convert(white, oklab).coords);
  });
});

describe("average", () => {
  test("match mix for two colors", () => {
    expectSameColor(average([red, blue]), mix(red, blue));

    expectSameColor(
      average([red, blue], { weights: [3, 1] }),
      mix(red, blue, 0.25),
    );
  });

  test("weigh by alpha and keep chromatic hues", () => {
    const result = average([red, createColor(srgb, [0, 0, 1], 0)]);

    expectCoords(result.coords, convert(red, oklab).coords);
    expect(result.alpha).toBeCloseTo(0.5);

    expect(average([red, gray], { space: oklch }).coords[2]).toBeCloseTo(
      convert(red, oklch).coords[2],
    );
  });
});

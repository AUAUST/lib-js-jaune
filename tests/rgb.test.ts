import { describe, expect, test } from "vitest";
import { ColorChannels, Rgb } from "~/types";

import { isRgb, parseRgb, toRgb } from "~/utils/rgb";

describe("RGB colors", () => {
  test("can be recognized", () => {
    const rgb = [
      [0, 0, 0],
      [0, 0, 0, 0],
      [16, 49, 1],
      [2, 34, 11, 0.5],
      [255, 255, 255],
      [185.54, 0, 0, 0.9999999],
    ];

    rgb.forEach((h) => {
      expect(isRgb(h)).toBe(true);
    });

    const notRgb = [
      "#xyz",
      "#124abc01",
      {},
      NaN,
      undefined,
      1,
      "",
      [1, 2],
      [1811, 491, 1],
    ];

    notRgb.forEach((h) => {
      expect(isRgb(h)).toBe(false);
    });
  });

  test("can be parsed", () => {
    const rgb = [
      [[0, 0, 0], { r: 0, g: 0, b: 0 }],
      [[0, 0, 0, 0], { r: 0, g: 0, b: 0, a: 0 }],
      [[16, 49, 1], { r: 16, g: 49, b: 1 }],
      [[2, 34, 11, 0.5], { r: 2, g: 34, b: 11, a: 0.5 }],
      [[255, 255, 255], { r: 255, g: 255, b: 255 }],
      [[185.54, 0, 0, 0.9999999], { r: 185.54, g: 0, b: 0, a: 0.9999999 }],
      [[-1, 0, 3400], { r: 0, g: 0, b: 255, isTransformed: true }],
      [null, { r: 0, g: 0, b: 0, isFallback: true }],
    ] as [Rgb, ColorChannels][];

    rgb.forEach(([input, expected]) => {
      const components = parseRgb(input);

      expect(components.r).toBe(expected.r);
      expect(components.g).toBe(expected.g);
      expect(components.b).toBe(expected.b);
      expect(components.a).toBeCloseTo(expected.a ?? 1);
      expect(components.isTransformed).toBe(expected.isTransformed ?? false);
      expect(components.isFallback).toBe(expected.isFallback ?? false);
    });
  });

  test("can be created", () => {
    expect(toRgb(parseRgb([0, 10, 255, 0.25]))).toEqual([0, 10, 255, 0.25]);

    expect(
      toRgb({
        r: -1,
        g: 2,
        b: 256,
        a: undefined,
      })
    ).toEqual([0, 2, 255, 1]);
  });
});

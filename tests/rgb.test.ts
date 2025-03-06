import { describe, expect, test } from "vitest";

import { isRgb, parseRgb } from "~/utils/rgb";

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
      [[0, 0, 0], { r: 0, g: 0, b: 0, a: 1 }],
      [[0, 0, 0, 0], { r: 0, g: 0, b: 0, a: 0 }],
      [[16, 49, 1], { r: 16, g: 49, b: 1, a: 1 }],
      [[2, 34, 11, 0.5], { r: 2, g: 34, b: 11, a: 0.5 }],
      [[255, 255, 255], { r: 255, g: 255, b: 255, a: 1 }],
      [[185.54, 0, 0, 0.9999999], { r: 185.54, g: 0, b: 0, a: 0.9999999 }],
    ] as const;

    rgb.forEach(([input, expected]) => {
      const components = parseRgb(input);

      expect(components.r).toBe(expected.r);
      expect(components.g).toBe(expected.g);
      expect(components.b).toBe(expected.b);
      expect(components.a).toBeCloseTo(expected.a);
    });
  });
});

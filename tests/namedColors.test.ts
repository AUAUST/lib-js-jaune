import { describe, expect, test } from "vitest";
import type { ColorChannels } from "~/types";

import { isNamedColor, parseNamedColor } from "~/utils/namedColors";

describe("Named colors", () => {
  test("can be recognized", () => {
    const namedColors = [
      "White",
      "black",
      "salmon",
      "antiquewhite",
      "transparent",
      "YELLOW",
    ];

    namedColors.forEach((h) => {
      expect(isNamedColor(h)).toBe(true);
    });

    const notNamedColors = [
      "",
      "#xyz",
      "#124abc01",
      "unknown",
      "black ",
      {},
      NaN,
      undefined,
      1,
      [1, 2],
    ];

    notNamedColors.forEach((h) => {
      expect(isNamedColor(h)).toBe(false);
    });
  });

  test("can be parsed", () => {
    const namedColors = [
      ["White", { r: 255, g: 255, b: 255 }],
      ["black", { r: 0, g: 0, b: 0 }],
      ["salmon", { r: 250, g: 128, b: 114 }],
      ["antIquewhite", { r: 250, g: 235, b: 215 }],
      ["transparent", { r: 0, g: 0, b: 0, a: 0 }],
      ["YELLOW", { r: 255, g: 255, b: 0 }],
      ["notacolor", { r: 0, g: 0, b: 0, isFallback: true }], // fallback black
    ] as [string, ColorChannels][];

    namedColors.forEach(([input, expected]) => {
      const components = parseNamedColor(input);

      expect(components).toBeDefined();
      expect(components.r).toBe(expected.r);
      expect(components.g).toBe(expected.g);
      expect(components.b).toBe(expected.b);
      expect(components.a).toBe(expected.a ?? 1);
      expect(components.isFallback).toBe(expected.isFallback ?? false);
    });
  });
});

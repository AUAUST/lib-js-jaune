import { describe, expect, test } from "vitest";

import { createColor } from "@auaust/jaune/color";
import {
  closestNamedColor,
  contrast,
  distance,
  isDark,
  isLight,
  isOpaque,
  isTranslucent,
  isTransparent,
  lightness,
  luminance,
} from "@auaust/jaune/metrics";
import { toColor } from "@auaust/jaune/parse";
import { srgb } from "@auaust/jaune/rgb";

describe("metrics", () => {
  test("measure luminance, lightness and contrast", () => {
    const white = toColor("white");
    const black = toColor("black");

    expect(luminance(white)).toBeCloseTo(1);
    expect(lightness(white)).toBeCloseTo(1);
    expect(contrast(white, black)).toBeCloseTo(21);
  });

  test("split light and dark at a threshold", () => {
    expect(isLight(toColor("white"))).toBe(true);
    expect(isLight(toColor("white"), 1)).toBe(false);
    expect(isDark(toColor("black"))).toBe(true);
  });

  test("read opacity", () => {
    const half = createColor(srgb, [0, 0, 0], 0.5);

    expect(isOpaque(half)).toBe(false);
    expect(isTranslucent(half)).toBe(true);
    expect(isTransparent(toColor("transparent"))).toBe(true);
  });

  test("measure distance on 8-bit channels", () => {
    expect(distance(toColor("black"), toColor("blue"))).toBeCloseTo(255);
    expect(closestNamedColor(toColor([250, 0, 5]))).toBe("red");
  });
});

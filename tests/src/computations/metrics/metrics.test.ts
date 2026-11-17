import { describe, expect, test } from "vitest";

import { convert, createColor } from "@auaust/jaune/color";
import {
  apcaContrast,
  closestNamedColor,
  contrast,
  deltaE,
  equals,
  isDark,
  isLight,
  isOpaque,
  isTranslucent,
  isTransparent,
  lightness,
  luminance,
} from "@auaust/jaune/metrics";
import { oklch } from "@auaust/jaune/oklab";
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

  test("composite translucent colors before measuring contrast", () => {
    const white = toColor("white");
    const transparentBlack = createColor(srgb, [0, 0, 0], 0);

    expect(contrast(white, transparentBlack)).toBeCloseTo(1);
    expect(contrast(white, transparentBlack, toColor("black"))).toBeCloseTo(21);
  });

  test("count alpha when naming the closest color", () => {
    expect(closestNamedColor(createColor(srgb, [0, 0, 0], 0.5))).toBe("black");

    expect(closestNamedColor(createColor(srgb, [1, 0, 0], 0))).toBe(
      "transparent",
    );
  });

  test("measure perceptual difference and equality", () => {
    const red = toColor("#ff0000");

    expect(deltaE(toColor("white"), toColor("black"))).toBeCloseTo(1, 4);
    expect(equals(red, convert(red, oklch))).toBe(true);
  });

  test("measure APCA lightness contrast", () => {
    expect(apcaContrast(toColor("black"), toColor("white"))).toBeCloseTo(
      106.04,
      1,
    );
  });
});

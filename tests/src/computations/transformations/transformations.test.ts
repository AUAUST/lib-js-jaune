import { describe, expect, test } from "vitest";

import { convert, createColor } from "@auaust/jaune/color";
import { toHex } from "@auaust/jaune/hex";
import { oklch } from "@auaust/jaune/oklab";
import { toColor } from "@auaust/jaune/parse";
import { srgb } from "@auaust/jaune/rgb";
import {
  darken,
  desaturate,
  grayscale,
  invert,
  lighten,
  rotateHue,
  saturate,
} from "@auaust/jaune/transformations";

describe("transformations", () => {
  test("rotate the HSL hue", () => {
    expect(toHex(rotateHue(toColor("red"), 120))).toBe("#00ff00");
    expect(toHex(rotateHue(toColor("red"), -120))).toBe("#0000ff");
    expect(rotateHue(createColor(oklch, [0.6, 0.1, 30]), 90).space).toBe(oklch);
  });

  test("invert and gray in sRGB", () => {
    expect(toHex(invert(toColor("#ff8000")))).toBe("#007fff");
    expect(toHex(grayscale(toColor("white")))).toBe("#ffffff");
    expect(grayscale(toColor("#00000080")).alpha).toBeCloseTo(0x80 / 255);
  });

  test("lighten in OKLCH within the input space", () => {
    const lightened = lighten(toColor("black"));

    expect(lightened.space).toBe(srgb);
    expect(convert(lightened, oklch).coords[0]).toBeCloseTo(0.1);
    expect(toHex(lighten(toColor("white")))).toBe("#ffffff");
  });

  test("darken clamps at black", () => {
    expect(toHex(darken(toColor("#0a0a0a"), 1))).toBe("#000000");
  });

  test("saturate scales the chroma up", () => {
    const color = toColor("#c08060");
    const before = convert(color, oklch).coords;
    const after = convert(saturate(color, 0.5), oklch).coords;

    expect(after[1]).toBeCloseTo(before[1] * 1.5);
    expect(after[0]).toBeCloseTo(before[0]);
  });

  test("desaturate fully to zero chroma at the same lightness", () => {
    const color = toColor("#ff8000");
    const before = convert(color, oklch).coords;
    const after = convert(desaturate(color, 1), oklch).coords;

    expect(after[1]).toBeCloseTo(0);
    expect(after[0]).toBeCloseTo(before[0]);
  });
});

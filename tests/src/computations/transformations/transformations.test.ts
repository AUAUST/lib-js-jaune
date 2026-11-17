import { describe, expect, test } from "vitest";

import { createColor } from "@auaust/jaune/color";
import { toHex } from "@auaust/jaune/hex";
import { oklch } from "@auaust/jaune/oklab";
import { toColor } from "@auaust/jaune/parse";
import { grayscale, invert, rotateHue } from "@auaust/jaune/transformations";

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
});

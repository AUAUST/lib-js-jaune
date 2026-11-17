import { describe, expect, test } from "vitest";

import { parseRgba32, toRgba32 } from "@auaust/jaune/channels";
import { createColor } from "@auaust/jaune/color";
import { isInGamut } from "@auaust/jaune/gamut";
import { isHex, parseHex, toHex } from "@auaust/jaune/hex";
import { oklch } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";

describe("HEX strings", () => {
  test("require a hash", () => {
    expect(isHex("#cafe")).toBe(true);
    expect(isHex("cafe")).toBe(false);
    expect(parseHex("cafe")).toBeUndefined();
    expect(parseHex("#12345")).toBeUndefined();
  });

  test("round-trip", () => {
    for (const hex of ["#c85588", "#149d15f4", "#000000"]) {
      const color = parseHex(hex);

      expect(color && toHex(color)).toBe(hex);
    }

    expect(parseHex("#f008")?.alpha).toBeCloseTo(0x88 / 255);
  });

  test("quantize alpha before choosing digits", () => {
    expect(toHex(createColor(srgb, [0, 0, 0], 0.999))).toBe("#000000");
  });

  test("gamut-map instead of clipping", () => {
    const color = createColor(oklch, [0.7, 0.4, 150]);
    const mapped = parseHex(toHex(color));
    const clipped = parseRgba32(toRgba32(color));

    expect(mapped && isInGamut(mapped)).toBe(true);

    expect(clipped && toHex(mapped ?? clipped)).not.toBe(
      clipped && toHex(clipped),
    );
  });
});

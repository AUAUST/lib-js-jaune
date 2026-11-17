import { describe, expect, test } from "vitest";

import { createColor } from "@auaust/jaune/color";
import { isInGamut, toGamut } from "@auaust/jaune/gamut";
import { hsl } from "@auaust/jaune/hsl";
import { oklch } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";

describe("gamut of records", () => {
  test("checks the record's gamut", () => {
    expect(isInGamut(createColor(hsl, [0, 1.2, 0.5]))).toBe(false);
    expect(isInGamut(createColor(hsl, [0, 1, 0.5]))).toBe(true);
  });

  test("maps a record into another space", () => {
    const mapped = toGamut(createColor(oklch, [0.7, 0.4, 150], 0.5), srgb);

    expect(mapped.space).toBe(srgb);
    expect(mapped.alpha).toBe(0.5);
    expect(isInGamut(mapped)).toBe(true);
  });
});

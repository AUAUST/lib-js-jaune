import { describe, expect, test } from "vitest";

import { rgba32Encoding } from "@auaust/jaune/channels";
import { toHex } from "@auaust/jaune/hex";
import { oklch } from "@auaust/jaune/oklab";
import { randomColor, randomColors } from "@auaust/jaune/random";
import { isNumber } from "@auaust/toolkit/guard";

describe("random colors", () => {
  test("draw within ranges", () => {
    expect(toHex(randomColor({ ranges: [0.5, 0.5, 0.5] }))).toBe("#808080");

    const color = randomColor({ space: oklch, alpha: [0, 0.5] });

    expect(color.space).toBe(oklch);
    expect(color.alpha).toBeLessThanOrEqual(0.5);
  });

  test("yield encoded batches", () => {
    const packed = [...randomColors({ count: 3, encoding: rgba32Encoding })];

    expect(packed).toHaveLength(3);
    expect(packed.every((value) => isNumber(value))).toBe(true);
    expect([...randomColors({ count: 2 })][0].alpha).toBe(1);
  });
});

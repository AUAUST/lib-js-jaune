import { describe, expect, test } from "vitest";

import {
  colorEncoding,
  convert,
  createColor,
  isColor,
  withAlpha,
} from "@auaust/jaune/color";
import { hsl } from "@auaust/jaune/hsl";
import { srgb } from "@auaust/jaune/rgb";
import { isFrozen } from "@auaust/toolkit/object";

describe("color records", () => {
  test("are frozen copies with a clamped alpha", () => {
    const coords: [number, number, number] = [0.2, 0.4, 0.6];
    const color = createColor(srgb, coords, 2);

    coords[0] = 1;

    expect(color.coords).toEqual([0.2, 0.4, 0.6]);
    expect(color.alpha).toBe(1);
    expect(isFrozen(color) && isFrozen(color.coords)).toBe(true);
    expect(withAlpha(color, -1).alpha).toBe(0);
  });

  test("reject non-finite coordinates", () => {
    expect(() => createColor(srgb, [Number.NaN, 0, 0])).toThrow(RangeError);
    expect(() => createColor(srgb, [0, 0, 0], Infinity)).toThrow(RangeError);
  });

  test("are recognized by shape", () => {
    expect(isColor(createColor(srgb, [0, 0, 0]))).toBe(true);

    expect(
      isColor({
        space: srgb,
        coords: [Number.NaN, 0, 0],
        alpha: 1,
      }),
    ).toBe(false);

    expect(isColor([0, 0, 0])).toBe(false);
  });

  test("convert between spaces", () => {
    const red = createColor(srgb, [1, 0, 0]);

    expect(convert(red, srgb)).toBe(red);
    expect(convert(red, hsl).space).toBe(hsl);
  });

  test("have one encoding per space", () => {
    expect(colorEncoding(srgb)).toBe(colorEncoding(srgb));
    expect(colorEncoding(srgb).encode([0, 0, 0], 1).space).toBe(srgb);
  });
});

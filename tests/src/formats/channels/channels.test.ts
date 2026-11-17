import { describe, expect, test } from "vitest";

import {
  parseRgba32,
  parseRgbChannels,
  parseRgbTuple,
  rgba32Encoding,
  toRgba32,
  toRgbChannels,
  toRgbTuple,
} from "@auaust/jaune/channels";
import { createColor } from "@auaust/jaune/color";
import { srgb } from "@auaust/jaune/rgb";

describe("8-bit channels", () => {
  test("parse clamped into sRGB", () => {
    const color = parseRgbTuple([300, 0, 127.5, 2]);

    expect(color?.coords).toEqual([1, 0, 0.5]);
    expect(color?.alpha).toBe(1);

    expect(
      parseRgbChannels({
        r: 300,
        g: 0,
        b: 127.5,
        a: 2,
      }),
    ).toEqual(color);

    expect(parseRgbTuple([Number.NaN, 0, 0])).toBeUndefined();
    expect(parseRgbChannels({ r: 0, g: 0 })).toBeUndefined();
  });

  test("serialize frozen and rounded", () => {
    const color = createColor(srgb, [1, 0.5, 0], 0.5);

    expect(toRgbTuple(color)).toEqual([255, 128, 0, 0.5]);

    expect(toRgbChannels(color)).toEqual({
      r: 255,
      g: 128,
      b: 0,
      a: 0.5,
    });

    expect(() => {
      const tuple: { 0: number } = toRgbTuple(color);

      tuple[0] = 0;
    }).toThrow(TypeError);
  });

  test("pack into 32 bits", () => {
    const color = createColor(srgb, [1, 0, 1.5], 0);

    expect(toRgba32(color)).toBe(0xff_00_ff_00);
    expect(rgba32Encoding.encode([0, 0, 0], 1)).toBe(0xff);
    expect(parseRgba32(0xff_00_ff_00)?.coords).toEqual([1, 0, 1]);
    expect(parseRgba32(-1)).toBeUndefined();
  });
});

import { describe, expect, test } from "vitest";

import { isInGamutCoords, mapCoordsToGamut } from "@auaust/jaune/gamut";
import { oklab, oklch } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";
import { convertCoords, createSpace } from "@auaust/jaune/space";

describe("gamut", () => {
  test("map an out-of-gamut OKLCH color into sRGB", () => {
    const mapped = mapCoordsToGamut(
      srgb,
      convertCoords(oklch, srgb, [0.7, 0.4, 150], [0, 0, 0]),
      [0, 0, 0],
    );

    const [lightness, , hue] = convertCoords(srgb, oklch, mapped, [0, 0, 0]);

    expect(isInGamutCoords(srgb, mapped)).toBe(true);
    expect(Math.abs(hue - 150)).toBeLessThan(5);
    expect(Math.abs(lightness - 0.7)).toBeLessThan(0.01);
  });

  test("tolerate channels within the gamut epsilon", () => {
    expect(isInGamutCoords(srgb, [1.00001, 0, 0])).toBe(true);
    expect(isInGamutCoords(srgb, [1.01, 0, 0])).toBe(false);
  });

  test("check containment in the gamut space", () => {
    const doubled = createSpace({
      id: "doubled",
      channels: srgb.channels,
      base: srgb,
      gamut: srgb,
      toBase(coords, out) {
        out[0] = coords[0] * 2;
        out[1] = coords[1] * 2;
        out[2] = coords[2] * 2;

        return out;
      },
      fromBase(coords, out) {
        out[0] = coords[0] / 2;
        out[1] = coords[1] / 2;
        out[2] = coords[2] / 2;

        return out;
      },
    });

    expect(isInGamutCoords(doubled, [0.6, 0, 0])).toBe(false);
  });

  test("treat unbounded spaces as in gamut", () => {
    expect(isInGamutCoords(oklab, [2, 0, 0])).toBe(true);
  });
});

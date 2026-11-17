import { describe, expect, test } from "vitest";

import {
  convertCoords,
  createPolarSpace,
  createSpace,
  hueChannel,
  normalizeHue,
} from "@auaust/jaune/space";
import { isFrozen } from "@auaust/toolkit/object";

const channel = {
  name: "v",
  range: [0, 1],
  isHue: false,
} as const;

function root(id: string) {
  return createSpace({
    id,
    channels: [channel, channel, channel],
    base: undefined,
    toBase: (coords, out) => {
      out[0] = coords[0];
      out[1] = coords[1];
      out[2] = coords[2];

      return out;
    },
    fromBase: (coords, out) => {
      out[0] = coords[0];
      out[1] = coords[1];
      out[2] = coords[2];

      return out;
    },
  });
}

describe("createSpace", () => {
  test("throws on a definition without three channels", () => {
    expect(() => {
      return createSpace({
        id: "flat",
        // @ts-expect-error a space needs three channels
        channels: [channel, channel],
        base: undefined,
        toBase: (_coords, out) => out,
        fromBase: (_coords, out) => out,
      });
    }).toThrow(TypeError);
  });

  test("derives the hue index and rejects several hue channels", () => {
    const definition = {
      id: "cylinder",
      base: undefined,
      toBase: root("unused").toBase,
      fromBase: root("unused").fromBase,
      isAchromatic: () => false,
    };

    expect(root("flat").hueIndex).toBeUndefined();

    expect(
      createSpace({ ...definition, channels: [channel, channel, hueChannel] })
        .hueIndex,
    ).toBe(2);

    expect(() => {
      return createSpace({
        ...definition,
        channels: [hueChannel, channel, hueChannel],
      });
    }).toThrow(TypeError);
  });

  test("resolves a self gamut and freezes the space", () => {
    const space = createSpace({ ...root("self"), gamut: "self" });

    expect(space.gamut).toBe(space);
    expect(isFrozen(space)).toBe(true);
    expect(isFrozen(space.channels[0])).toBe(true);
  });
});

describe("createPolarSpace", () => {
  const base = root("lab-like");

  const polar = createPolarSpace({
    id: "polar",
    base,
    chromaRange: [0, 1],
    achromaticThreshold: 1e-3,
  });

  test("keeps the base's lightness channel and adds the shared hue", () => {
    expect(polar.channels[0]).toEqual(base.channels[0]);
    expect(polar.channels[2]).toEqual(hueChannel);
    expect(polar.gamut).toBe(base.gamut);
  });

  test("wraps negative angles and gives achromatic colors hue 0", () => {
    expect(polar.fromBase([0.5, 0, -1], [0, 0, 0])).toEqual([0.5, 1, 270]);
    expect(polar.fromBase([0.5, 1e-4, -1e-4], [0, 0, 0])[2]).toBe(0);
    expect(polar.isAchromatic?.([0.5, 1e-4, 90])).toBe(true);
  });
});

describe("convertCoords", () => {
  test("throws between spaces of different roots", () => {
    expect(() => {
      return convertCoords(root("a"), root("b"), [0, 0, 0], [0, 0, 0]);
    }).toThrow(TypeError);
  });
});

describe("normalizeHue", () => {
  test("wraps angles into [0, 360)", () => {
    expect(normalizeHue(-90)).toBe(270);
    expect(normalizeHue(720)).toBe(0);
    expect(normalizeHue(-1e-14)).toBe(0);
  });
});

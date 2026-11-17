import { describe, expect, test } from "vitest";

import { convertCoords, createSpace } from "@auaust/jaune/space";
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

  test("resolves a self gamut and freezes the space", () => {
    const space = createSpace({ ...root("self"), gamut: "self" });

    expect(space.gamut).toBe(space);
    expect(isFrozen(space)).toBe(true);
    expect(isFrozen(space.channels[0])).toBe(true);
  });
});

describe("convertCoords", () => {
  test("throws between spaces of different roots", () => {
    expect(() => {
      return convertCoords(root("a"), root("b"), [0, 0, 0], [0, 0, 0]);
    }).toThrow(TypeError);
  });
});

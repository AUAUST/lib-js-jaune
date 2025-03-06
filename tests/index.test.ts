import { describe, expect, test } from "vitest";

import { isHex, parseHex } from "~/utils/hex";

describe("HEX colors", () => {
  test("can be recognized", () => {
    const hex = [
      "#c85",
      "3f9",
      "#810e",
      "#deb6f8",
      "#149d15f4",
      "aBcDeF01",
      "#12345678",
      "abcdef",
    ];

    hex.forEach((h) => {
      expect(isHex(h)).toBe(true);
    });

    const notHex = [
      "#xyz",
      "#12345g",
      "#123456789",
      "#12",
      {},
      NaN,
      undefined,
      1,
      "",
    ];

    notHex.forEach((h) => {
      expect(isHex(h)).toBe(false);
    });
  });

  test("can be parsed", () => {
    const hex = {
      c85: { r: 204, g: 136, b: 85, a: 1 },
      "#810e": { r: 136, g: 17, b: 0, a: (1 / 16) * 15 },
      deb6f8: { r: 222, g: 182, b: 248, a: 1 },
      "#149d15f4": { r: 20, g: 157, b: 21, a: (1 / 256) * 244 },
      aBcDeF01: { r: 171, g: 205, b: 239, a: (1 / 256) * 1 },
      "#12345678": { r: 18, g: 52, b: 86, a: (1 / 256) * 120 },
    };

    Object.entries(hex).forEach(([input, expected]) => {
      const components = parseHex(input);

      expect(components.r).toBe(expected.r);
      expect(components.g).toBe(expected.g);
      expect(components.b).toBe(expected.b);
      expect(components.a).toBeCloseTo(expected.a);
    });
  });
});

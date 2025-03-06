import { describe, expect, test } from "vitest";

import { isNamedColor } from "~/utils/namedColors";

describe("RGB colors", () => {
  test("can be recognized", () => {
    const rgb = [
      "White",
      "black",
      "salmon",
      "antiquewhite",
      "transparent",
      "YELLOW",
    ];

    rgb.forEach((h) => {
      expect(isNamedColor(h)).toBe(true);
    });

    const notRgb = [
      "",
      "#xyz",
      "#124abc01",
      "unknown",
      "black ",
      {},
      NaN,
      undefined,
      1,
      [1, 2],
    ];

    notRgb.forEach((h) => {
      expect(isNamedColor(h)).toBe(false);
    });
  });
});

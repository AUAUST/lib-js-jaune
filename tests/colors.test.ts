import { describe, expect, test } from "vitest";
import { Color } from "~/classes/Color";
import { isColor } from "~/utils/colors";

describe("Colors", () => {
  test("can be recognized", () => {
    const colors = [
      "#c85",
      "3f9",
      "#12345678",
      "black",
      "salmon",
      Color.from(1, 2, 3, 0.1),
      { r: 1, g: 255, b: 120 },
      [1, 2, 3, 0.1],
    ];

    colors.forEach((h) => {
      expect(isColor(h)).toBe(true);
    });

    const notColors = [
      "#xyz",
      "#12345g",
      "#12",
      " black",
      { r: 1, g: 2, b: 256 },
      NaN,
      undefined,
      [256],
      [0, 0, 0, 1, 0],
    ];

    notColors.forEach((h) => {
      expect(isColor(h)).toBe(false);
    });
  });
});

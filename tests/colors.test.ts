import { describe, expect, test } from "vitest";
import { Color } from "~/classes/Color";
import { isColor, type } from "~/utils";

describe("Colors", () => {
  test("'s type can be checked", () => {
    expect(type("black")).toBe("named");
    expect(type([1, 2, 3])).toBe("rgb");
    expect(type("#fff")).toBe("hex");
    expect(type(Color.from(1, 2, 3, 0.1))).toBe("color");
    expect(type({ r: 1, g: 2, b: 3 })).toBe("channels");

    expect(type({})).toBeUndefined();
    expect(type(null!)).toBeUndefined();
  });

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

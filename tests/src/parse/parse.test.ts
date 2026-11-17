import { describe, expect, test } from "vitest";

import {
  colorType,
  isColorInput,
  parseColor,
  toColor,
} from "@auaust/jaune/parse";

const inputs: unknown[] = [
  "#c85",
  "cafe",
  "Salmon",
  "nope",
  [300, 0, 0],
  [Number.NaN, 0, 0],
  [0, 0],
  {
    r: 0,
    g: 0,
    b: 0,
  },
  {
    r: 0,
    g: 0,
    b: 0,
    a: Number.NaN,
  },
  toColor("red"),
  undefined,
  0,
];

describe("parse", () => {
  test("clamps 8-bit inputs alike", () => {
    expect(toColor([300, 0, 0])).toEqual(
      toColor({
        r: 300,
        g: 0,
        b: 0,
      }),
    );
  });

  test("rejects invalid inputs", () => {
    expect(parseColor([Number.NaN, 0, 0])).toBeUndefined();

    expect(
      parseColor({
        r: 0,
        g: 0,
        b: 0,
        a: Number.NaN,
      }),
    ).toBeUndefined();

    expect(parseColor("cafe")).toBeUndefined();
    expect(() => toColor("nope")).toThrow(TypeError);
    expect(toColor("nope", "white")).toBe(toColor("white"));
  });

  test("detects exactly what it parses", () => {
    for (const input of inputs) {
      expect(colorType(input) !== undefined).toBe(
        parseColor(input) !== undefined,
      );

      expect(isColorInput(input)).toBe(parseColor(input) !== undefined);
    }

    expect(
      colorType({
        r: 1,
        g: 2,
        b: 3,
      }),
    ).toBe("rgbChannels");
  });
});

import { expect, test } from "vitest";

import { Color } from "@auaust/jaune";
import { hueRotate, parseHex } from "@auaust/jaune/utils";

test("Hues can be rotated", () => {
  expect(Color.from("red").toHueRotate(120).toHex()).toBe("#00ff00");

  const cases: [string, number, string][] = [
    ["#ff0000", 240, "#0000ff"],
    ["#ff0000", -120, "#0000ff"],
    ["#ff0000", 60, "#ffff00"],
    ["#ff8000", 180, "#007fff"],
    ["#336699", 360, "#336699"],
    ["#336699", 720, "#336699"],
  ];

  for (const [input, degrees, expected] of cases) {
    expect(hueRotate(parseHex(input), degrees)).toEqual(parseHex(expected));
  }
});

test("Hue rotation leaves achromatic colors and alpha unchanged", () => {
  expect(hueRotate(parseHex("#808080"), 90)).toEqual(parseHex("#808080"));
  expect(Color.from("#ff000080").toHueRotate(120).toHex()).toBe("#00ff0080");
});

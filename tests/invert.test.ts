import { Color } from "@auaust/jaune";
import { invert, parseHex } from "@auaust/jaune/utils";
import { expect, test } from "vitest";

test("Colors can be inverted", () => {
  expect(Color.from("black").toInvert().toHex()).toBe("#ffffff");

  const pairs = [
    ["#170049", "#e8ffb6"],
    ["#000000", "#ffffff"],
    ["#ffffff", "#000000"],
    ["#ff0000", "#00ffff"],
    ["#00ff00", "#ff00ff"],
  ];

  for (const [input, expected] of pairs) {
    expect(invert(parseHex(input))).toEqual(parseHex(expected));
  }
});

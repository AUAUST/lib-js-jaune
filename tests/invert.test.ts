import { Color } from "@auaust/jaune";
import { expect, test } from "vitest";
import { invert, parseHex } from "~/utils";

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

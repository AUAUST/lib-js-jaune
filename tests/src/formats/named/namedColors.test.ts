import { describe, expect, test } from "vitest";

import { Color, type ColorChannels, type NamedColor } from "@auaust/jaune";
import {
  isAliasToNamedColor,
  isNamedColor,
  namedColorAliases,
  namedColorsMap,
  namedColorToHex,
  parseNamedColor,
} from "@auaust/jaune/utils";
import { entries } from "@auaust/toolkit/object";

describe("Named colors", () => {
  test("can be recognized", () => {
    const namedColors = [
      "White",
      "black",
      "salmon",
      "antiquewhite",
      "transparent",
      "YELLOW",
    ];

    for (const h of namedColors) {
      expect(isNamedColor(h)).toBe(true);
    }

    const notNamedColors = [
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

    for (const h of notNamedColors) {
      expect(isNamedColor(h)).toBe(false);
    }
  });

  test("can be parsed", () => {
    const namedColors = [
      [
        "White",
        {
          r: 255,
          g: 255,
          b: 255,
        },
      ],
      [
        "black",
        {
          r: 0,
          g: 0,
          b: 0,
        },
      ],
      [
        "salmon",
        {
          r: 250,
          g: 128,
          b: 114,
        },
      ],
      [
        "antIquewhite",
        {
          r: 250,
          g: 235,
          b: 215,
        },
      ],
      [
        "transparent",
        {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        },
      ],
      [
        "YELLOW",
        {
          r: 255,
          g: 255,
          b: 0,
        },
      ],
      [
        "notacolor",
        {
          r: 0,
          g: 0,
          b: 0,
          isFallback: true,
        },
      ], // fallback black
    ] as [string, ColorChannels][];

    for (const [input, expected] of namedColors) {
      const components = parseNamedColor(input);

      expect(components).toBeDefined();
      expect(components.r).toBe(expected.r);
      expect(components.g).toBe(expected.g);
      expect(components.b).toBe(expected.b);
      expect(components.a).toBe(expected.a ?? 1);
      expect(components.isFallback).toBe(expected.isFallback ?? false);
    }
  });

  test("may have aliases", () => {
    const expectedAliases = {
      // No aliases should still return an array with the name
      white: ["white"],
      black: ["black"],
      lime: ["lime"],
      red: ["red"],
      blue: ["blue"],
      transparent: ["transparent"],

      // Aliases should return an array with the name and its aliases in both directions
      aqua: ["aqua", "cyan"],
      cyan: ["aqua", "cyan"],
      fuchsia: ["fuchsia", "magenta"],
      magenta: ["magenta", "fuchsia"],

      // Test known aliases
      darkgray: ["darkgray", "darkgrey"],
      darkslategray: ["darkslategray", "darkslategrey"],
      dimgray: ["dimgray", "dimgrey"],
      lightgray: ["lightgray", "lightgrey"],
      lightslategray: ["lightslategray", "lightslategrey"],
      gray: ["gray", "grey"],
      slategray: ["slategray", "slategrey"],
    };

    for (const [name, aliases] of entries(expectedAliases)) {
      const foundAliases = namedColorAliases(name);

      expect(foundAliases).toEqual(expect.arrayContaining(aliases));
    }

    expect(isAliasToNamedColor("darkgray", "darkgrey")).toBe(true);
    expect(isAliasToNamedColor("darkgray", "lightgray")).toBe(false);

    expect(
      isAliasToNamedColor("unknown" as NamedColor, "unknown" as NamedColor),
    ).toBe(false);
  });

  test("can be converted to HEX", () => {
    expect(namedColorToHex("white")).toBe("#ffffffff"); // this low level function returns the whole hex, including alpha
    expect(namedColorToHex("black")).toBe("#000000ff");
    expect(namedColorToHex("")).toBeUndefined();
  });

  test("ignore inherited object keys", () => {
    for (const key of ["constructor", "toString", "__proto__"]) {
      expect(isNamedColor(key)).toBe(false);
      expect(namedColorToHex(key)).toBeUndefined();
      expect(parseNamedColor(key).isFallback).toBe(true);
    }
  });
});

test("Colors can match their closest named color", () => {
  // Ensure all named colors match themselves, aliases handled
  for (const [name, hex] of entries(namedColorsMap)) {
    const aliases = namedColorAliases(name);

    expect(aliases).toContain(Color.from(name).closestNamedColor);
    expect(aliases).toContain(Color.from(hex).closestNamedColor);
  }

  expect(Color.from("black").closestNamedColor).toBe("black");
  expect(Color.from(1, 2, 3, 1).closestNamedColor).toBe("black");
  expect(Color.from(250, 250, 250).closestNamedColor).toBe("snow");
  expect(Color.from("#fd6143").closestNamedColor).toBe("tomato");
  expect(Color.from("#001").closestNamedColor).toBe("black");
  expect(Color.from("#fefefe").closestNamedColor).toBe("white");
  expect(Color.from("#f80000").closestNamedColor).toBe("red");
  expect(Color.from("#0104fa").closestNamedColor).toBe("blue");
});

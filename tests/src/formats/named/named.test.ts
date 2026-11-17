import { describe, expect, test } from "vitest";

import { toHex } from "@auaust/jaune/hex";
import {
  isAliasToNamedColor,
  isNamedColor,
  namedColorAliases,
  parseNamedColor,
} from "@auaust/jaune/named";

describe("named colors", () => {
  test("match lowercase names exactly", () => {
    expect(isNamedColor("salmon")).toBe(true);
    expect(isNamedColor("Salmon")).toBe(false);
  });

  test("parse case-insensitively into cached records", () => {
    const yellow = parseNamedColor("YELLOW");

    expect(yellow).toBe(parseNamedColor("yellow"));
    expect(yellow && toHex(yellow)).toBe("#ffff00");
    expect(parseNamedColor("transparent")?.alpha).toBe(0);
    expect(parseNamedColor("notacolor")).toBeUndefined();
  });

  test("have aliases", () => {
    expect(namedColorAliases("cyan")).toEqual(["aqua", "cyan"]);
    expect(isAliasToNamedColor("gray", "grey")).toBe(true);
  });
});

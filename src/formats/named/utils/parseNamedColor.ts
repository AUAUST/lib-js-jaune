import { getOrSet } from "@auaust/toolkit/maplike";

import { parseHex } from "#formats/hex/utils/parseHex";
import { namedColorsMap } from "#formats/named/constants";
import { isNamedColor } from "#formats/named/utils/isNamedColor";
import type { Color } from "#color/types/Color";
import type { NamedColor } from "#formats/named/types/NamedColor";

const records = new Map<NamedColor, Color>();

function toRecord(name: NamedColor): Color {
  const color = parseHex(namedColorsMap[name]);

  if (!color) {
    throw new TypeError(`Named color "${name}" maps to an invalid HEX string.`);
  }

  return color;
}

/**
 * The cached `srgb` color of a CSS color name, matched case-insensitively, or
 * `undefined` when `name` is not one.
 */
export function parseNamedColor(name: string): Color | undefined {
  const lowercased = name.toLowerCase();

  return isNamedColor(lowercased)
    ? getOrSet(records, lowercased, () => toRecord(lowercased))
    : undefined;
}

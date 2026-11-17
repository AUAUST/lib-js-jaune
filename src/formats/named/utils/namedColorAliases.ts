import { getOrSet } from "@auaust/toolkit/maplike";
import { freeze } from "@auaust/toolkit/object";

import { namedColors } from "#formats/named/constants";
import { isNamedColor } from "#formats/named/utils/isNamedColor";
import { namedColorToHex } from "#formats/named/utils/namedColorToHex";
import type { NamedColor } from "#formats/named/types/NamedColor";

const namedColorsAliasesCache = new Map<NamedColor, readonly NamedColor[]>();

/**
 * Returns all the aliases of a named color, matched case-insensitively, including
 * the name itself, or an empty list when it is not a named color.
 */
export function namedColorAliases(name: NamedColor): readonly NamedColor[] {
  const lowercased = name.toLowerCase();

  if (!isNamedColor(lowercased)) {
    return [];
  }

  return getOrSet(namedColorsAliasesCache, lowercased, () => {
    const targetHex = namedColorToHex(lowercased);

    return freeze(
      namedColors.filter((candidate) => {
        return namedColorToHex(candidate) === targetHex;
      }),
    );
  });
}

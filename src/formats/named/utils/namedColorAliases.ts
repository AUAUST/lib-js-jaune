import { entries } from "@auaust/toolkit/object";
import { namedColorsMap } from "#formats/named/constants";
import type { NamedColor } from "#formats/named/types/NamedColor";
import { isNamedColor } from "#formats/named/utils/isNamedColor";
import { namedColorToHex } from "#formats/named/utils/namedColorToHex";

const namedColorsAliasesCache: Partial<
  Record<NamedColor, readonly NamedColor[]>
> = {};

/**
 * Returns all the aliases of a named color.
 */
export function namedColorAliases(name: NamedColor): readonly NamedColor[] {
  name = <NamedColor>name.toLowerCase();

  if (!isNamedColor(name)) {
    return [];
  }

  if (namedColorsAliasesCache[name]) {
    return namedColorsAliasesCache[name]!;
  }

  const aliases: NamedColor[] = [];
  const targetHex = namedColorToHex(name);

  for (const [name, hex] of entries(namedColorsMap)) {
    if (hex === targetHex) {
      aliases.push(name);
    }
  }

  return (namedColorsAliasesCache[name] = Object.freeze(aliases));
}

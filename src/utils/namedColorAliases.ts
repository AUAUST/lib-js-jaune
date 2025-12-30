import { O } from "@auaust/primitive-kit";
import type { NamedColor } from "~/types";
import { isNamedColor, namedColorToHex, namedColorsMap } from "~/utils";

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

  for (const [name, hex] of O.entries(namedColorsMap)) {
    if (hex === targetHex) {
      aliases.push(name);
    }
  }

  return (namedColorsAliasesCache[name] = Object.freeze(aliases));
}

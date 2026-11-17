import { namedColorsMap } from "#formats/named/constants";
import { isNamedColor } from "#formats/named/utils/isNamedColor";
import type { MaybeNamedColor } from "#formats/named/types/MaybeNamedColor";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * Returns the corresponding HEX value of a named color, matched
 * case-insensitively, or `undefined` when the name is not a CSS color name.
 */
export function namedColorToHex(name: NamedColor): string;
export function namedColorToHex(name: MaybeNamedColor): string | undefined;
export function namedColorToHex(name: MaybeNamedColor): string | undefined {
  const lowercased = name.toLowerCase();

  return isNamedColor(lowercased) ? namedColorsMap[lowercased] : undefined;
}

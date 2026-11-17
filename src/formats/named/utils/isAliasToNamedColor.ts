import { isNamedColor } from "#formats/named/utils/isNamedColor";
import { namedColorAliases } from "#formats/named/utils/namedColorAliases";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * Returns a boolean indicating whether two named colors, matched
 * case-insensitively, are aliases.
 */
export function isAliasToNamedColor(
  name: NamedColor,
  alias: NamedColor,
): boolean {
  const lowercased = alias.toLowerCase();

  return (
    isNamedColor(lowercased) && namedColorAliases(name).includes(lowercased)
  );
}

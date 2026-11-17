import type { NamedColor } from "#formats/named/types/NamedColor";
import { namedColorAliases } from "#formats/named/utils/namedColorAliases";

/**
 * Returns a boolean indicating whether two named colors are aliases.
 */
export function isAliasToNamedColor(
  name: NamedColor,
  alias: NamedColor,
): boolean {
  return namedColorAliases(name).includes(<NamedColor>alias.toLowerCase());
}

import type { NamedColor } from "~/types";
import { namedColorAliases } from "~/utils";

/**
 * Returns a boolean indicating whether two named colors are aliases.
 */
export function isAliasToNamedColor(
  name: NamedColor,
  alias: NamedColor
): boolean {
  return namedColorAliases(name).includes(<NamedColor>alias.toLowerCase());
}

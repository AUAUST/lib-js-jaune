import { namedColorsMap } from "~/data/namedColors";
import type { MaybeNamedColor, NamedColor } from "~/types";

/**
 * Returns the corresponding HEX value of a named color.
 */
export function namedColorToHex(name: NamedColor): string;
export function namedColorToHex(name: MaybeNamedColor): string | undefined;
export function namedColorToHex(name: MaybeNamedColor): string | undefined {
  return namedColorsMap[<NamedColor>name.toLowerCase()] || undefined;
}

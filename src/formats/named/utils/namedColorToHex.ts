import { namedColorsMap } from "#formats/named/constants";
import type { MaybeNamedColor } from "#formats/named/types/MaybeNamedColor";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * Returns the corresponding HEX value of a named color.
 */
export function namedColorToHex(name: NamedColor): string;
export function namedColorToHex(name: MaybeNamedColor): string | undefined;
export function namedColorToHex(name: MaybeNamedColor): string | undefined {
  return namedColorsMap[<NamedColor>name.toLowerCase()] || undefined;
}

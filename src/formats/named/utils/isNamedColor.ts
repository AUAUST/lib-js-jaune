import { isString } from "@auaust/toolkit/guard";
import { namedColors } from "#formats/named/constants";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * Whether the input is a valid named color.
 *
 * The check is case-insensitive.
 */
export function isNamedColor(value: unknown): value is NamedColor {
  return isString(value) && namedColors.has(<NamedColor>value.toLowerCase());
}

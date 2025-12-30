import { isString } from "@auaust/primitive-kit/strings";
import { namedColors } from "~/data/namedColors";
import type { NamedColor } from "~/types";

/**
 * Whether the input is a valid named color.
 *
 * The check is case-insensitive.
 */
export function isNamedColor(value: unknown): value is NamedColor {
  return isString(value) && namedColors.has(<NamedColor>value.toLowerCase());
}

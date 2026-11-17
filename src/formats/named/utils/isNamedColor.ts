import { isString } from "@auaust/toolkit/guard";
import { hasOwn } from "@auaust/toolkit/object";

import { namedColorsMap } from "#formats/named/constants";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * Whether the input is a valid named color.
 *
 * The check is case-insensitive.
 */
export function isNamedColor(value: unknown): value is NamedColor {
  return isString(value) && hasOwn(namedColorsMap, value.toLowerCase());
}

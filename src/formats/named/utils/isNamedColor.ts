import { isString } from "@auaust/toolkit/guard";
import { hasOwn } from "@auaust/toolkit/object";

import { namedColorsMap } from "#formats/named/constants";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * Whether `value` is a CSS color name, matched exactly: names are lowercase.
 */
export function isNamedColor(value: unknown): value is NamedColor {
  return isString(value) && hasOwn(namedColorsMap, value);
}

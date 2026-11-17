import { isString } from "@auaust/toolkit/guard";

import type { Hex } from "#formats/hex/types/Hex";

const hexColor = /^#(?:[\dA-Fa-f]{3,4}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8})$/;

/**
 * Whether `value` is a hash followed by 3, 4, 6 or 8 hexadecimal digits.
 */
export function isHex(value: unknown): value is Hex {
  return isString(value) && hexColor.test(value);
}

import { isString } from "@auaust/toolkit/guard";
import { withoutPrefix } from "@auaust/toolkit/string";

import type { Hex } from "#formats/hex/types/Hex";

const hexColorDigits = /^(?:[\dA-Fa-f]{3,4}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8})$/;

/**
 * Whether the input is a HEX color of 3, 4, 6 or 8 hexadecimal digits, with or
 * without a leading hash.
 */
export function isHex(value: unknown): value is Hex {
  return isString(value) && hexColorDigits.test(withoutPrefix(value, "#"));
}

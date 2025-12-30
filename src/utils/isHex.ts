import { isStrictString, isString } from "@auaust/primitive-kit/strings";
import type { Hex } from "~/types";

const hexadecimalRegex = /^[0-9A-Fa-f]+$/;

/**
 * Whether the input is a valid HEX color. With or without the alpha channel, and with single or double digits.
 *
 * It may or may not start with a hash character, which will be ignored.
 */
export function isHex(value: unknown): value is Hex {
  value = isString(value) && (value.startsWith("#") ? value.slice(1) : value);

  if (!isStrictString(value)) {
    return false;
  }

  switch (value.length) {
    case 3: // RGB
    case 4: // RGBA
    case 6: // RRGGBB
    case 8: // RRGGBBAA
      return hexadecimalRegex.test(value);
    default:
      return false;
  }
}

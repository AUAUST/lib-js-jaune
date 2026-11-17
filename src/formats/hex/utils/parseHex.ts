import { withoutPrefix } from "@auaust/toolkit/string";

import {
  fallbackColor,
  toColorChannels,
  type ColorChannels,
} from "#formats/channels/index";
import { isHex } from "#formats/hex/utils/isHex";
import type { Hex } from "#formats/hex/types/Hex";

/**
 * Parses a HEX color into an object of color channels, or returns the fallback
 * color when the input is not a HEX color.
 */
export function parseHex(value: Hex): ColorChannels {
  if (!isHex(value)) {
    return fallbackColor;
  }

  const digits = withoutPrefix(value, "#");
  const isShort = digits.length < 6;
  const hasAlpha = isShort ? digits.length === 4 : digits.length === 8;

  const r = parseInt(isShort ? digits[0].repeat(2) : digits.slice(0, 2), 16);
  const g = parseInt(isShort ? digits[1].repeat(2) : digits.slice(2, 4), 16);
  const b = parseInt(isShort ? digits[2].repeat(2) : digits.slice(4, 6), 16);

  const a = hasAlpha
    ? parseInt(isShort ? digits[3].repeat(2) : digits.slice(6, 8), 16) / 255
    : 1;

  return toColorChannels(r, g, b, a);
}

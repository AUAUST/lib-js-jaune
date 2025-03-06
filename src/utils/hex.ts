import { S } from "@auaust/primitive-kit";
import type { ColorChannels, Hex } from "~/types";

const hexadecimalRegex = /^[0-9a-f]+$/i;

/**
 * Whether the input is a valid HEX color. With or without the alpha channel, and with single or double digits.
 *
 * It may or may not start with a hash character, which will be ignored.
 */
export function isHex(value: unknown): value is Hex {
  value = S.is(value) && (value.startsWith("#") ? value.slice(1) : value);

  if (!S.isStrict(value)) {
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

/**
 * Parses a hex string into an object of color channels.
 *
 * The input must already be a valid HEX color, otherwise the result will be unexpected.
 */
export function parseHex(value: Hex): ColorChannels {
  value = value.startsWith("#") ? value.slice(1) : value;

  const isShort = value.length < 6;
  const hasAlpha = isShort ? value.length === 4 : value.length === 8;

  const r = parseInt(isShort ? value[0].repeat(2) : value.slice(0, 2), 16);
  const g = parseInt(isShort ? value[1].repeat(2) : value.slice(2, 4), 16);
  const b = parseInt(isShort ? value[2].repeat(2) : value.slice(4, 6), 16);
  const a = hasAlpha
    ? parseInt(isShort ? value[3].repeat(2) : value.slice(6, 8), 16) / 255
    : 1;

  return { r, g, b, a };
}

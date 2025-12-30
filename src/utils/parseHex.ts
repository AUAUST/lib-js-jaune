import type { ColorChannels, Hex } from "~/types";
import { toColorChannels } from "~/utils";

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

  return toColorChannels(r, g, b, a);
}

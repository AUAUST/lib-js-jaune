import { round } from "@auaust/toolkit/math";

import { rgbChannelMax } from "#formats/channels/constants";
import { toRgbTuple } from "#formats/channels/utils/toRgbTuple";
import type { Color } from "#color/types/Color";
import type { Hex } from "#formats/hex/types/Hex";

function toDigits(byte: number): string {
  return byte.toString(16).padStart(2, "0");
}

/**
 * The HEX string of `color` gamut-mapped to `srgb`: 6 digits, or 8 when its alpha
 * quantized to a byte is below 255.
 */
export function toHex(color: Color): Hex {
  const [r, g, b] = toRgbTuple(color);
  const a = round(color.alpha * rgbChannelMax);

  return `#${toDigits(r)}${toDigits(g)}${toDigits(b)}${a < rgbChannelMax ? toDigits(a) : ""}`;
}

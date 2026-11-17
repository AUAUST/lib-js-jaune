import { isArray } from "@auaust/toolkit/guard";
import { isBetween } from "@auaust/toolkit/number";
import { isAlphaChannel, isRgbChannel } from "#formats/channels/index";
import type { Rgb } from "#formats/rgb/types/Rgb";

/**
 * Whether the input is a valid RGB color.
 */
export function isRgb(value: unknown): value is Rgb {
  return (
    isArray(value) &&
    isBetween(value.length, 3, 4) &&
    value.every((n, i) => (i === 3 ? isAlphaChannel(n) : isRgbChannel(n)))
  );
}

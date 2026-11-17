import { isNumber } from "@auaust/toolkit/guard";
import { clamp } from "@auaust/toolkit/math";

/**
 * Clamps the value between 0 and 1; a nullish or non-number value gives 1.
 */
export function toAlphaChannel(value: number | undefined | null): number {
  return isNumber(value) ? clamp(value, 0, 1) : 1;
}

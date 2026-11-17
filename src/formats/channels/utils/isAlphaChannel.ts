import { isNumber } from "@auaust/toolkit/guard";
import { isBetween } from "@auaust/toolkit/number";

/**
 * Whether the value is a number between 0 and 1, both inclusive.
 */
export function isAlphaChannel(value: unknown): value is number {
  return isNumber(value) && isBetween(value, 0, 1);
}

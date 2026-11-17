import { isNumber } from "@auaust/toolkit/guard";
import { isBetween } from "@auaust/toolkit/number";

/**
 * Whether the value is a number between 0 and 255, both inclusive; fractions pass.
 */
export function isRgbChannel(value: unknown): value is number {
  return isNumber(value) && isBetween(value, 0, 255);
}

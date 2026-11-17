import { isArray, isNumber } from "@auaust/toolkit/guard";
import { isBetween } from "@auaust/toolkit/number";

import type { Rgb } from "#formats/rgb/types/Rgb";

/**
 * Whether the input could be a valid RGB color. As in, it checks if the input is
 * an array of numbers without validating the values range.
 */
export function couldBeRgb(value: unknown): value is Rgb {
  return (
    isArray(value) && isBetween(value.length, 3, 4) && value.every(isNumber)
  );
}

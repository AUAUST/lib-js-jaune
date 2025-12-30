import { isArray } from "@auaust/primitive-kit/arrays";
import { isBetween, isNumber } from "@auaust/primitive-kit/numbers";
import type { Rgb } from "~/types";

/**
 * Whether the input could be a valid RGB color.
 * As in, it checks if the input is an array of numbers without validating the values range.
 */
export function couldBeRgb(value: unknown): value is Rgb {
  return (
    isArray(value) && isBetween(value.length, 3, 4) && value.every(isNumber)
  );
}

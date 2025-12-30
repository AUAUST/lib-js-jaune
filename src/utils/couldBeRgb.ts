import { A, N } from "@auaust/primitive-kit";
import type { Rgb } from "~/types";

/**
 * Whether the input could be a valid RGB color.
 * As in, it checks if the input is an array of numbers without validating the values range.
 */
export function couldBeRgb(value: unknown): value is Rgb {
  return A.is(value) && N.isBetween(value.length, 3, 4) && value.every(N.is);
}

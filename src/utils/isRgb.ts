import { A, N } from "@auaust/primitive-kit";
import type { Rgb } from "~/types";
import { isAlphaChannel, isRgbChannel } from "~/utils";

/**
 * Whether the input is a valid RGB color.
 */
export function isRgb(value: unknown): value is Rgb {
  return (
    A.is(value) &&
    N.isBetween(value.length, 3, 4) &&
    value.every((n, i) => (i === 3 ? isAlphaChannel(n) : isRgbChannel(n)))
  );
}

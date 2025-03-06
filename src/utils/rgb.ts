import { A, N } from "@auaust/primitive-kit";
import type { ColorChannels, Rgb } from "~/types";
import { isAlphaChannel, isRgbChannel } from "./channels";

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

/**
 * Parses a RGB tuple into an object of color channels.
 *
 * The input must already be a valid RGB tuple, otherwise the result will be unexpected.
 */
export function parseRgb(value: Rgb): ColorChannels {
  return {
    r: N.clamp(value[0], 0, 255),
    g: N.clamp(value[1], 0, 255),
    b: N.clamp(value[2], 0, 255),
    a: N.clamp(value[3] ?? 1, 0, 1),
  };
}

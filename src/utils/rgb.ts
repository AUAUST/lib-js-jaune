import { A, N } from "@auaust/primitive-kit";
import type { ColorChannels, Rgb } from "~/types";
import {
  fallbackColor,
  isAlphaChannel,
  isRgbChannel,
  toAlphaChannel,
  toColorChannels,
  toRgbChannel,
} from "./channels";

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
  return A.is(value)
    ? toColorChannels(value[0], value[1], value[2], value[3]) // Don't spread to avoid mistakenly forwarding `isTransformed` and `isFallback`
    : fallbackColor;
}

/**
 * Returns the corresponding RGB tuple of a color channels object.
 */
export function toRgb(channels: ColorChannels): Rgb {
  const { r, g, b, a } = channels;

  return Array.from([r, g, b, a], (value, i) =>
    i === 3 ? toAlphaChannel(value) : toRgbChannel(value)
  );
}

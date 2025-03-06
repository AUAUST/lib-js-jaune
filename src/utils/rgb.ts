import { A, N } from "@auaust/primitive-kit";
import type { ColorChannels, Rgb } from "~/types";
import {
  fallbackColor,
  isAlphaChannel,
  isRgbChannel,
  toChannels,
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
  return A.is(value) ? toChannels(...(<Rgb>value)) : fallbackColor;
}

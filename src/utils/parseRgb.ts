import { A } from "@auaust/primitive-kit";
import type { ColorChannels, Rgb } from "~/types";
import { fallbackColor, toColorChannels } from "~/utils";

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

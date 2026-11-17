import { isObject } from "@auaust/toolkit/guard";
import { isNaN } from "@auaust/toolkit/number";
import { freeze } from "@auaust/toolkit/object";

import { fallbackColor } from "#formats/channels/constants";
import { toAlphaChannel } from "#formats/channels/utils/toAlphaChannel";
import { toRgbChannel } from "#formats/channels/utils/toRgbChannel";
import type { ColorChannels } from "#formats/channels/types/ColorChannels";
import type { ResolvedColorChannels } from "#formats/channels/types/ResolvedColorChannels";

/**
 * Formats the input into a frozen object of color channels.
 *
 * It rounds and clamps the values to their valid range, sets a missing RGB
 * channel to 0 and a missing alpha channel to 1, and sets `isTransformed` when
 * any value changed. A `NaN` RGB channel returns the fallback color.
 */
export function toColorChannels(value: ColorChannels): ResolvedColorChannels;
export function toColorChannels(
  r: number,
  g: number,
  b: number,
  a?: number | null,
  isTransformed?: boolean,
  isFallback?: boolean,
): ResolvedColorChannels;
export function toColorChannels(
  r: number | ColorChannels,
  g?: number,
  b?: number,
  a?: number | null,
  isTransformed?: boolean,
  isFallback?: boolean,
): ResolvedColorChannels {
  if (isObject(r)) {
    ({ r, g, b, a, isTransformed, isFallback } = r);
  }

  const finalR = toRgbChannel(r);
  const finalG = toRgbChannel(g);
  const finalB = toRgbChannel(b);

  if (isNaN(finalR) || isNaN(finalG) || isNaN(finalB)) {
    return fallbackColor;
  }

  const finalA = toAlphaChannel(a);

  return freeze({
    r: finalR,
    g: finalG,
    b: finalB,
    a: finalA,
    isTransformed: !!(
      isTransformed ||
      finalR !== r ||
      finalG !== g ||
      finalB !== b ||
      finalA !== (a ?? 1)
    ),
    isFallback: !!isFallback,
  });
}

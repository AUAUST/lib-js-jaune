import type { ResolvedColorChannels } from "#formats/channels/types/ResolvedColorChannels";
import { isObject } from "@auaust/toolkit/guard";
import { fallbackColor } from "#formats/channels/constants";
import type { ColorChannels } from "#formats/channels/types/ColorChannels";
import { toAlphaChannel } from "#formats/channels/utils/toAlphaChannel";
import { toRgbChannel } from "#formats/channels/utils/toRgbChannel";

/**
 * Formats the input into a readonly object of color channels.
 *
 * It clamps the values to the valid range and sets the alpha channel to 1 if not
 * provided. If the passed `isTransformed` isn't already `true`, it will set it
 * to `true` if any of the values were clamped. If some channels are missing, it
 * will return the fallback color.
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

  return Object.freeze({
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

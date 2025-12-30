import { isObject } from "@auaust/primitive-kit/objects";
import type { ColorChannels } from "~/types";
import { fallbackColor, toAlphaChannel, toRgbChannel } from "~/utils";

/**
 * Formats the input into a readonly object of color channels.
 *
 * It clamps the values to the valid range and sets the alpha channel to 1 if not provided.
 * If the passed `isTransformed` isn't already `true`, it will set it to `true` if any of the values were clamped.
 * If some channels are missing, it will return the fallback color.
 */
export function toColorChannels(value: ColorChannels): Required<ColorChannels>;
export function toColorChannels(
  r: number,
  g: number,
  b: number,
  a?: number | null,
  isTransformed?: boolean,
  isFallback?: boolean
): Required<ColorChannels>;
export function toColorChannels(
  r: number | ColorChannels,
  g?: number,
  b?: number,
  a?: number | null,
  isTransformed?: boolean,
  isFallback?: boolean
): Required<ColorChannels> {
  if (isObject(r, false)) {
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

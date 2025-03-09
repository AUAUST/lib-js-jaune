import { N, O } from "@auaust/primitive-kit";
import type { ColorChannels } from "~/types";

export function isRgbChannel(value: unknown): value is number {
  return N.is(value) && N.isBetween(value, 0, 255);
}

export function toRgbChannel(value: number | undefined | null): number {
  return N.clamp(N.round(value), 0, 255);
}

export function isAlphaChannel(value: unknown): value is number {
  return N.is(value) && N.isBetween(value, 0, 1);
}

export function toAlphaChannel(value: number | undefined | null): number {
  return N.is(value) ? N.clamp(value, 0, 1) : 1;
}

export function isColorChannels(value: unknown): value is ColorChannels {
  return (
    O.is(value, false) &&
    isRgbChannel(value.r) &&
    isRgbChannel(value.g) &&
    isRgbChannel(value.b) &&
    isAlphaChannel(value.a ?? 1)
  );
}

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
  if (O.is(r, false)) {
    ({ r, g, b, a, isTransformed, isFallback } = r);
  }

  const finalR = toRgbChannel(r);
  const finalG = toRgbChannel(g);
  const finalB = toRgbChannel(b);

  if (isNaN(finalR) || isNaN(finalG) || isNaN(finalB)) {
    return fallbackColor;
  }

  const finalA = toAlphaChannel(a);

  return O.freeze({
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

export const fallbackColor = toColorChannels(0, 0, 0, 1, false, true);

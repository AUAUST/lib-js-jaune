import { N, O } from "@auaust/primitive-kit";
import { ColorChannels } from "~/types";

export function isRgbChannel(value: unknown): value is number {
  return N.is(value) && N.isBetween(value, 0, 255);
}

export function isAlphaChannel(value: unknown): value is number {
  return N.is(value) && N.isBetween(value, 0, 1);
}

export function isColorChannels(value: unknown): value is ColorChannels {
  return (
    O.is(value, false) &&
    isRgbChannel(value.r) &&
    isRgbChannel(value.g) &&
    isRgbChannel(value.b) &&
    isAlphaChannel(value.a)
  );
}

export function toChannels(value: ColorChannels): ColorChannels;
export function toChannels(
  r: number,
  g: number,
  b: number,
  a?: number | null,
  transformed?: boolean
): ColorChannels;

/**
 * Formats the input into a readonly object of color channels.
 */
export function toChannels(
  r: number | ColorChannels,
  g?: number,
  b?: number,
  a?: number | null,
  transformed?: boolean
): ColorChannels {
  if (O.is(r, false)) {
    ({ r, g, b, a, transformed } = r);
  }

  const finalR = N.clamp(r, 0, 255);
  const finalG = N.clamp(g, 0, 255);
  const finalB = N.clamp(b, 0, 255);
  const finalA = N.clamp(a ?? 1, 0, 1);

  return O.freeze({
    r: finalR,
    g: finalG,
    b: finalB,
    a: finalA,
    transformed: !!(
      transformed ||
      finalR !== r ||
      finalG !== g ||
      finalB !== b ||
      finalA !== (a ?? 1)
    ),
  });
}

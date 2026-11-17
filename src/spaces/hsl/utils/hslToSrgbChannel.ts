import { max, min } from "@auaust/toolkit/math";

/**
 * Gamma-encoded sRGB channel `offset` (0 red, 8 green, 4 blue) of an HSL color,
 * per the CSS Color 4 sample code.
 */
export function hslToSrgbChannel(
  offset: number,
  hue: number,
  saturation: number,
  lightness: number,
): number {
  const k = (offset + hue / 30) % 12;
  const amplitude = saturation * min(lightness, 1 - lightness);

  return lightness - amplitude * max(-1, min(k - 3, 9 - k, 1));
}

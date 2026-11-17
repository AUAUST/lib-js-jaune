import { max, min } from "@auaust/toolkit/math";

import { normalizeHue } from "#spaces/hsl/utils/normalizeHue";

/**
 * Hue in degrees, in [0, 360), of gamma-encoded sRGB channels, per the CSS Color
 * 4 sample code; 0 when the channels are equal.
 */
export function srgbToHue(red: number, green: number, blue: number): number {
  const highest = max(red, green, blue);
  const delta = highest - min(red, green, blue);

  if (delta === 0) {
    return 0;
  }

  const sextant = highest === red
    ? (green - blue) / delta + (green < blue ? 6 : 0)
    : highest === green
      ? (blue - red) / delta + 2
      : (red - green) / delta + 4;

  return normalizeHue(sextant * 60);
}

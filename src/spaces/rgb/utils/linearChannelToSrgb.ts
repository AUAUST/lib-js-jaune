import { abs, pow, sign } from "@auaust/toolkit/math";

import {
  srgbGamma,
  srgbLinearSlope,
  srgbLinearThreshold,
  srgbOffset,
  srgbScale,
} from "#spaces/rgb/constants";

/**
 * Encodes one linear-light channel value with the sRGB transfer function.
 * Preserves sign, so out-of-gamut values round-trip.
 */
export function linearChannelToSrgb(value: number): number {
  const magnitude = abs(value);

  if (magnitude <= srgbLinearThreshold) {
    return value * srgbLinearSlope;
  }

  return sign(value) * (srgbScale * pow(magnitude, 1 / srgbGamma) - srgbOffset);
}

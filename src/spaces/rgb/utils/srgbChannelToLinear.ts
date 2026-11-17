import { abs, pow, sign } from "@auaust/toolkit/math";

import {
  srgbEncodedThreshold,
  srgbGamma,
  srgbLinearSlope,
  srgbOffset,
  srgbScale,
} from "#spaces/rgb/constants";

/**
 * Decodes one gamma-encoded sRGB channel value to linear light. Preserves sign,
 * so out-of-gamut values round-trip.
 */
export function srgbChannelToLinear(value: number): number {
  const magnitude = abs(value);

  if (magnitude <= srgbEncodedThreshold) {
    return value / srgbLinearSlope;
  }

  return sign(value) * pow((magnitude + srgbOffset) / srgbScale, srgbGamma);
}

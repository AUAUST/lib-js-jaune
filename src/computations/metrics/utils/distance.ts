import { pow, sqrt } from "@auaust/toolkit/math";

import type { ColorChannels } from "#formats/channels/index";

/**
 * Calculate the distance between two colors. It is mostly useful for comparing
 * distances between colors, but the value itself is not very meaningful.
 */
export function distance(
  a: ColorChannels,
  b: ColorChannels,
  alpha = false,
): number {
  return sqrt(
    pow(a.r - b.r, 2) +
      pow(a.g - b.g, 2) +
      pow(a.b - b.b, 2) +
      (alpha ? pow((a.a ?? 1) - (b.a ?? 1), 2) : 0),
  );
}

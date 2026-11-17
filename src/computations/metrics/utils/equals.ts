import { abs } from "@auaust/toolkit/math";

import { equalityTolerance } from "#computations/metrics/constants";
import { deltaE } from "#computations/metrics/utils/deltaE";
import type { Color } from "#color/types/Color";

/**
 * Whether `a` and `b` show the same color, whatever their spaces: their `deltaE`
 * and alpha difference are both within `tolerance`.
 */
export function equals(
  a: Color,
  b: Color,
  tolerance: number = equalityTolerance,
): boolean {
  return deltaE(a, b) <= tolerance && abs(a.alpha - b.alpha) <= tolerance;
}

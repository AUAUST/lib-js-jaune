import { lightnessThreshold } from "#computations/metrics/constants";
import { lightness } from "#computations/metrics/utils/lightness";
import type { Color } from "#color/types/Color";

/**
 * Whether the lightness of `color` is above `threshold`.
 */
export function isLight(
  color: Color,
  threshold: number = lightnessThreshold,
): boolean {
  return lightness(color) > threshold;
}

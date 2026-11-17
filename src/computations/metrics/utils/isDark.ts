import { lightnessThreshold } from "#computations/metrics/constants";
import { lightness } from "#computations/metrics/utils/lightness";
import type { Color } from "#color/types/Color";

/**
 * Whether the lightness of `color` is at or below `threshold`.
 */
export function isDark(
  color: Color,
  threshold: number = lightnessThreshold,
): boolean {
  return lightness(color) <= threshold;
}

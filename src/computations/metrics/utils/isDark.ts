import { lightnessThreshold } from "#computations/metrics/constants";
import { lightness } from "#computations/metrics/utils/lightness";
import type { Color } from "#color/types/Color";

/**
 * Whether the lightness of `color` is at or below `threshold`. Composites `color`
 * over `backdrop` first when given; ignores alpha otherwise.
 */
export function isDark(
  color: Color,
  threshold: number = lightnessThreshold,
  backdrop?: Color,
): boolean {
  return lightness(color, backdrop) <= threshold;
}

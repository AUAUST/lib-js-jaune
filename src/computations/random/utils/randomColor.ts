import { randomColors } from "#computations/random/utils/randomColors";
import type { Color } from "#color/types/Color";
import type { RandomColorOptions } from "#computations/random/types/RandomColorOptions";

/**
 * A random color record in `space`, `srgb` by default: each coordinate drawn
 * from its range in `ranges`, or else its channel's reference range, and the
 * alpha from `alpha`, `defaultAlpha` by default.
 */
export function randomColor(options: RandomColorOptions = {}): Color {
  const [color] = randomColors({ ...options, count: 1 });

  return color;
}

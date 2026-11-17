import { isOpaque } from "#computations/metrics/utils/isOpaque";
import type { Color } from "#color/types/Color";

/**
 * Whether `color` is at least partially transparent.
 */
export function isTranslucent(color: Color): boolean {
  return !isOpaque(color);
}

import { createColor } from "#color/utils/createColor";
import type { Color } from "#color/types/Color";

/**
 * The same space and coordinates with `alpha`, clamped to [0, 1].
 */
export function withAlpha(color: Color, alpha: number): Color {
  return createColor(color.space, color.coords, alpha);
}

import { createColor } from "#color/utils/createColor";
import { composite } from "#computations/composite/utils/composite";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";

const contrastBackdrop = createColor(srgb, [1, 1, 1], 1);

/**
 * `background` composited over `backdrop`, opaque white by default, then
 * `foreground` composited over the result, as a frozen pair.
 */
export function flattenOnBackdrop(
  foreground: Color,
  background: Color,
  backdrop: Color = contrastBackdrop,
): readonly [foreground: Color, background: Color] {
  const flatBackground = composite(background, backdrop);

  return Object.freeze([
    composite(foreground, flatBackground),
    flatBackground,
  ] as const);
}

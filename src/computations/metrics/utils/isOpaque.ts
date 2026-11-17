import type { Color } from "#color/types/Color";

/**
 * Whether `color` is fully opaque.
 */
export function isOpaque(color: Color): boolean {
  return color.alpha === 1;
}

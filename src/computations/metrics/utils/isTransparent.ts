import type { Color } from "#color/types/Color";

/**
 * Whether `color` is fully transparent.
 */
export function isTransparent(color: Color): boolean {
  return color.alpha === 0;
}

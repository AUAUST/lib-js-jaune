import { convertCoords } from "#space/utils/convertCoords";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";
import type { Color } from "#color/types/Color";

const scratch: [number, number, number] = [0, 0, 0];

/**
 * The relative luminance of `color`: its `y` in XYZ D65, 1 for white.
 *
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function luminance(color: Color): number {
  return convertCoords(color.space, xyzD65, color.coords, scratch)[1];
}

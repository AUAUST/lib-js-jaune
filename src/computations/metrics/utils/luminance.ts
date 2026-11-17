import { composite } from "#computations/composite/utils/composite";
import { convertCoords } from "#space/utils/convertCoords";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";
import type { Color } from "#color/types/Color";

const scratch: [number, number, number] = [0, 0, 0];

/**
 * The relative luminance of `color`: its `y` in XYZ D65, 1 for white. Composites
 * `color` over `backdrop` first when given; ignores alpha otherwise.
 *
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function luminance(color: Color, backdrop?: Color): number {
  // @debt `lightness` repeats this optional compositing; a helper beside `flattenOnBackdrop` would own it, at the cost of one more public metrics export.
  const flat = backdrop == null ? color : composite(color, backdrop);

  return convertCoords(flat.space, xyzD65, flat.coords, scratch)[1];
}

import { createColor } from "#color/utils/createColor";
import { convertCoords } from "#space/utils/convertCoords";
import type { Color } from "#color/types/Color";
import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * `color` itself when already in `space`, otherwise a new record converted into
 * `space` with the same alpha.
 */
export function convert(color: Color, space: ColorSpace): Color {
  if (color.space === space) {
    return color;
  }

  return createColor(
    space,
    convertCoords(color.space, space, color.coords, [0, 0, 0]),
    color.alpha,
  );
}

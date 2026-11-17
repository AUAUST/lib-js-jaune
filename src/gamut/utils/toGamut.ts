import { createColor } from "#color/utils/createColor";
import { mapCoordsToGamut } from "#gamut/utils/mapCoordsToGamut";
import { convertCoords } from "#space/utils/convertCoords";
import type { Color } from "#color/types/Color";
import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * `color` converted into `space` and mapped into its gamut with the CSS Color 4
 * algorithm, keeping its alpha.
 */
export function toGamut(color: Color, space: ColorSpace = color.space): Color {
  const coords = convertCoords(color.space, space, color.coords, [0, 0, 0]);

  return createColor(
    space,
    mapCoordsToGamut(space, coords, coords),
    color.alpha,
  );
}

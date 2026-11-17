import { createColor } from "#color/utils/createColor";
import { convertCoords } from "#space/utils/convertCoords";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";

/**
 * `color` with each sRGB channel inverted, in the space of `color` and
 * with its alpha.
 */
export function invert(color: Color): Color {
  const coords = convertCoords(color.space, srgb, color.coords, [0, 0, 0]);

  coords[0] = 1 - coords[0];
  coords[1] = 1 - coords[1];
  coords[2] = 1 - coords[2];

  return createColor(
    color.space,
    convertCoords(srgb, color.space, coords, coords),
    color.alpha,
  );
}

import { isInGamutCoords } from "#gamut/utils/isInGamutCoords";
import { convertCoords } from "#space/utils/convertCoords";
import type { Color } from "#color/types/Color";
import type { ColorSpace } from "#space/ports/ColorSpace";

const scratch: [number, number, number] = [0, 0, 0];

/**
 * Whether `color`, converted into `space`, lies within the gamut of `space`;
 * always true when `space` has no gamut.
 */
export function isInGamut(
  color: Color,
  space: ColorSpace = color.space,
): boolean {
  return isInGamutCoords(
    space,
    convertCoords(color.space, space, color.coords, scratch),
  );
}

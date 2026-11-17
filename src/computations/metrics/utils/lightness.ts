import { convertCoords } from "#space/utils/convertCoords";
import { lab } from "#spaces/lab/adapters/lab";
import type { Color } from "#color/types/Color";

const scratch: [number, number, number] = [0, 0, 0];

/**
 * The perceived lightness of `color`: CIE L* divided by 100, 1 for white.
 */
export function lightness(color: Color): number {
  return convertCoords(color.space, lab, color.coords, scratch)[0] / 100;
}

import { composite } from "#computations/composite/utils/composite";
import { convertCoords } from "#space/utils/convertCoords";
import { lab } from "#spaces/lab/adapters/lab";
import type { Color } from "#color/types/Color";

const scratch: [number, number, number] = [0, 0, 0];

/**
 * The perceived lightness of `color`: CIE L* divided by 100, 1 for white.
 * Composites `color` over `backdrop` first when given; ignores alpha otherwise.
 */
export function lightness(color: Color, backdrop?: Color): number {
  const flat = backdrop == null ? color : composite(color, backdrop);

  return convertCoords(flat.space, lab, flat.coords, scratch)[0] / 100;
}

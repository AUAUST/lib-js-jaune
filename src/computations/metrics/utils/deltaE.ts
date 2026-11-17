import { convertCoords } from "#space/utils/convertCoords";
import { oklab } from "#spaces/oklab/adapters/oklab";
import { deltaEOK } from "#spaces/oklab/utils/deltaEOK";
import type { Color } from "#color/types/Color";

const first: [number, number, number] = [0, 0, 0];
const second: [number, number, number] = [0, 0, 0];

/**
 * The perceptual difference between two colors, Delta E OK: about 1 between
 * white and black. Ignores alpha.
 */
export function deltaE(a: Color, b: Color): number {
  return deltaEOK(
    convertCoords(a.space, oklab, a.coords, first),
    convertCoords(b.space, oklab, b.coords, second),
  );
}

import { clamp } from "@auaust/toolkit/math";

import { convertCoords } from "#space/utils/convertCoords";
import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

const scratch: [number, number, number] = [0, 0, 0];

/**
 * Clamps each channel of `coords`, in `space`, to [0, 1] in `space.gamut`,
 * written to `out` in `space`, and returns `out`. Copies `coords` when `space`
 * has no gamut; `out` may be `coords`.
 */
export function clipCoordsToGamut(
  space: ColorSpace,
  coords: Coords,
  out: [number, number, number],
): [number, number, number] {
  const { gamut } = space;

  if (!gamut) {
    return convertCoords(space, space, coords, out);
  }

  convertCoords(space, gamut, coords, scratch);
  scratch[0] = clamp(scratch[0], 0, 1);
  scratch[1] = clamp(scratch[1], 0, 1);
  scratch[2] = clamp(scratch[2], 0, 1);

  return convertCoords(gamut, space, scratch, out);
}

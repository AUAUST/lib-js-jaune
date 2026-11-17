import { gamutEpsilon } from "#gamut/constants";
import { convertCoords } from "#space/utils/convertCoords";
import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

const scratch: [number, number, number] = [0, 0, 0];

function isInUnitRange(value: number): boolean {
  return value >= -gamutEpsilon && value <= 1 + gamutEpsilon;
}

/**
 * Whether `coords`, in `space`, lie within the [0, 1] cube of `space.gamut`
 * widened by `gamutEpsilon`; always true when `space` has no gamut.
 */
export function isInGamutCoords(space: ColorSpace, coords: Coords): boolean {
  const { gamut } = space;

  if (!gamut) {
    return true;
  }

  convertCoords(space, gamut, coords, scratch);

  return (
    isInUnitRange(scratch[0]) &&
    isInUnitRange(scratch[1]) &&
    isInUnitRange(scratch[2])
  );
}

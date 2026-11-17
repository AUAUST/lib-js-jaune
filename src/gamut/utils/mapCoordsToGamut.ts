import { gamutJnd, gamutMinDeltaE } from "#gamut/constants";
import { clipCoordsToGamut } from "#gamut/utils/clipCoordsToGamut";
import { isInGamutCoords } from "#gamut/utils/isInGamutCoords";
import { convertCoords } from "#space/utils/convertCoords";
import { oklab } from "#spaces/oklab/adapters/oklab";
import { oklch } from "#spaces/oklab/adapters/oklch";
import { deltaEOK } from "#spaces/oklab/utils/deltaEOK";
import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

const white: Coords = [1, 0, 0];
const black: Coords = [0, 0, 0];
const current: [number, number, number] = [0, 0, 0];
const currentLab: [number, number, number] = [0, 0, 0];
const candidate: [number, number, number] = [0, 0, 0];
const clipped: [number, number, number] = [0, 0, 0];
const clippedLab: [number, number, number] = [0, 0, 0];

function isCurrentInGamut(gamut: ColorSpace): boolean {
  return isInGamutCoords(
    gamut,
    convertCoords(oklch, gamut, current, candidate),
  );
}

function clipCurrent(gamut: ColorSpace): number {
  convertCoords(oklch, gamut, current, clipped);
  clipCoordsToGamut(gamut, clipped, clipped);
  convertCoords(gamut, oklab, clipped, clippedLab);
  convertCoords(oklch, oklab, current, currentLab);

  return deltaEOK(clippedLab, currentLab);
}

/**
 * Maps `coords`, in `space`, into `space.gamut` with the CSS Color 4 binary
 * search on OKLCH chroma, written to `out` in `space`, and returns `out`. OKLCH
 * lightness at or above 1 gives white, at or below 0 black. Copies `coords` when
 * in gamut or when `space` has no gamut; `out` may be `coords`.
 */
export function mapCoordsToGamut(
  space: ColorSpace,
  coords: Coords,
  out: [number, number, number],
): [number, number, number] {
  const { gamut } = space;

  if (!gamut) {
    return convertCoords(space, space, coords, out);
  }

  convertCoords(space, oklch, coords, current);

  if (current[0] >= 1) {
    return convertCoords(oklab, space, white, out);
  }

  if (current[0] <= 0) {
    return convertCoords(oklab, space, black, out);
  }

  if (isInGamutCoords(space, coords)) {
    return convertCoords(space, space, coords, out);
  }

  if (clipCurrent(gamut) < gamutJnd) {
    return convertCoords(gamut, space, clipped, out);
  }

  let min = 0;
  let max = current[1];
  let isMinInGamut = true;

  while (max - min > gamutMinDeltaE) {
    const chroma = (min + max) / 2;

    current[1] = chroma;

    if (isMinInGamut && isCurrentInGamut(gamut)) {
      min = chroma;

      continue;
    }

    const deltaE = clipCurrent(gamut);

    if (deltaE >= gamutJnd) {
      max = chroma;
    } else if (gamutJnd - deltaE < gamutMinDeltaE) {
      break;
    } else {
      isMinInGamut = false;
      min = chroma;
    }
  }

  return convertCoords(gamut, space, clipped, out);
}

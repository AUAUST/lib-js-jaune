import { hypot } from "@auaust/toolkit/math";

import { namedColors } from "#formats/named/constants";
import { parseNamedColor } from "#formats/named/utils/parseNamedColor";
import { convertCoords } from "#space/utils/convertCoords";
import { oklab } from "#spaces/oklab/adapters/oklab";
import { deltaEOK } from "#spaces/oklab/utils/deltaEOK";
import type { Color } from "#color/types/Color";
import type { NamedColor } from "#formats/named/types/NamedColor";

const target: [number, number, number] = [0, 0, 0];
const candidate: [number, number, number] = [0, 0, 0];

/**
 * The CSS color name closest to `color`, minimizing the hypotenuse of their
 * `deltaE` and alpha difference.
 */
export function closestNamedColor(color: Color): NamedColor {
  convertCoords(color.space, oklab, color.coords, target);

  let closest: NamedColor = namedColors[0];
  let smallestDistance = Infinity;

  for (const name of namedColors) {
    const named = parseNamedColor(name);

    // @debt every call converts all named colors to OKLab again; a lazily cached OKLab table would convert each once.
    convertCoords(named.space, oklab, named.coords, candidate);

    const d = hypot(deltaEOK(candidate, target), named.alpha - color.alpha);

    if (d >= smallestDistance) {
      continue;
    }

    closest = name;
    smallestDistance = d;
  }

  return closest;
}

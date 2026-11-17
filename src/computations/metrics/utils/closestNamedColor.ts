import { hypot } from "@auaust/toolkit/math";

import { deltaE } from "#computations/metrics/utils/deltaE";
import { namedColors } from "#formats/named/constants";
import { parseNamedColor } from "#formats/named/utils/parseNamedColor";
import type { Color } from "#color/types/Color";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * The CSS color name closest to `color`, minimizing the hypotenuse of their
 * `deltaE` and alpha difference.
 */
export function closestNamedColor(color: Color): NamedColor {
  let closest: NamedColor = namedColors[0];
  let smallestDistance = Infinity;

  for (const name of namedColors) {
    const named = parseNamedColor(name);

    if (!named) {
      continue;
    }

    const d = hypot(deltaE(named, color), named.alpha - color.alpha);

    if (d >= smallestDistance) {
      continue;
    }

    closest = name;
    smallestDistance = d;
  }

  return closest;
}

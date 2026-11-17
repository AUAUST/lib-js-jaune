import { distance } from "#computations/metrics/utils/distance";
import { namedColors } from "#formats/named/constants";
import { parseNamedColor } from "#formats/named/utils/parseNamedColor";
import type { Color } from "#color/types/Color";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * The CSS color name closest to `color`, comparing alpha only against
 * opaque named colors.
 */
export function closestNamedColor(color: Color): NamedColor {
  let closest: NamedColor = namedColors[0];
  let smallestDistance = Infinity;

  for (const name of namedColors) {
    const named = parseNamedColor(name);

    if (!named) {
      continue;
    }

    const d = distance(named, color, named.alpha === 1);

    if (d >= smallestDistance) {
      continue;
    }

    closest = name;
    smallestDistance = d;
  }

  return closest;
}

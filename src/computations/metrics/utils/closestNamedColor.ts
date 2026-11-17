import { distance } from "#computations/metrics/utils/distance";
import {
  namedColorChannels,
  namedColors,
  type NamedColor,
} from "#formats/named/index";
import type { ColorChannels } from "#formats/channels/index";

/**
 * Returns the closest named color to the passed color channels.
 */
export function closestNamedColor(channels: ColorChannels): NamedColor {
  let closest: NamedColor | undefined;
  let smallestDistance = Infinity;

  for (const name of namedColors) {
    const value = namedColorChannels(name);
    const comparesAlpha = value.a === 1;
    const d = distance(value, channels, comparesAlpha);

    if (d >= smallestDistance) {
      continue;
    }

    closest = name;
    smallestDistance = d;
  }

  return closest!;
}

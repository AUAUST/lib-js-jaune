import type { ColorChannels, NamedColor } from "~/types";
import { distance, namedColorChannels, namedColors } from "~/utils";

/** Returns the closest named color to the passed color channels. */
export function closestNamedColor(channels: ColorChannels): NamedColor {
  let closest: NamedColor | undefined;
  let smallestDistance = Infinity;

  for (const name of namedColors) {
    const value = namedColorChannels(name);

    const d = distance(
      value,
      channels,
      value.a === 1 // Ignore alpha channel only if it's 1 -> allows to match transparent/black correctly
    );

    if (d < smallestDistance) {
      closest = name;
      smallestDistance = d;
    }
  }

  return closest!;
}

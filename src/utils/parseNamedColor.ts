import type { ColorChannels, MaybeNamedColor, NamedColor } from "~/types";
import { fallbackColor, isNamedColor, namedColorChannels } from "~/utils";

/**
 * Returns the color channels from a named color.
 */
export function parseNamedColor(name: MaybeNamedColor): ColorChannels {
  if (!isNamedColor(name)) {
    return fallbackColor;
  }

  return namedColorChannels(<NamedColor>name.toLowerCase());
}

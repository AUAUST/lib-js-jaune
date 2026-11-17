import { type ColorChannels, fallbackColor } from "#formats/channels/index";
import type { MaybeNamedColor } from "#formats/named/types/MaybeNamedColor";
import type { NamedColor } from "#formats/named/types/NamedColor";
import { isNamedColor } from "#formats/named/utils/isNamedColor";
import { namedColorChannels } from "#formats/named/utils/namedColorChannels";

/**
 * Returns the color channels from a named color.
 */
export function parseNamedColor(name: MaybeNamedColor): ColorChannels {
  if (!isNamedColor(name)) {
    return fallbackColor;
  }

  return namedColorChannels(<NamedColor>name.toLowerCase());
}

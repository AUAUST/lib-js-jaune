import { fallbackColor, type ColorChannels } from "#formats/channels/index";
import { isNamedColor } from "#formats/named/utils/isNamedColor";
import { namedColorChannels } from "#formats/named/utils/namedColorChannels";
import type { MaybeNamedColor } from "#formats/named/types/MaybeNamedColor";

/**
 * Returns the color channels of a named color, matched case-insensitively, or
 * the fallback color when it is not a named color.
 */
export function parseNamedColor(name: MaybeNamedColor): ColorChannels {
  const lowercased = name.toLowerCase();

  return isNamedColor(lowercased)
    ? namedColorChannels(lowercased)
    : fallbackColor;
}

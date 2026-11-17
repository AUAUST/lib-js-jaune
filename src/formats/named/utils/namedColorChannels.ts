import { getOrSet } from "@auaust/toolkit/maplike";

import { parseHex } from "#formats/hex/index";
import { namedColorToHex } from "#formats/named/utils/namedColorToHex";
import type { ColorChannels } from "#formats/channels/index";
import type { NamedColor } from "#formats/named/types/NamedColor";

const namedColorsChannelsCache = new Map<NamedColor, ColorChannels>();

/**
 * Returns the color channels of a named color, which must already be lowercased.
 */
export function namedColorChannels(name: NamedColor): ColorChannels {
  return getOrSet(namedColorsChannelsCache, name, () => {
    return parseHex(namedColorToHex(name));
  });
}

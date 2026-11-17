import type { ColorChannels } from "#formats/channels/index";
import { parseHex } from "#formats/hex/index";
import type { NamedColor } from "#formats/named/types/NamedColor";
import { namedColorToHex } from "#formats/named/utils/namedColorToHex";

const namedColorsChannelsCache: Partial<Record<NamedColor, ColorChannels>> = {};

/**
 * Returns the color channels from a named color. Must be a valid named color,
 * already lowercased.
 *
 * @internal
 */
export function namedColorChannels(name: NamedColor): ColorChannels {
  return (namedColorsChannelsCache[name] ??= parseHex(namedColorToHex(name)!));
}

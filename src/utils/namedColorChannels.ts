import type { ColorChannels, NamedColor } from "~/types";
import { namedColorToHex, parseHex } from "~/utils";

const namedColorsChannelsCache: Partial<Record<NamedColor, ColorChannels>> = {};

/**
 * Returns the color channels from a named color. Must be a valid named color, already lowercased.
 *
 * @internal
 */
export function namedColorChannels(name: NamedColor): ColorChannels {
  return (namedColorsChannelsCache[name] ??= parseHex(namedColorToHex(name)!));
}

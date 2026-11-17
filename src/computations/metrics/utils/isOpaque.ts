import type { ColorChannels } from "#formats/channels/index";

/**
 * Checks if the color is fully opaque.
 */
export function isOpaque(channels: ColorChannels) {
  return (channels.a ?? 1) === 1;
}

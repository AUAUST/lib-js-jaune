import { toColorChannels, type ColorChannels } from "#formats/channels/index";

/**
 * Returns the color with each RGB channel inverted, preserving the alpha channel.
 */
export function invert(channels: ColorChannels): ColorChannels {
  return toColorChannels(
    255 - channels.r,
    255 - channels.g,
    255 - channels.b,
    channels.a,
  );
}

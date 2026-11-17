import { type ColorChannels, toColorChannels } from "#formats/channels/index";

export function invert(channels: ColorChannels): ColorChannels {
  return toColorChannels(
    255 - channels.r,
    255 - channels.g,
    255 - channels.b,
    channels.a,
  );
}

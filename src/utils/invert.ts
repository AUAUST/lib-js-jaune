import type { ColorChannels } from "~/types";
import { toColorChannels } from "~/utils/toColorChannels";

export function invert(channels: ColorChannels): ColorChannels {
  return toColorChannels(
    255 - channels.r,
    255 - channels.g,
    255 - channels.b,
    channels.a
  );
}

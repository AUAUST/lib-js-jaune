import type { ColorChannels } from "~/types";

/** Checks if the color is fully transparent. */
export function isTransparent(channels: ColorChannels) {
  return channels.a === 0;
}

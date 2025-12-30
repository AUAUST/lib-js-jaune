import type { ColorChannels } from "~/types";

/** Checks if the color is fully opaque. */
export function isOpaque(channels: ColorChannels) {
  return channels.a === 1 || channels.a == undefined;
}

import type { ColorChannels } from "~/types";

/** Checks if the color is fully opaque. */
export function isOpaque(channels: ColorChannels) {
  return channels.a === 1 || channels.a == undefined;
}

/** Checks if the color is fully transparent. */
export function isTransparent(channels: ColorChannels) {
  return channels.a === 0;
}

/** Checks if the color is at least partially transparent. */
export function isTranslucent(channels: ColorChannels) {
  return !isOpaque(channels);
}

import type { ColorChannels, Rgb } from "~/types";
import { toAlphaChannel, toRgbChannel } from "~/utils";

/**
 * Returns the corresponding RGB tuple of a color channels object.
 */
export function toRgb(channels: ColorChannels): Rgb {
  const { r, g, b, a } = channels;

  return Array.from([r, g, b, a], (value, i) =>
    i === 3 ? toAlphaChannel(value) : toRgbChannel(value)
  );
}

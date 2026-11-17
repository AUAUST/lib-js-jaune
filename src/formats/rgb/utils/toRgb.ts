import {
  type ColorChannels,
  toAlphaChannel,
  toRgbChannel,
} from "#formats/channels/index";
import type { Rgb } from "#formats/rgb/types/Rgb";

/**
 * Returns the corresponding RGB tuple of a color channels object.
 */
export function toRgb(channels: ColorChannels): Rgb {
  const { r, g, b, a } = channels;

  return Array.from([r, g, b, a], (value, i) =>
    i === 3 ? toAlphaChannel(value) : toRgbChannel(value),
  );
}

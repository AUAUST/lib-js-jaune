import type { ColorChannels } from "~/types";
import { linearTosRGB, luminance, toColorChannels } from "~/utils";

/**
 * Returns the grayscale equivalent of a color as a new color channels object.
 */
export function grayscale(channels: ColorChannels): ColorChannels {
  // Reverse gamma correction from luminance
  const gray = linearTosRGB(luminance(channels)) * 255;

  return toColorChannels(gray, gray, gray, channels.a);
}

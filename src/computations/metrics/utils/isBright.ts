import { brightness } from "#computations/metrics/utils/brightness";
import type { ColorChannels } from "#formats/channels/index";

/**
 * Returns whether the color is bright, as in its brightness is greater than 0.5
 * or the provided threshold.
 */
export function isBright(channels: ColorChannels, threshold = 0.5): boolean {
  return brightness(channels) > threshold;
}

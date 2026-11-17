import { isOpaque } from "#computations/metrics/utils/isOpaque";
import type { ColorChannels } from "#formats/channels/index";

/**
 * Checks if the color is at least partially transparent.
 */
export function isTranslucent(channels: ColorChannels) {
  return !isOpaque(channels);
}

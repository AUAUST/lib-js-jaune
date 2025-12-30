import type { ColorChannels } from "~/types";
import { brightness } from "~/utils";

/** Returns whether the color is bright, as in its brightness is greater than 0.5 or the provided threshold. */
export function isBright(channels: ColorChannels, threshold = 0.5): boolean {
  return brightness(channels) > threshold;
}

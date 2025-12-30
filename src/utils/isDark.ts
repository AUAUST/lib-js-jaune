import type { ColorChannels } from "~/types";
import { brightness } from "~/utils";

/** Returns whether the color is dark, as in its brightness is less than or equal to 0.5 or the provided threshold. */
export function isDark(channels: ColorChannels, threshold = 0.5): boolean {
  return brightness(channels) <= threshold;
}

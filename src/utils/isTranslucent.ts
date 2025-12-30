import type { ColorChannels } from "~/types";
import { isOpaque } from "~/utils";

/** Checks if the color is at least partially transparent. */
export function isTranslucent(channels: ColorChannels) {
  return !isOpaque(channels);
}

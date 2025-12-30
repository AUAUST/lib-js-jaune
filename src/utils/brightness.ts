import type { ColorChannels } from "~/types";
import { luminance } from "~/utils";

/**
 * Returns the perceived brightness of a color normalized to the range [0, 1].
 *
 * @see https://stackoverflow.com/a/56678483
 */
export function brightness(channels: ColorChannels): number {
  const l = luminance(channels);

  if (l <= 216 / 24389) {
    return (l * (24389 / 27)) / 100;
  }

  return (Math.pow(l, 1 / 3) * 116 - 16) / 100;
}

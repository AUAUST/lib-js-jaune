import { cbrt } from "@auaust/toolkit/math";

import { luminance } from "#computations/metrics/utils/luminance";
import type { ColorChannels } from "#formats/channels/index";

/**
 * Returns the perceived brightness of a color normalized to the range [0, 1].
 *
 * @see https://stackoverflow.com/a/56678483
 */
export function brightness(channels: ColorChannels): number {
  const l = luminance(channels);

  if (l <= 216 / 24_389) {
    return (l * (24_389 / 27)) / 100;
  }

  return (cbrt(l) * 116 - 16) / 100;
}

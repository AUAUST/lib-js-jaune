import { minMax } from "@auaust/toolkit/math";

import { luminance } from "#computations/metrics/utils/luminance";
import type { ColorChannels } from "#formats/channels/index";

/**
 * Returns the contrast ratio between two colors.
 *
 * @see https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 */
export function contrast(channelsA: ColorChannels, channelsB: ColorChannels) {
  const [
    darkest,
    brightest,
  ] = minMax(luminance(channelsA), luminance(channelsB));

  return (brightest + 0.05) / (darkest + 0.05);
}

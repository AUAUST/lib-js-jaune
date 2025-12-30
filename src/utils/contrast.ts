import { N } from "@auaust/primitive-kit";
import type { ColorChannels } from "~/types";
import { luminance } from "~/utils";

/**
 * Returns the contrast ratio between two colors.
 *
 * @see https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 */
export function contrast(channelsA: ColorChannels, channelsB: ColorChannels) {
  const [darkest, brightest] = N.minMax(
    luminance(channelsA),
    luminance(channelsB)
  );

  return (brightest + 0.05) / (darkest + 0.05);
}

import { minMax } from "@auaust/toolkit/math";

import { contrastFlare } from "#computations/metrics/constants";
import { luminance } from "#computations/metrics/utils/luminance";
import type { Color } from "#color/types/Color";

/**
 * The WCAG contrast ratio between two colors, from 1 to 21.
 *
 * @see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function contrast(a: Color, b: Color): number {
  const [darkest, brightest] = minMax(luminance(a), luminance(b));

  return (brightest + contrastFlare) / (darkest + contrastFlare);
}

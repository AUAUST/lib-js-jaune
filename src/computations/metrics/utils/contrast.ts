import { minMax } from "@auaust/toolkit/math";

import { contrastFlare } from "#computations/metrics/constants";
import { flattenOnBackdrop } from "#computations/metrics/utils/flattenOnBackdrop";
import { luminance } from "#computations/metrics/utils/luminance";
import type { Color } from "#color/types/Color";

/**
 * The WCAG 2 contrast ratio between two colors, from 1 to 21, after `background`
 * is composited over `backdrop`, opaque white by default, and `foreground`
 * over the result.
 *
 * @see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function contrast(
  foreground: Color,
  background: Color,
  backdrop?: Color,
): number {
  const [
    flatForeground,
    flatBackground,
  ] = flattenOnBackdrop(foreground, background, backdrop);

  const [
    darkest,
    brightest,
  ] = minMax(luminance(flatForeground), luminance(flatBackground));

  return (brightest + contrastFlare) / (darkest + contrastFlare);
}

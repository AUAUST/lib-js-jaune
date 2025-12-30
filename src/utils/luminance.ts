import type { ColorChannels } from "~/types";
import { sRGBtoLinear } from "~/utils";

/**
 * Returns the luminance of a color normalized to the range [0, 1].
 *
 * @see https://stackoverflow.com/a/56678483
 * @see https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 */
export function luminance(channels: ColorChannels) {
  let { r, g, b } = channels;

  [r, g, b] = [r, g, b].map((v) => sRGBtoLinear(v / 255));

  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

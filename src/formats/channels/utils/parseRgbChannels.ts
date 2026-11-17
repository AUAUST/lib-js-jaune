import { isRgbChannels } from "#formats/channels/utils/isRgbChannels";
import { parseRgbTuple } from "#formats/channels/utils/parseRgbTuple";
import type { Color } from "#color/types/Color";

/**
 * The `srgb` color of channels, clamped to 0–255 and alpha to 0–1, or `undefined`
 * when `value` is not `RgbChannels`. Reads only `r`, `g`, `b` and `a`.
 */
export function parseRgbChannels(value: unknown): Color | undefined {
  if (!isRgbChannels(value)) {
    return;
  }

  const { r, g, b, a } = value;

  return parseRgbTuple(a === undefined ? [r, g, b] : [r, g, b, a]);
}

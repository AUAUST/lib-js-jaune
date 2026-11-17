import { isString } from "@auaust/toolkit/guard";

import { isColor } from "#color/utils/isColor";
import { parseRgbChannels } from "#formats/channels/utils/parseRgbChannels";
import { parseRgbTuple } from "#formats/channels/utils/parseRgbTuple";
import { parseCss } from "#formats/css/utils/parseCss";
import type { Color } from "#color/types/Color";

/**
 * The color record of any accepted input: a record itself, a HEX string, a CSS
 * name matched case-insensitively, a CSS Color 4 string, 8-bit sRGB channels or
 * a tuple; `undefined` for anything else.
 */
export function parseColor(value: unknown): Color | undefined {
  if (isString(value)) {
    return parseCss(value);
  }

  if (isColor(value)) {
    return value;
  }

  return parseRgbTuple(value) ?? parseRgbChannels(value);
}

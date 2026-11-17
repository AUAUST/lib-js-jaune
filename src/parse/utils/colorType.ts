import { isString } from "@auaust/toolkit/guard";

import { isColor } from "#color/utils/isColor";
import { isRgbChannels } from "#formats/channels/utils/isRgbChannels";
import { isRgbTuple } from "#formats/channels/utils/isRgbTuple";
import { isHex } from "#formats/hex/utils/isHex";
import { isNamedColor } from "#formats/named/utils/isNamedColor";
import type { ColorInputType } from "#parse/types/ColorInputType";

/**
 * The kind of color input `value` is, or `undefined` when `parseColor` does not
 * accept it. Names match case-insensitively.
 */
export function colorType(value: unknown): ColorInputType | undefined {
  if (isString(value)) {
    if (isHex(value)) {
      return "hex";
    }

    return isNamedColor(value.toLowerCase()) ? "named" : undefined;
  }

  if (isColor(value)) {
    return "color";
  }

  if (isRgbTuple(value)) {
    return "rgbTuple";
  }

  if (isRgbChannels(value)) {
    return "rgbChannels";
  }
}

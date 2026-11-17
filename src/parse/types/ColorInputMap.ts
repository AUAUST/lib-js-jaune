import type { Color } from "#color/types/Color";
import type { RgbChannels } from "#formats/channels/types/RgbChannels";
import type { RgbTuple } from "#formats/channels/types/RgbTuple";
import type { Hex } from "#formats/hex/types/Hex";
import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * Each kind of input `parseColor` accepts, with its shape.
 */
export interface ColorInputMap {
  color: Color;
  /**
   * Any CSS Color 4 string `parseCss` accepts.
   */
  css: string;
  hex: Hex;
  named: NamedColor;
  rgbChannels: RgbChannels;
  rgbTuple: RgbTuple;
}

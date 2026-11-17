import type { Color } from "#color/classes/Color";
import type { ColorChannels } from "#formats/channels/index";
import type { Hex } from "#formats/hex/index";
import type { NamedColor } from "#formats/named/index";
import type { Rgb } from "#formats/rgb/index";

/**
 * Each known color type with the value it describes.
 */
export interface ColorTypeMap {
  channels: ColorChannels;
  color: Color;
  hex: Hex;
  named: NamedColor;
  rgb: Rgb;
}

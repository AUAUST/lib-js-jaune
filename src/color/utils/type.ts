import { isColorInstance } from "#color/utils/isColorInstance";
import { isColorChannels } from "#formats/channels/index";
import { isHex } from "#formats/hex/index";
import { isNamedColor } from "#formats/named/index";
import { isRgb } from "#formats/rgb/index";
import type { ColorType } from "#color/types/ColorType";

/**
 * Returns the color type of the value, or undefined if it's not a color.
 */
export function type(value: unknown): ColorType | undefined {
  if (!value) {
    return;
  }

  if (isColorInstance(value)) {
    return "color";
  }

  if (isNamedColor(value)) {
    return "named";
  }

  if (isHex(value)) {
    return "hex";
  }

  if (isRgb(value)) {
    return "rgb";
  }

  if (isColorChannels(value)) {
    return "channels";
  }
}

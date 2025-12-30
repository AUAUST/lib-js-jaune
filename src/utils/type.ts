import { Color } from "~/classes/Color";
import type { ColorType } from "~/types";
import { isColorChannels, isHex, isNamedColor, isRgb } from "~/utils";

/** Returns the color type of the value, or undefined if it's not a color. */
export function type(value: unknown): ColorType | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Color) {
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

  return undefined;
}

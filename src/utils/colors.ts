import { Color } from "~/classes/Color";
import type { ColorType, ColorValue } from "~/types";
import { isColorChannels } from "./channels";
import { isHex } from "./hex";
import { isNamedColor } from "./namedColors";
import { isRgb } from "./rgb";

/** Returns true if the value is any format of supported color. */
export function isColor(value: unknown): value is ColorValue {
  return (
    !!value && // no falsy value represents a color
    (value instanceof Color ||
      isNamedColor(value) ||
      isHex(value) ||
      isRgb(value) ||
      isColorChannels(value))
  );
}

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

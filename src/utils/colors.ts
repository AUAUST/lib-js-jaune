import { Color } from "~/classes/Color";
import type { ColorChannels, ColorType, ColorValue } from "~/types";
import { fallbackColor, isColorChannels } from "./channels";
import { isHex, parseHex } from "./hex";
import { isNamedColor, parseNamedColor } from "./namedColors";
import { couldBeRgb, isRgb, parseRgb } from "./rgb";
import { channels } from "./symbols";

/** Returns true if the value is any format of supported color. */
export function isColor(value: unknown): value is ColorValue {
  return type(value) !== undefined;
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

/** Tries to parse the value as a color. */
export function parseColor(value: unknown): ColorChannels | undefined {
  if (!value) {
    return fallbackColor;
  }

  if (value instanceof Color) {
    return value[channels];
  }

  if (isColorChannels(value)) {
    return value;
  }

  if (isNamedColor(value)) {
    return parseNamedColor(value);
  }

  if (isHex(value)) {
    return parseHex(value);
  }

  if (couldBeRgb(value)) {
    // It might not be a valid RGB, in which case `parseRgb` is responsible for returning the fallback color
    // In case more color types are added, it might be required to only return the result of `parseRgb` if `isFallback` is false
    return parseRgb(value);
  }

  return fallbackColor;
}

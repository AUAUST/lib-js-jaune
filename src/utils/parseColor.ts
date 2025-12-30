import { Color } from "~/classes/Color";
import type { ColorChannels } from "~/types";
import {
  channels,
  couldBeRgb,
  fallbackColor,
  isColorChannels,
  isHex,
  isNamedColor,
  parseHex,
  parseNamedColor,
  parseRgb,
} from "~/utils";

/** Tries to parse the value as a color. If it fails, returns the fallback color. */
export function parseColor(value: unknown): ColorChannels {
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

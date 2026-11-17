import { isColorInstance } from "#color/utils/isColorInstance";
import { channels } from "#color/constants";
import {
  type ColorChannels,
  fallbackColor,
  isColorChannels,
} from "#formats/channels/index";
import { isHex, parseHex } from "#formats/hex/index";
import { isNamedColor, parseNamedColor } from "#formats/named/index";
import { couldBeRgb, parseRgb } from "#formats/rgb/index";

/**
 * Tries to parse the value as a color. If it fails, returns the fallback color.
 */
export function parseColor(value: unknown): ColorChannels {
  if (!value) {
    return fallbackColor;
  }

  if (isColorInstance(value)) {
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

import { Color } from "~/classes/Color";
import type { ColorValue } from "~/types";
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

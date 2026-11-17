import type { ColorValue } from "#color/types/ColorValue";
import { type } from "#color/utils/type";

/**
 * Returns true if the value is any format of supported color.
 */
export function isColor(value: unknown): value is ColorValue {
  return type(value) !== undefined;
}

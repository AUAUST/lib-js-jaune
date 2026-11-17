import { type } from "#color/utils/type";
import type { ColorValue } from "#color/types/ColorValue";

/**
 * Returns true if the value is any format of supported color.
 */
export function isColor(value: unknown): value is ColorValue {
  return type(value) !== undefined;
}

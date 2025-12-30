import type { ColorValue } from "~/types";
import { type } from "~/utils";

/** Returns true if the value is any format of supported color. */
export function isColor(value: unknown): value is ColorValue {
  return type(value) !== undefined;
}

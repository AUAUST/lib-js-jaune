import { isString } from "@auaust/toolkit/guard";

import { parseColor } from "#parse/utils/parseColor";
import type { Color } from "#color/types/Color";

function describe(input: unknown): string {
  return isString(input) ? `"${input}"` : String(input);
}

/**
 * The color record of `input`, or else of `fallback` when one is passed. Throws
 * a `TypeError` naming the input when neither parses.
 */
export function toColor(input: unknown, fallback?: unknown): Color {
  const color = parseColor(input);

  if (color) {
    return color;
  }

  if (fallback !== undefined) {
    return toColor(fallback);
  }

  throw new TypeError(`${describe(input)} is not a color.`);
}

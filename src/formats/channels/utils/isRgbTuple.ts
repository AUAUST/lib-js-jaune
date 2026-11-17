import { isArray, isFinite } from "@auaust/toolkit/guard";

import type { RgbTuple } from "#formats/channels/types/RgbTuple";

/**
 * Whether `value` is an array of three or four finite numbers; ranges
 * are not checked.
 */
export function isRgbTuple(value: unknown): value is RgbTuple {
  return (
    isArray(value) &&
    (value.length === 3 || value.length === 4) &&
    value.every((channel) => isFinite(channel))
  );
}

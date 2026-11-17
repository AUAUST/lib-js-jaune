import { isFinite, isObject, isUndefined } from "@auaust/toolkit/guard";

import type { RgbChannels } from "#formats/channels/types/RgbChannels";

/**
 * Whether `value` is an object with finite `r`, `g` and `b` and, when present,
 * a finite `a`; ranges are not checked.
 */
export function isRgbChannels(value: unknown): value is RgbChannels {
  if (!isObject(value)) {
    return false;
  }

  const { r, g, b, a }: Partial<Record<keyof RgbChannels, unknown>> = value;

  return (
    isFinite(r) && isFinite(g) && isFinite(b) && (isUndefined(a) || isFinite(a))
  );
}

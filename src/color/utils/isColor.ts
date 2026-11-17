import { isArray, isFinite, isFunction, isObject } from "@auaust/toolkit/guard";

import type { Color } from "#color/types/Color";

/**
 * Whether `value` has the `Color` shape: a space with conversion kernels, three
 * finite coordinates and a finite alpha within [0, 1].
 */
export function isColor(value: unknown): value is Color {
  if (!isObject(value)) {
    return false;
  }

  const { space, coords, alpha }: Partial<Record<keyof Color, unknown>> = value;

  return (
    isObject(space) &&
    "toBase" in space &&
    isFunction(space.toBase) &&
    "fromBase" in space &&
    isFunction(space.fromBase) &&
    isArray(coords) &&
    coords.length === 3 &&
    coords.every((coord) => isFinite(coord)) &&
    isFinite(alpha) &&
    alpha >= 0 &&
    alpha <= 1
  );
}

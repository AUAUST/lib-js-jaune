import { isFinite } from "@auaust/toolkit/guard";
import { clamp } from "@auaust/toolkit/math";
import { freeze } from "@auaust/toolkit/object";

import { defaultAlpha } from "#color/constants";
import type { Color } from "#color/types/Color";
import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

/**
 * Creates a frozen color from a copy of `coords`, clamping `alpha` to [0, 1].
 * Throws a `RangeError` on a non-finite coordinate or alpha.
 */
export function createColor(
  space: ColorSpace,
  coords: Coords,
  alpha: number = defaultAlpha,
): Color {
  const [first, second, third] = coords;

  if (
    !isFinite(first) ||
    !isFinite(second) ||
    !isFinite(third) ||
    !isFinite(alpha)
  ) {
    throw new RangeError(
      `A "${space.id}" color needs finite coordinates and alpha, got [${first}, ${second}, ${third}] and ${alpha}.`,
    );
  }

  return freeze({
    space,
    coords: freeze([first, second, third] as const),
    alpha: clamp(alpha, 0, 1),
  });
}

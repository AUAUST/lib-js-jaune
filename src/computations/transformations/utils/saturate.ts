import { max } from "@auaust/toolkit/math";

import { createColor } from "#color/utils/createColor";
import { adjustmentAmount } from "#computations/transformations/constants";
import { convertCoords } from "#space/utils/convertCoords";
import { oklch } from "#spaces/oklab/adapters/oklch";
import type { Color } from "#color/types/Color";

/**
 * `color` with its OKLCH chroma scaled by `1 + amount`, never below 0, in the
 * space of `color` and with its alpha.
 */
export function saturate(
  color: Color,
  amount: number = adjustmentAmount,
): Color {
  const coords = convertCoords(color.space, oklch, color.coords, [0, 0, 0]);

  coords[1] = max(0, coords[1] * (1 + amount));

  return createColor(
    color.space,
    convertCoords(oklch, color.space, coords, coords),
    color.alpha,
  );
}

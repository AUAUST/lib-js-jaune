import { clamp } from "@auaust/toolkit/math";

import { createColor } from "#color/utils/createColor";
import { adjustmentAmount } from "#computations/transformations/constants";
import { convertCoords } from "#space/utils/convertCoords";
import { oklch } from "#spaces/oklab/adapters/oklch";
import type { Color } from "#color/types/Color";

/**
 * `color` with its OKLCH lightness lowered by `amount`, clamped to [0, 1], in
 * the space of `color` and with its alpha.
 */
export function darken(color: Color, amount: number = adjustmentAmount): Color {
  const coords = convertCoords(color.space, oklch, color.coords, [0, 0, 0]);

  coords[0] = clamp(coords[0] - amount, 0, 1);

  return createColor(
    color.space,
    convertCoords(oklch, color.space, coords, coords),
    color.alpha,
  );
}

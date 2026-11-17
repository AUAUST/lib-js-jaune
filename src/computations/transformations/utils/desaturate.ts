import { max } from "@auaust/toolkit/math";

import { createColor } from "#color/utils/createColor";
import { adjustmentAmount } from "#computations/transformations/constants";
import { convertCoords } from "#space/utils/convertCoords";
import { oklch } from "#spaces/oklab/adapters/oklch";
import type { Color } from "#color/types/Color";

/**
 * `color` with its OKLCH chroma scaled by `1 - amount`, never below 0, in the
 * space of `color` and with its alpha.
 */
export function desaturate(
  color: Color,
  amount: number = adjustmentAmount,
): Color {
  // @debt lighten, darken, saturate, desaturate and rotateHue repeat the convert-adjust-convert-back round trip; one shared channel-adjustment helper would own it.
  const coords = convertCoords(color.space, oklch, color.coords, [0, 0, 0]);

  coords[1] = max(0, coords[1] * (1 - amount));

  return createColor(
    color.space,
    convertCoords(oklch, color.space, coords, coords),
    color.alpha,
  );
}

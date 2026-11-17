import { convert } from "#color/utils/convert";
import { createColor } from "#color/utils/createColor";
import { hueInterpolation, mixAmount } from "#computations/mix/constants";
import { interpolateCoords } from "#computations/mix/utils/interpolateCoords";
import { oklab } from "#spaces/oklab/adapters/oklab";
import type { Color } from "#color/types/Color";
import type { MixOptions } from "#computations/mix/types/MixOptions";

/**
 * `a` and `b` interpolated like CSS `color-mix()` in `space`, `oklab` by default,
 * `amount` being the weight of `b`. Returns a record in `space`.
 */
export function mix(
  a: Color,
  b: Color,
  amount: number = mixAmount,
  { space = oklab, hue = hueInterpolation }: MixOptions = {},
): Color {
  const from = convert(a, space);
  const to = convert(b, space);
  const coords: [number, number, number] = [0, 0, 0];

  const alpha = interpolateCoords(
    space,
    from.coords,
    to.coords,
    from.alpha,
    to.alpha,
    amount,
    hue,
    coords,
  );

  return createColor(space, coords, alpha);
}

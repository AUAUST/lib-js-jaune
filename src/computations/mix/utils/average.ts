import { isFinite } from "@auaust/toolkit/guard";
import {
  atan2,
  cos,
  hypot,
  sin,
  toDegrees,
  toRadians,
} from "@auaust/toolkit/math";

import { createColor } from "#color/utils/createColor";
import { convertCoords } from "#space/utils/convertCoords";
import { normalizeHue } from "#space/utils/normalizeHue";
import { oklab } from "#spaces/oklab/adapters/oklab";
import type { Color } from "#color/types/Color";
import type { AverageOptions } from "#computations/mix/types/AverageOptions";

function resolveWeights(
  count: number,
  weights: readonly number[] | undefined,
): readonly number[] {
  if (count === 0) {
    throw new RangeError("Averaging needs at least one color.");
  }

  if (weights == null) {
    return Array.from({ length: count }, () => 1 / count);
  }

  if (weights.length !== count) {
    throw new RangeError(
      `Averaging ${count} colors needs ${count} weights, got ${weights.length}.`,
    );
  }

  let total = 0;

  for (const weight of weights) {
    if (!isFinite(weight) || weight < 0) {
      throw new RangeError(
        `Averaging weights must be finite and non-negative, got ${weight}.`,
      );
    }

    total += weight;
  }

  if (total === 0) {
    throw new RangeError("Averaging weights must not all be 0.");
  }

  return weights.map((weight) => weight / total);
}

/**
 * The weighted mean of `colors` in `space`, `oklab` by default, over premultiplied
 * coordinates. A hue channel averages as the angle of the weighted sum of unit
 * vectors from non-achromatic colors, keeping the heaviest such color's hue when
 * that sum is zero, and 0 when every color is achromatic. Returns a record in
 * `space`. Throws a `RangeError` when `colors` is empty, `weights` differs in
 * length, or a weight is negative, non-finite, or all are 0.
 */
export function average(
  colors: readonly Color[],
  { weights, space = oklab }: AverageOptions = {},
): Color {
  const normalized = resolveWeights(colors.length, weights);
  const { hueIndex } = space;
  const coords: [number, number, number] = [0, 0, 0];
  const plain: [number, number, number] = [0, 0, 0];
  const converted: [number, number, number] = [0, 0, 0];

  let alpha = 0;
  let cosine = 0;
  let sine = 0;
  let heaviestWeight = -1;
  let heaviestHue = 0;

  for (const [index, color] of colors.entries()) {
    const weight = normalized[index] ?? 0;

    convertCoords(color.space, space, color.coords, converted);

    alpha += weight * color.alpha;

    for (let channel = 0; channel < 3; channel++) {
      coords[channel] += weight * color.alpha * converted[channel];
      plain[channel] += weight * converted[channel];
    }

    if (hueIndex == null || (space.isAchromatic?.(converted) ?? false)) {
      continue;
    }

    const radians = toRadians(converted[hueIndex]);

    cosine += weight * cos(radians);
    sine += weight * sin(radians);

    if (weight <= heaviestWeight) {
      continue;
    }

    heaviestWeight = weight;
    heaviestHue = converted[hueIndex];
  }

  const result: [number, number, number] = alpha === 0
    ? plain
    : [coords[0] / alpha, coords[1] / alpha, coords[2] / alpha];

  if (hueIndex != null) {
    result[hueIndex] = hypot(cosine, sine) < Number.EPSILON
      ? normalizeHue(heaviestHue)
      : normalizeHue(toDegrees(atan2(sine, cosine)));
  }

  return createColor(space, result, alpha);
}

import { isArray } from "@auaust/toolkit/guard";
import { clamp, log } from "@auaust/toolkit/math";
import { freeze } from "@auaust/toolkit/object";

import { convert } from "#color/utils/convert";
import { gradientHint, hueInterpolation } from "#computations/mix/constants";
import { interpolateCoords } from "#computations/mix/utils/interpolateCoords";
import { oklab } from "#spaces/oklab/adapters/oklab";
import type { Color } from "#color/types/Color";
import type { Gradient } from "#computations/mix/types/Gradient";
import type { GradientOptions } from "#computations/mix/types/GradientOptions";
import type { GradientStop } from "#computations/mix/types/GradientStop";

function resolvePositions(stops: readonly GradientStop[]): readonly number[] {
  const positions = stops.map((stop) => {
    return isArray(stop) ? stop[1] : undefined;
  });

  const last = positions.length - 1;

  positions[0] ??= 0;
  positions[last] ??= 1;

  let previous = 0;

  for (let index = 0; index <= last; index++) {
    const position = positions[index];

    if (position == null) {
      continue;
    }

    if (!(position >= 0 && position <= 1) || position < previous) {
      throw new RangeError(
        `Gradient stop positions must lie on [0, 1] in order, got ${position} at stop ${index}.`,
      );
    }

    previous = position;
  }

  const resolved: number[] = [];

  for (let index = 0; index <= last; index++) {
    const position = positions[index];

    if (position != null) {
      resolved.push(position);

      continue;
    }

    const start = index - 1;

    const end = positions.findIndex((candidate, candidateIndex) => {
      return candidateIndex > index && candidate != null;
    });

    const from = resolved[start] ?? 0;
    const to = positions[end] ?? 1;

    resolved.push(from + (to - from) / (end - start));
  }

  return resolved;
}

/**
 * A frozen gradient through `stops`, following CSS gradient stops: unpositioned
 * stops spread evenly between their positioned neighbors, the first defaulting to
 * 0 and the last to 1. Interpolates in `space`, `oklab` by default, like `mix`,
 * easing each span by the transition `hint`. Throws a `RangeError` when there
 * are fewer than 2 stops, a position lies outside [0, 1] or below an earlier
 * one, or `hint` is outside (0, 1).
 */
export function createGradient(
  stops: readonly GradientStop[],
  {
    hint = gradientHint,
    space = oklab,
    hue = hueInterpolation,
  }: GradientOptions = {},
): Gradient {
  if (stops.length < 2) {
    throw new RangeError(
      `A gradient needs at least 2 stops, got ${stops.length}.`,
    );
  }

  if (!(hint > 0 && hint < 1)) {
    throw new RangeError(`A gradient hint must lie in (0, 1), got ${hint}.`);
  }

  const positions = resolvePositions(stops);
  const exponent = log(0.5) / log(hint);

  const colors: readonly Color[] = stops.map((stop) => {
    return convert(isArray(stop) ? stop[0] : stop, space);
  });

  function sample(position: number, out: [number, number, number]): number {
    const target = clamp(position, 0, 1);

    let index = 0;

    while (
      index < positions.length - 2 &&
      target > (positions[index + 1] ?? 1)
    ) {
      index++;
    }

    const start = positions[index] ?? 0;
    const end = positions[index + 1] ?? 1;
    const from = colors[index];
    const to = colors[index + 1];

    if (from == null || to == null) {
      throw new RangeError(`No gradient span holds position ${position}.`);
    }

    const span = end - start;
    const t = span === 0 ? 1 : (target - start) / span;

    return interpolateCoords(
      space,
      from.coords,
      to.coords,
      from.alpha,
      to.alpha,
      t ** exponent,
      hue,
      out,
    );
  }

  return freeze({ space, sample });
}

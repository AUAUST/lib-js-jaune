import { normalizeHue } from "#space/utils/normalizeHue";
import type { HueInterpolation } from "#computations/mix/types/HueInterpolation";
import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

function fixHues(
  from: number,
  to: number,
  hue: HueInterpolation,
  out: [number, number, number],
): void {
  let first = normalizeHue(from);
  let second = normalizeHue(to);

  const difference = second - first;

  switch (hue) {
    case "longer": {
      if (difference > 0 && difference < 180) {
        first += 360;
      } else if (difference > -180 && difference <= 0) {
        second += 360;
      }

      break;
    }

    case "increasing": {
      if (second < first) {
        second += 360;
      }

      break;
    }

    case "decreasing": {
      if (first < second) {
        first += 360;
      }

      break;
    }

    default: {
      if (difference > 180) {
        first += 360;
      } else if (difference < -180) {
        second += 360;
      }
    }
  }

  out[0] = first;
  out[1] = second;
}

const hues: [number, number, number] = [0, 0, 0];

/**
 * Writes the CSS Color 4 interpolation at `t` between `from` and `to`, both in
 * `space`, into `out`, un-premultiplied, and returns the alpha. Interpolates
 * premultiplied by alpha; a hue channel follows `hue`, and a powerless hue,
 * per `space.isAchromatic`, takes the other color's. `out` may be `from` or
 * `to`; allocates nothing.
 */
export function interpolateCoords(
  space: ColorSpace,
  from: Coords,
  to: Coords,
  fromAlpha: number,
  toAlpha: number,
  t: number,
  hue: HueInterpolation,
  out: [number, number, number],
): number {
  const alpha = fromAlpha + (toAlpha - fromAlpha) * t;
  const hueIndex = space.channels.findIndex((channel) => channel.isHue);

  let interpolatedHue = 0;

  if (hueIndex !== -1) {
    const fromAchromatic = space.isAchromatic?.(from) ?? false;
    const toAchromatic = space.isAchromatic?.(to) ?? false;

    const fromHue = fromAchromatic && !toAchromatic
      ? to[hueIndex]
      : from[hueIndex];

    const toHue = toAchromatic && !fromAchromatic
      ? from[hueIndex]
      : to[hueIndex];

    fixHues(fromHue, toHue, hue, hues);

    interpolatedHue = normalizeHue(hues[0] + (hues[1] - hues[0]) * t);
  }

  for (let index = 0; index < 3; index++) {
    if (index === hueIndex) {
      continue;
    }

    out[index] = alpha === 0
      ? from[index] + (to[index] - from[index]) * t
      : (
          (from[index] * fromAlpha +
            (to[index] * toAlpha - from[index] * fromAlpha) * t) /
          alpha
        );
  }

  if (hueIndex !== -1) {
    out[hueIndex] = interpolatedHue;
  }

  return alpha;
}

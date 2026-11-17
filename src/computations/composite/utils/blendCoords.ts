import { abs, clamp, max, min, sqrt } from "@auaust/toolkit/math";

import { blendLuminosityWeights } from "#computations/composite/constants";
import type { BlendMode } from "#computations/composite/types/BlendMode";
import type { Coords } from "#space/types/Coords";

const [redWeight, greenWeight, blueWeight] = blendLuminosityWeights;

function lum(r: number, g: number, b: number): number {
  return redWeight * r + greenWeight * g + blueWeight * b;
}

function sat(r: number, g: number, b: number): number {
  return max(r, g, b) - min(r, g, b);
}

function hardLight(backdrop: number, source: number): number {
  return source <= 0.5
    ? backdrop * 2 * source
    : backdrop + (2 * source - 1) - backdrop * (2 * source - 1);
}

// @debt `sqrt` of an unclamped negative backdrop channel yields `NaN`, which `createColor` rejects.
function softLight(backdrop: number, source: number): number {
  if (source <= 0.5) {
    return backdrop - (1 - 2 * source) * backdrop * (1 - backdrop);
  }

  const d = backdrop <= 0.25
    ? ((16 * backdrop - 12) * backdrop + 4) * backdrop
    : sqrt(backdrop);

  return backdrop + (2 * source - 1) * (d - backdrop);
}

function separable(mode: BlendMode, backdrop: number, source: number): number {
  switch (mode) {
    case "multiply": {
      return backdrop * source;
    }

    case "screen": {
      return backdrop + source - backdrop * source;
    }

    case "overlay": {
      return hardLight(source, backdrop);
    }

    case "darken": {
      return min(backdrop, source);
    }

    case "lighten": {
      return max(backdrop, source);
    }

    case "color-dodge": {
      if (backdrop === 0) {
        return 0;
      }

      return source >= 1 ? 1 : min(1, backdrop / (1 - source));
    }

    case "color-burn": {
      if (backdrop === 1) {
        return 1;
      }

      return source <= 0 ? 0 : 1 - min(1, (1 - backdrop) / source);
    }

    case "hard-light": {
      return hardLight(backdrop, source);
    }

    case "soft-light": {
      return softLight(backdrop, source);
    }

    case "difference": {
      return abs(backdrop - source);
    }

    case "exclusion": {
      return backdrop + source - 2 * backdrop * source;
    }

    default: {
      return source;
    }
  }
}

function setSat(
  r: number,
  g: number,
  b: number,
  s: number,
  out: [number, number, number],
): [number, number, number] {
  const lowest = min(r, g, b);
  const range = max(r, g, b) - lowest;

  if (range <= 0) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;

    return out;
  }

  out[0] = ((r - lowest) * s) / range;
  out[1] = ((g - lowest) * s) / range;
  out[2] = ((b - lowest) * s) / range;

  return out;
}

function setLum(
  r: number,
  g: number,
  b: number,
  l: number,
  out: [number, number, number],
): [number, number, number] {
  const lightness = clamp(l, 0, 1);
  const d = lightness - lum(r, g, b);
  const red = r + d;
  const green = g + d;
  const blue = b + d;
  const lowest = min(red, green, blue);
  const highest = max(red, green, blue);

  let scale = 1;

  if (lowest < 0) {
    scale = lightness / (lightness - lowest);
  }

  if (lightness + (highest - lightness) * scale > 1) {
    scale = (1 - lightness) / (highest - lightness);
  }

  out[0] = lightness + (red - lightness) * scale;
  out[1] = lightness + (green - lightness) * scale;
  out[2] = lightness + (blue - lightness) * scale;

  return out;
}

/**
 * Writes the blend `B(Cb, Cs)` of `mode` into `out` and returns `out`. Reads every
 * input before writing, so `out` may be `backdrop` or `source`; allocates nothing.
 */
export function blendCoords(
  mode: BlendMode,
  backdrop: Coords,
  source: Coords,
  out: [number, number, number],
): [number, number, number] {
  const [br, bg, bb] = backdrop;
  const [sr, sg, sb] = source;

  switch (mode) {
    case "hue": {
      setSat(sr, sg, sb, sat(br, bg, bb), out);

      return setLum(out[0], out[1], out[2], lum(br, bg, bb), out);
    }

    case "saturation": {
      setSat(br, bg, bb, sat(sr, sg, sb), out);

      return setLum(out[0], out[1], out[2], lum(br, bg, bb), out);
    }

    case "color": {
      return setLum(sr, sg, sb, lum(br, bg, bb), out);
    }

    case "luminosity": {
      return setLum(br, bg, bb, lum(sr, sg, sb), out);
    }

    default: {
      out[0] = separable(mode, br, sr);
      out[1] = separable(mode, bg, sg);
      out[2] = separable(mode, bb, sb);

      return out;
    }
  }
}

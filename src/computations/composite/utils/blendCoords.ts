import { blendLuminosityWeights } from "#computations/composite/constants";
import type { BlendMode } from "#computations/composite/types/BlendMode";
import type { Coords } from "#space/types/Coords";

const [redWeight, greenWeight, blueWeight] = blendLuminosityWeights;

function lum(r: number, g: number, b: number): number {
  return redWeight * r + greenWeight * g + blueWeight * b;
}

function sat(r: number, g: number, b: number): number {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function hardLight(callback: number, cs: number): number {
  return cs <= 0.5
    ? callback * 2 * cs
    : callback + (2 * cs - 1) - callback * (2 * cs - 1);
}

// @debt `Math.sqrt` of an unclamped negative backdrop channel yields `NaN`, which `createColor` rejects.
function softLight(callback: number, cs: number): number {
  if (cs <= 0.5) {
    return callback - (1 - 2 * cs) * callback * (1 - callback);
  }

  const d = callback <= 0.25
    ? ((16 * callback - 12) * callback + 4) * callback
    : Math.sqrt(callback);

  return callback + (2 * cs - 1) * (d - callback);
}

function separable(mode: BlendMode, callback: number, cs: number): number {
  switch (mode) {
    case "multiply": {
      return callback * cs;
    }

    case "screen": {
      return callback + cs - callback * cs;
    }

    case "overlay": {
      return hardLight(cs, callback);
    }

    case "darken": {
      return Math.min(callback, cs);
    }

    case "lighten": {
      return Math.max(callback, cs);
    }

    case "color-dodge": {
      if (callback === 0) {
        return 0;
      }

      return cs >= 1 ? 1 : Math.min(1, callback / (1 - cs));
    }

    case "color-burn": {
      if (callback === 1) {
        return 1;
      }

      return cs <= 0 ? 0 : 1 - Math.min(1, (1 - callback) / cs);
    }

    case "hard-light": {
      return hardLight(callback, cs);
    }

    case "soft-light": {
      return softLight(callback, cs);
    }

    case "difference": {
      return Math.abs(callback - cs);
    }

    case "exclusion": {
      return callback + cs - 2 * callback * cs;
    }

    default: {
      return cs;
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
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const range = max - min;

  if (range <= 0) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;

    return out;
  }

  out[0] = ((r - min) * s) / range;
  out[1] = ((g - min) * s) / range;
  out[2] = ((b - min) * s) / range;

  return out;
}

function setLum(
  r: number,
  g: number,
  b: number,
  l: number,
  out: [number, number, number],
): [number, number, number] {
  const d = l - lum(r, g, b);
  const red = r + d;
  const green = g + d;
  const blue = b + d;
  const lightness = lum(red, green, blue);
  const min = Math.min(red, green, blue);
  const max = Math.max(red, green, blue);

  let scale = 1;

  if (min < 0) {
    scale = lightness / (lightness - min);
  }

  if (max > 1) {
    scale = (1 - lightness) / (max - lightness);
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

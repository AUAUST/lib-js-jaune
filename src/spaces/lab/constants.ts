import type { Coords } from "#space/types/Coords";

/**
 * CIE κ, 24389/27, per CSS Color 4.
 */
export const cieKappa = 24_389 / 27;

/**
 * CIE ε, 216/24389, per CSS Color 4.
 */
export const cieEpsilon = 216 / 24_389;

/**
 * D50 reference white in XYZ, Y = 1, per CSS Color 4.
 */
export const d50White: Coords = [
  0.3457 / 0.3585,
  1,
  (1 - 0.3457 - 0.3585) / 0.3585,
];

/**
 * LCH chroma below which a color has no hue.
 */
export const labAchromaticThreshold = 1e-4;

/**
 * Tolerance widening the [0, 1] gamut cube in containment checks, per CSS Color 4.
 */
export const gamutEpsilon = 0.00007_5;

/**
 * Just-noticeable OKLab difference of the CSS Color 4 gamut mapping.
 */
export const gamutJnd = 0.02;

/**
 * Chroma precision ending the CSS Color 4 gamut mapping search.
 */
export const gamutMinDeltaE = 0.0001;

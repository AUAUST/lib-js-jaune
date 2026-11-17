import type { HueInterpolation } from "#computations/mix/types/HueInterpolation";

/**
 * The weight of the second color `mix` applies by default.
 */
export const mixAmount = 0.5;

/**
 * The hue interpolation method applied by default.
 */
export const hueInterpolation: HueInterpolation = "shorter";

/**
 * The transition hint gradients apply by default: a linear transition.
 */
export const gradientHint = 0.5;

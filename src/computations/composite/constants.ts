import { freeze } from "@auaust/toolkit/object";

import type { BlendMode } from "#computations/composite/types/BlendMode";

/**
 * The blend mode `composite` applies by default.
 */
export const blendMode: BlendMode = "normal";

/**
 * The `Lum` coefficients of Compositing and Blending Level 1, for red,
 * green and blue.
 */
export const blendLuminosityWeights = freeze([0.3, 0.59, 0.11] as const);

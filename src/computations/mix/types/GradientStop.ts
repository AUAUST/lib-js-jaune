import type { Color } from "#color/types/Color";

/**
 * A gradient color, alone or with its position on [0, 1].
 */
export type GradientStop = Color | readonly [color: Color, position: number];
